<?php
class Tables extends CI_Controller
{
    /**
     * 
     * @var CI_Input
     */
    public $input;

    /**
     * @var CI_Output
     */
    public $output;

    /**
     * @var CI_DB_mysqli_driver
     */
    public $db;

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->helper('datagrid');
    }

    public function search($table)
    {
        /**
         * @var CI_Input $this->input
         */
        $page = $this->input->post('page') ? intval($this->input->post('page')) : 1;
        $pageSize = $this->input->post('pageSize') ? intval($this->input->post('pageSize')) : 10;
        $search = $this->input->post('search') ? '%' . $this->input->post('search') . '%' : '%';
        $offset = ($page - 1) * $pageSize;
        $sorts = $this->input->post('sorts');
        $filterData = $this->input->post('filterData');

        $settings = new DataGridSettings();
        populateFromRequest($settings, $this->input->post('settings'));
        $sorts = array_map(function ($sort) {
            $sortObj = new DataGridSort();
            populateFromRequest($sortObj, $sort);
            return $sortObj;
        }, $sorts);

        // Xây dựng câu truy vấn
        $query = $this->build_query($settings, $search, $filterData, $sorts, $pageSize, $offset);

        // Đếm tổng số bản ghi
        $totalCountQuery = $this->build_total_count_query($settings, $search, $filterData);
        $total = $this->db->query($totalCountQuery['sql'], $totalCountQuery['params'])->row()->total;

        // Lấy dữ liệu
        $items = $this->db->query($query['sql'], $query['params'])->result_array();

        $items = $this->casting_numeric_fields($items);

        $response = [
            'items' => $items,
            'totalItems' => intval($total)
        ];
        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($response));
    }

    public function map($table)
    {
        $fields = $this->input->post('fields');
        $fields = implode(', ', $fields);
        $query = "SELECT {$fields} FROM `$table` as t WHERE 1";
        $softwareAndSiteFilters = $this->getSoftwareAndSiteFilters($table);
        if ($softwareAndSiteFilters['softwareFilter']) {
            $query .= ' AND ' . $softwareAndSiteFilters['softwareFilter'];
        }
        if ($softwareAndSiteFilters['siteFilter']) {
            $query.= ' AND '. $softwareAndSiteFilters['siteFilter'];
        }
        $items = $this->db->query($query)->result_array();
        $response = $this->casting_numeric_fields($items);
        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($response));
    }

    public function detail($table, $id)
    {
        $item = $this->db->query("SELECT * FROM `$table` WHERE id =?", [$id])->row_array();
        $response = $this->casting_numeric_fields([$item]);
        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($response[0]));
    }

    public function update($table, $id)
    {
        $fields = $this->input->post('fields');
        $item = $this->input->post('item');
        $data = [];
        foreach ($fields as $field) {
            if (isset($item[$field['index']])) {
                $data[$field['index']] = $item[$field['index']];
            }
        }
        $software = $this->input->get_request_header('software');
        $site = $this->input->get_request_header('site');
        if ($this->isFieldExisted($table, 'software')) {
            $data['software'] = $software;
        }
        if ($this->isFieldExisted($table,'site') && !isset($data['site'])) {
            $data['site'] = $site;
        }
        $this->db->where('id', $id);
        $this->db->update($table, $data);
        $response = ['message' => 'Update successful'];
        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($response));
    }

    public function delete($table, $id)
    {
        $this->db->where('id', $id);
        $this->db->delete($table);
        $response = ['message' => 'Delete successful'];
        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($response));
    }

    public function create($table)
    {
        $fields = $this->input->post('fields');
        $item = $this->input->post('item');
        $data = [];
        foreach ($fields as $field) {
            if (isset($item[$field['index']])) {
                $data[$field['index']] = $item[$field['index']];
            }
        }
        $software = $this->input->get_request_header('software');
        $site = $this->input->get_request_header('site');
        if ($this->isFieldExisted($table, 'software')) {
            $data['software'] = $software;
        }
        if ($this->isFieldExisted($table,'site') && !isset($data['site'])) {
            $data['site'] = $site;
        }
        $this->db->insert($table, $data);
        $response = ['id' => $this->db->insert_id()];
        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($response));
    }

    public function update_column($table)
    {
        $column = $this->input->post('column');
        $values = $this->input->post('values');
        foreach ($values as $item) {
            $id = $item['id'];
            $value = $item['value'];
            $this->db->set($column['index'], $value, true);
            $this->db->where('id', $id);
            $this->db->update($table);
        }
        $response = ['message' => 'Update successful'];
        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($response));
    }

    /**
     * 
     * @param DataGridSettings $settings 
     * @param string $search 
     * @param array $filterData 
     * @param DataGridSort[] $sorts 
     * @param int $pageSize 
     * @param int $offset 
     * @return array{sql: string, params: array} 
     */
    private function build_query($settings, $search, $filterData, $sorts, $pageSize, $offset)
    {
        // Xây dựng các phần của câu truy vấn
        $fields = $settings->fields;
        if (is_string($fields)) {
            $fields = $fields;
        } elseif (is_array($fields)) {
            $fields = implode(', ', array_map(function ($field) {
                return strpos($field, '.') === false ? "t.$field" : $field;
            }, $fields));
        }

        $joins = '';
        foreach ($settings->joins as $join) {
            $joins .= " {$join->type} JOIN {$join->table} AS " . ($join->alias ? $join->alias : $join->table) . " ON {$join->condition}";
        }

        $searchLikes = [];
        $params = [];
        foreach ($settings->searchFields as $field) {
            $searchLikes[] = strpos($field, '.') === false ? "t.$field LIKE ?" : "($field) LIKE ?";
            $params[] = $search;
        }

        $query = "
            SELECT 
                $fields FROM {$settings->table} AS t $joins
            WHERE 
                (" . implode(' OR ', $searchLikes) . ")";

        $filterConditions = [];
        foreach ($settings->filters as $filter) {
            if (isset($filterData[$filter->index]) && $filterData[$filter->index] !== '') {
                if ($filter->type === 'SELECT') {
                    $filterConditions[] = "t.{$filter->index} = ?";
                    $params[] = $filterData[$filter->index];
                } else {
                    $filterConditions[] = "t.{$filter->index} LIKE ?";
                    $params[] = '%' . $filterData[$filter->index] . '%';
                }
            }
        }

        if (!empty($filterConditions)) {
            $query .= " AND (" . implode(' AND ', $filterConditions) . ")";
        }

        $softwareAndSiteFilters = $this->getSoftwareAndSiteFilters($settings->table);
        if ($softwareAndSiteFilters['softwareFilter'] || $softwareAndSiteFilters['siteFilter']) {
            if ($softwareAndSiteFilters['softwareFilter']) {
                $query .= ' AND ' . $softwareAndSiteFilters['softwareFilter'];
            }
            if ($softwareAndSiteFilters['siteFilter']) {
                $query.= ' AND '. $softwareAndSiteFilters['siteFilter'];
            }
        }

        $orderBys = [];
        foreach ($sorts as $sort) {
            $orderBys[] = "t.{$sort->index} {$sort->direction}";
        }
        $orderBy = implode(', ', $orderBys);

        $query .= " ORDER BY $orderBy LIMIT ?, ?";
        $params[] = $offset;
        $params[] = $pageSize;

        return [
            'sql' => $query,
            'params' => $params
        ];
    }

    private function getSoftwareAndSiteFilters($table)
    {
        $software = $this->input->get_request_header('X-Api-Software');
        $site = $this->input->get_request_header('X-Api-Site');
        $softwareFilter = '';
        $siteFilter = '';
        if ($this->isFieldExisted($table, 'software')) {
            $softwareFilter = "software = '$software'";
        }

        if ($this->isFieldExisted($table, 'site')) {
            $siteFilter = "site in ($site, 0)";
        }
        return array('softwareFilter' => $softwareFilter, 'siteFilter' => $siteFilter);
    }

    private function isFieldExisted($table, $field)
    {
        $query = "DESCRIBE $table";
        $result = $this->db->query($query)->result_array();
        foreach ($result as $row) {
            if ($row['Field'] === $field) {
                return true;
            }
        }
        return false;
    }

    /**
     * 
     * @param DataGridSettings $settings 
     * @param string $search 
     * @param array $filterData 
     * @return array{sql: string, params: array} 
     */
    private function build_total_count_query($settings, $search, $filterData)
    {
        // Xây dựng câu truy vấn để đếm số bản ghi
        $searchLikes = [];
        $params = [];
        foreach ($settings->searchFields as $field) {
            $searchLikes[] = strpos($field, '.') === false ? "t.$field LIKE ?" : "($field) LIKE ?";
            $params[] = $search;
        }

        $joins = '';
        foreach ($settings->joins as $join) {
            $joins .= " {$join->type} JOIN {$join->table} AS " . ($join->alias ? $join->alias : $join->table) . " ON {$join->condition}";
        }

        $totalCountQuery = "
            SELECT COUNT(*) as total FROM {$settings->table} AS t $joins WHERE (" . implode(' OR ', $searchLikes) . ")";

        $filterConditions = [];
        foreach ($settings->filters as $filter) {
            if (isset($filterData[$filter->index]) && $filterData[$filter->index] !== '') {
                if ($filter->type === 'SELECT') {
                    $filterConditions[] = "t.{$filter->index} = ?";
                    $params[] = $filterData[$filter->index];
                } else {
                    $filterConditions[] = "t.{$filter->index} LIKE ?";
                    $params[] = '%' . $filterData[$filter->index] . '%';
                }
            }
        }

        if (!empty($filterConditions)) {
            $totalCountQuery .= " AND (" . implode(' AND ', $filterConditions) . ")";
        }

        $softwareAndSiteFilters = $this->getSoftwareAndSiteFilters($settings->table);
        if ($softwareAndSiteFilters['softwareFilter'] || $softwareAndSiteFilters['siteFilter']) {
            if ($softwareAndSiteFilters['softwareFilter']) {
                $totalCountQuery.= ' AND '. $softwareAndSiteFilters['softwareFilter'];
            }
            if ($softwareAndSiteFilters['siteFilter']) {
                $totalCountQuery.= ' AND '. $softwareAndSiteFilters['siteFilter'];
            }
        }

        return [
            'sql' => $totalCountQuery,
            'params' => $params
        ];
    }

    protected function casting_numeric_fields($items)
    {
        foreach ($items as &$item) {
            foreach ($item as $key => $value) {
                if (strlen($value) < 8 && is_numeric($value)) {
                    $item[$key] = floatval($value);
                }
            }
        }
        return $items;
    }
}
