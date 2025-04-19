<?php
class Table_model extends CI_Model
{
    public $tokenInfo;

    public function authenticate($token)
    {
        if (!$token) {
            return ['status' => 401, 'error' => 'Invalid token'];
        }

        try {
            $this->tokenInfo = JWT::decode($token, 'SC2lcAAA23!!@C!!^', ['HS256']);
            return ['status' => 200];
        } catch (Exception $e) {
            return ['status' => 401, 'error' => 'Invalid token'];
        }
    }

    public function search($settings, $page = 1, $pageSize = 10, $search = '%', $sorts = [], $filterData = [], $defaultFilters = [])
    {
        $sorts = array_map(function ($sort) {
            $sortObj = new DataGridSort();
            populateFromRequest($sortObj, $sort);
            return $sortObj;
        }, $sorts);
        $offset = ($page - 1) * $pageSize;

        $settingsObj = new DataGridSettings();
        // Populate settings from the input (or pass as argument)
        populateFromRequest($settingsObj, $settings);

        $query = $this->build_query($settingsObj, $search, $filterData, $defaultFilters, $sorts, $pageSize, $offset);
        $totalCountQuery = $this->build_total_count_query($settingsObj, $search, $filterData, $defaultFilters);

        $total = $this->db->query($totalCountQuery['sql'], $totalCountQuery['params'])->row()->total;
        $items = $this->db->query($query['sql'], $query['params'])->result_array();
        foreach ($settingsObj->columns as $column) {
            if ($column->type === 'reference') {
                foreach ($items as &$item) {
                    $item[$column->index] = $this->getItemReferenceValues($column, $item[$column->index]);
                }
            } elseif ($column->type === 'group') {
                foreach ($column->groupChildren as $childColumn) {
                    if ($childColumn->type === 'reference') {
                        foreach ($items as &$item) {
                            $item[$childColumn->index] = $this->getItemReferenceValues($childColumn, $item[$childColumn->index]);
                        }
                    }
                }
            }
        }

        return [
            'query' => $query['sql'],
            'params' => $query['params'],
            'totalQuery' => $totalCountQuery['sql'],
            'totalParams' => $totalCountQuery['params'],
            'items' => $this->casting_numeric_fields($items),
            'totalItems' => intval($total)
        ];
    }

    protected function getItemReferenceValues(DataGridColumn $column, $value)
    {
        $query = "SELECT id, {$column->referenceField} as label FROM {$column->referenceTable} WHERE FIND_IN_SET(id, ?)";
        return $this->db->query($query, [$value])->result_array();
    }

    public function map($table, $fields, $condition = '', $orderBy = '')
    {
        $fields = implode(', ', $fields);
        $query = "SELECT {$fields} FROM `$table` as t WHERE 1";

        // Apply filters
        $softwareAndSiteFilters = $this->getSoftwareAndSiteFilters($table);
        if ($softwareAndSiteFilters['softwareFilter']) {
            $query .= ' AND ' . $softwareAndSiteFilters['softwareFilter'];
        }
        if ($softwareAndSiteFilters['siteFilter']) {
            $query .= ' AND ' . $softwareAndSiteFilters['siteFilter'];
        }
        if ($condition) {
            $query .= " AND $condition";
        }
        if ($orderBy) {
            $query .= " ORDER BY $orderBy";
        }

        return $this->casting_numeric_fields($this->db->query($query)->result_array());
    }

    public function detail($table, $id)
    {
        $item = $this->db->query("SELECT * FROM `$table` WHERE id =?", [$id])->row_array();
        $cast = $this->casting_numeric_fields([$item]);
        return isset($cast[0]) ? $cast[0] : null;
    }

    public function update($table, $id, $fields, $item)
    {
        $data = [];
        foreach ($fields as $field) {
            if (isset($item[$field['index']])) {
                $data[$field['index']] = $item[$field['index']];
            }
        }
        $this->applySoftwareAndSiteFields($data, $table);
        $this->applyModifiedFields($data, $table);

        $this->db->where('id', $id);
        $this->db->update($table, $data);
        return ['message' => 'Update successful'];
    }

    public function delete($table, $id)
    {
        $this->db->where('id', $id);
        $this->db->delete($table);
        return ['message' => 'Delete successful'];
    }

    public function create($table, $fields, $item)
    {
        $data = [];
        foreach ($fields as $field) {
            if (isset($item[$field['index']])) {
                $data[$field['index']] = $item[$field['index']];
            }
        }
        $this->applySoftwareAndSiteFields($data, $table);
        $this->applyCreatedFields($data, $table);

        $this->db->insert($table, $data);
        return ['id' => $this->db->insert_id()];
    }

    public function update_column($table, $column, $values)
    {
        foreach ($values as $item) {
            $id = $item['id'];
            $value = $item['value'];
            $this->db->set($column['index'], $value, true);
            $this->db->where('id', $id);
            $this->db->update($table);
        }
        return ['message' => 'Update successful'];
    }

    private function applySoftwareAndSiteFields(&$data, $table)
    {
        $software = $this->input->get_request_header('X-Api-Software');
        $site = $this->input->get_request_header('X-Api-Site');
        if ($this->isFieldExisted($table, 'software')) {
            $data['software'] = $software;
        }
        if ($this->isFieldExisted($table, 'site') && !isset($data['site'])) {
            $data['site'] = $site;
        }
        return $this;
    }

    private function applyCreatedFields(&$data, $table)
    {
        if ($this->isFieldExisted($table, 'creatorId')) {
            $data['creatorId'] = $this->tokenInfo->data->id;
        }

        if ($this->isFieldExisted($table, 'created')) {
            $data['created'] = date('Y-m-d H:i:s');
        }
        return $this;
    }

    private function applyModifiedFields(&$data, $table)
    {
        if ($this->isFieldExisted($table, 'modifiedId')) {
            $data['modifiedId'] = $this->tokenInfo->data->id;
        }

        if ($this->isFieldExisted($table, 'modified')) {
            $data['modified'] = date('Y-m-d H:i:s');
        }
        return $this;
    }

    // ... (Other private methods remain unchanged)

    protected function casting_numeric_fields($items)
    {
        foreach ($items as &$item) {
            foreach ($item as $key => $value) {
                if (is_string($value) && strlen($value) < 8 && is_numeric($value)) {
                    $item[$key] = floatval($value);
                }
            }
        }
        return $items;
    }

    private function getSoftwareAndSiteFilters($table)
    {
        $software = $this->input->get_request_header('X-Api-Software');
        $site = $this->input->get_request_header('X-Api-Site');
        $softwareFilter = '';
        $siteFilter = '';
        if ($this->isFieldExisted($table, 'software')) {
            $softwareFilter = "t.software = '$software'";
        }

        if ($this->isFieldExisted($table, 'site')) {
            $siteFilter = "t.site in ($site, 0)";
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
     * @param DataGridSort[] $sorts 
     * @param int $pageSize 
     * @param int $offset 
     * @return array{sql: string, params: array} 
     */
    private function build_query($settings, $search, $filterData, $defaultFilters, $sorts, $pageSize, $offset)
    {
        // Xây dựng các phần của câu truy vấn
        $fields = $settings->fields;
        if (is_string($fields)) {
            $fields = $fields;
        } elseif (is_array($fields)) {
            $fields = implode(', ', array_map(function ($field) use ($settings) {
                if (strpos($field, '.') === false) {
                    if ($this->isFieldExisted($settings->table, $field)) {
                        return "t.$field";
                    } else {
                        return $field;
                    }
                } else {
                    return $field;
                }
            }, $fields));
        }

        $joins = '';
        if ($settings->joins) {
            foreach ($settings->joins as $join) {
                $joins .= " {$join->type} JOIN {$join->table} AS " . ($join->alias ? $join->alias : $join->table) . " ON {$join->condition}";
            }
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
                if ($filter->comparisonOperator === 'equal') {
                    $filterConditions[] = "t.{$filter->index} = ?";
                    $params[] = $filterData[$filter->index];
                } else if ($filter->comparisonOperator === 'inset') {
                    $filterConditions[] = 'find_in_set(?, ' . "t.{$filter->index} )";
                    $params[] = $filterData[$filter->index];
                } else {
                    $filterConditions[] = "t.{$filter->index} LIKE ?";
                    $params[] = '%' . $filterData[$filter->index] . '%';
                }
            }
        }

        if ($defaultFilters) {
            foreach ($defaultFilters as $key => $value) {
                $filterConditions[] = "t.{$key} = ?";
                $params[] = $value;
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
                $query .= ' AND ' . $softwareAndSiteFilters['siteFilter'];
            }
        }

        $orderBys = [];
        foreach ($sorts as $sort) {
            if (strpos($sort->index, '.') === false) {
                if ($this->isFieldExisted($settings->table, $sort->index)) {
                    $orderBys[] = "t.{$sort->index} {$sort->direction}";
                } else {
                    $orderBys[] = "{$sort->index} {$sort->direction}";
                }
            } else {
                $orderBys[] = "{$sort->index} {$sort->direction}";
            }
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

    /**
     * 
     * @param DataGridSettings $settings 
     * @param string $search 
     * @param array $filterData 
     * @return array{sql: string, params: array} 
     */
    private function build_total_count_query($settings, $search, $filterData, $defaultFilters)
    {
        // Xây dựng câu truy vấn để đếm số bản ghi
        $searchLikes = [];
        $params = [];
        foreach ($settings->searchFields as $field) {
            $searchLikes[] = strpos($field, '.') === false ? "t.$field LIKE ?" : "($field) LIKE ?";
            $params[] = $search;
        }

        $joins = '';
        if ($settings->joins) {
            foreach ($settings->joins as $join) {
                $joins .= " {$join->type} JOIN {$join->table} AS " . ($join->alias ? $join->alias : $join->table) . " ON {$join->condition}";
            }
        }

        $totalCountQuery = "
            SELECT COUNT(*) as total FROM {$settings->table} AS t $joins WHERE (" . implode(' OR ', $searchLikes) . ")";

        $filterConditions = [];
        foreach ($settings->filters as $filter) {
            if (isset($filterData[$filter->index]) && $filterData[$filter->index] !== '') {
                if ($filter->comparisonOperator === 'equal') {
                    $filterConditions[] = "t.{$filter->index} = ?";
                    $params[] = $filterData[$filter->index];
                } else if ($filter->comparisonOperator === 'inset') {
                    $filterConditions[] = 'find_in_set(?, ' . "t.{$filter->index} )";
                    $params[] = $filterData[$filter->index];
                } else {
                    $filterConditions[] = "t.{$filter->index} LIKE ?";
                    $params[] = '%' . $filterData[$filter->index] . '%';
                }
            }
        }

        if ($defaultFilters) {
            foreach ($defaultFilters as $key => $value) {
                $filterConditions[] = "t.{$key} = ?";
                $params[] = $value;
            }
        }

        if (!empty($filterConditions)) {
            $totalCountQuery .= " AND (" . implode(' AND ', $filterConditions) . ")";
        }

        $softwareAndSiteFilters = $this->getSoftwareAndSiteFilters($settings->table);
        if ($softwareAndSiteFilters['softwareFilter'] || $softwareAndSiteFilters['siteFilter']) {
            if ($softwareAndSiteFilters['softwareFilter']) {
                $totalCountQuery .= ' AND ' . $softwareAndSiteFilters['softwareFilter'];
            }
            if ($softwareAndSiteFilters['siteFilter']) {
                $totalCountQuery .= ' AND ' . $softwareAndSiteFilters['siteFilter'];
            }
        }

        return [
            'sql' => $totalCountQuery,
            'params' => $params
        ];
    }
}
