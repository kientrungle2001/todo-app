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

    public function detail($table, $id, $settings)
    {
        // TODO: detail by settings
        $settingsObj = new DataGridSettings();
        populateFromRequest($settingsObj, $settings);
        $item = $this->db->query("SELECT * FROM `$table` WHERE id =?", [$id])->row_array();
        foreach ($settingsObj->addFields as $addField) {
            if ($addField->type == 'many') {
                $linkTable = $addField->linkTable;
                $linkField = $addField->linkField;
                $tableField = $addField->tableField;
                $rows = $this->db->query("SELECT * FROM `$linkTable` WHERE `$linkField` =?", [$id])->result_array();
                $valueIds = [];
                foreach ($rows as $row) {
                    $valueIds[] = $row[$tableField];
                }
                $item[$addField->index] = implode(',', $valueIds);
                if ($item[$addField->index]) {
                    $item[$addField->index] = ',' . $item[$addField->index] . ',';
                }
            }
        }
        $cast = $this->casting_numeric_fields([$item]);
        return isset($cast[0]) ? $cast[0] : null;
    }

    public function update($table, $id, $fields, $item)
    {
        $data = [];
        foreach ($fields as $field) {
            $fieldObj = new DataGridEditField();
            populateFromRequest($fieldObj, $field);
            if (!isset($item[$fieldObj->index])) continue;
            if ($fieldObj->type == 'many') {
                $linkTable = $fieldObj->linkTable;
                $linkField = $fieldObj->linkField;
                $tableField = $fieldObj->tableField;
                if (!$item[$fieldObj->index]) {
                    $this->db->query("DELETE FROM $linkTable WHERE $linkField = ?", [$id]);
                } else {
                    $values = trim($item[$fieldObj->index], ',');
                    $values = explode(',', $values);
                    // xóa bản ghi không nằm trong danh sách
                    $this->db->query("DELETE FROM $linkTable WHERE $linkField not in ?", [$values]);
                    // chèn vào những bản ghi mới
                    foreach ($values as $value) {
                        $count = $this->db->query("SELECT count(*) as c FROM $linkTable WHERE $linkField = ? AND $tableField = ?", [$id, $value])->row_array();
                        if (!$count['c']) {
                            $this->db->query("INSERT INTO $linkTable ($linkField, $tableField) VALUES (?, ?)", [$id, $value]);
                        }
                    }
                }

                continue;
            }
            if (isset($fieldObj->multiple) && $fieldObj->multiple) {
                $value = $item[$fieldObj->index];
                if ($value) {
                    $value = explode(',', $value);
                    $values = [];
                    foreach ($value as $v) {
                        if ($v) {
                            $values[] = $v;
                        }
                    }
                    if (count($values)) {
                        $value = ',' . implode(',', $values) . ',';
                    } else {
                        $value = '';
                    }
                }
                $item[$fieldObj->index] = $value;
            }
            $data[$fieldObj->index] = $item[$fieldObj->index];
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

    public function update_attendance($table, $classId, $paymentPeriodId, $attendances)
    {
        foreach ($attendances as $attendance) {
            if ($attendance['status'] === '') {
                $attendance['status'] = 0;
            }
            $item = $this->db->query('select * from `' . $table . '` where classId=? and paymentPeriodId=? and studentId=? and attendanceDate=?', [$classId, $paymentPeriodId, $attendance['studentId'], $attendance['attendanceDate']])->row_array();
            if ($item) {
                $this->db->set('status', $attendance['status'])
                    ->where('id', $item['id'])->update($table);
            } else {
                $this->db->insert($table, [
                    'classId' => $classId,
                    'paymentPeriodId' => $paymentPeriodId,
                    'studentId' => $attendance['studentId'],
                    'attendanceDate' => $attendance['attendanceDate'],
                    'status' => $attendance['status']
                ]);
            }
        }
        return ['message' => 'Update successful'];
    }

    public function calculate_info_for_create_phieu_thu($table, $classId, $paymentPeriodId, $students)
    {
        $result = [];
        foreach ($students as $student) {
            $studentId = $student['studentId'];
            $total_attendances = $this->getTotalAttendances($classId, $paymentPeriodId, $studentId);
            $substract_attendances = $this->getSubtractAttendances($classId, $paymentPeriodId, $studentId);
            $prev_subtract_attendances = $this->getPrevSubtractAttendances($classId, $paymentPeriodId, $studentId);
            $result[$studentId] = [
                'total_attendances' => $total_attendances,
                'substract_attendances' => $substract_attendances,
                'prev_subtract_attendances' => $prev_subtract_attendances
            ];
        }

        return $result;
    }

    public function create_phieu_thu($table, $classId, $paymentPeriodId, $students, $orderData)
    {
        $result = [];
        $info = $this->calculate_info_for_create_phieu_thu($table, $classId, $paymentPeriodId, $students);

        foreach ($info as $studentId => $orderInfo) {
            return $this->createOrderPhieuThu($classId, $paymentPeriodId, $studentId, $orderInfo, $orderData);
        }

        return $result;
    }

    public function createOrderPhieuThu($classId, $paymentPeriodId, $studentId, $orderInfo, $orderData)
    {
        $class = $this->getOne('classes', $classId);
        $subject = null;
        if ($class['subjectId'])
            $subject = $this->getOne('subject', $class['subjectId']);
        $period = $this->getOne('payment_period', $paymentPeriodId);
        $student = $this->getOne('student', $studentId);
        $reason = 'Nộp tiền lớp ' . $class['name'];
        if ($subject) $reason .= ' môn ' . $subject['name'];
        if ($period) $reason .= ', ' . $period['name'];
        $amount = $class['amount'] * ($orderInfo['total_attendances']
            - $orderInfo['substract_attendances']
            - $orderInfo['prev_subtract_attendances']);
        $order = array(
            'orderType' => 'invoice',
            'type' => 'student',
            'amount' => $amount,
            'reason' => $reason,
            'createdTime' => time(),
            'created' => date('Y-m-d H:i:s'),
            'bookNum' => 245,
            'noNum' => 48,
            'debit' => 0,
            'name' => $student['name'],
            'address' => $student['address'],
            'phone' => $student['phone'],
            'additional' => '',
            'invoiceNum' => '0',
            'status' => '',
            'studentId' => $studentId,
            'teacherId' => 0,
            'partnerId' => 0,
            'paymentType' => 1,
            'adviceId' => 0,
            'paymentNote' => '',
            'bank' => '',
            'transactionCode' => '',
            'shipperId' => 0,
            'shipCode' => '',
            'gift_amount' => 0
        );
        $order_detail = array(
            'orderId' => 0,
            'studentId' => $studentId,
            'classId' => $classId,
            'amount' => $amount,
            'payment_periodId' => $paymentPeriodId,
            'createdTime' => time(),
            'created' => date('Y-m-d H:i:s'),
            'bookNum' => 0,
            'noNum' => 0,
            'debit' => 0,
            'name' => $student['name'],
            'address' => $student['address'],
            'phone' => $student['phone'],
            'reason' => $reason,
            'additional' => '',
            'invoiceNum' => '0',
            'muster' => $orderInfo['total_attendances'] - $orderInfo['substract_attendances'],
            'discount' => $orderInfo['prev_subtract_attendances'] * $class['amount'],
            'total_before_discount' => ($orderInfo['total_attendances'] - $orderInfo['substract_attendances']) * $class['amount'],
            'price' => intval($class['amount']),
            'discount_reason' => $orderInfo['prev_subtract_attendances'] ? 'Trừ T.trước ' . $orderInfo['prev_subtract_attendances'] . ' buổi' : '',
            'status' => '',
            'gift_amount' => '',
            'unit' => ''
        );
        $order['detail'] = $order_detail;
        return $order;
    }

    public function getTotalAttendances($classId, $paymentPeriodId, $studentId)
    {
        $period = $this->getOne('payment_period', $paymentPeriodId);
        $attendances = $this->getMany('student_attendance', 'classId', $classId, array(
            'studentId' => $studentId,
            'attendanceDate >=' => $period['startDate'],
            'attendanceDate <=' => $period['endDate'],
        ));
        return count($attendances);
    }

    public function getSubtractAttendances($classId, $paymentPeriodId, $studentId)
    {
        $period = $this->getOne('payment_period', $paymentPeriodId);
        $attendances = $this->getMany('student_attendance', 'classId', $classId, array(
            'studentId' => $studentId,
            'attendanceDate >=' => $period['startDate'],
            'attendanceDate <=' => $period['endDate'],
            'status' => 4
        ));
        return count($attendances);
    }

    public function getPrevSubtractAttendances($classId, $paymentPeriodId, $studentId)
    {
        $prev_period = $this->getPrevPeroid($classId, $paymentPeriodId);

        if ($prev_period) {
            $attendances = $this->getMany('student_attendance', 'classId', $classId, array(
                'studentId' => $studentId,
                'attendanceDate >=' => $prev_period['startDate'],
                'attendanceDate <=' => $prev_period['endDate'],
                'status' => 2
            ));
            return count($attendances);
        }
        return 0;
    }

    protected function getPrevPeroid($classId, $paymentPeriodId)
    {
        $period = $this->getOne('payment_period', $paymentPeriodId);
        if ($period) {
            $rows = $this->getMany('class_payment_period', 'classId', $classId);
            $prev_periods = array();
            foreach ($rows as $row) {
                $prev_period = $this->getOne('payment_period', $row['paymentPeriodId']);
                $prev_periods[] = $prev_period;
            }
            $prev_periods = array_filter($prev_periods, function ($prev_period) use ($period) {
                return $prev_period['status'] && $prev_period['startDate'] < $period['startDate'];
            });
            usort($prev_periods, function ($a, $b) {
                return $a['startDate'] > $b['startDate'] ? -1 : 1;
            });
            if (count($prev_periods)) {
                return $prev_periods[0];
            }
        }
        return null;
    }

    public function getOne($table, $id)
    {
        return $this->db->where('id', $id)->get($table)->row_array();
    }

    public function getMany($table, $field, $id, $conds = array())
    {
        $this->db->where($field, $id);
        if ($conds) {
            $this->db->where($conds);
        }
        return $this->db->get($table)->result_array();
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
                if (is_array($value)) {
                    if (isset($value['from'])) {
                        $filterConditions[] = "t.{$key} >= ?";
                        $params[] = $value['from'];
                    }
                    if (isset($value['to'])) {
                        $filterConditions[] = "t.{$key} <= ?";
                        $params[] = $value['to'];
                    }
                    if (isset($value[0])) {
                        $filterConditions[] = "t.{$key} in (?)";
                        $params[] = $value;
                    }
                } else {
                    $filterConditions[] = "t.{$key} = ?";
                    $params[] = $value;
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
                if (is_array($value)) {
                    if (isset($value['from'])) {
                        $filterConditions[] = "t.{$key} >= ?";
                        $params[] = $value['from'];
                    }
                    if (isset($value['to'])) {
                        $filterConditions[] = "t.{$key} <= ?";
                        $params[] = $value['to'];
                    }
                    if (isset($value[0])) {
                        $filterConditions[] = "t.{$key} in (?)";
                        $params[] = $value;
                    }
                } else {
                    $filterConditions[] = "t.{$key} = ?";
                    $params[] = $value;
                }
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
