<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Tables extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->authenticate();
    }
    public function search($table)
    {
        $page = intval($this->input->post('page')) ?: 1;
        $pageSize = intval($this->input->post('pageSize')) ?: 10;
        $search = '%' . $this->input->post('search') . '%';
        $sorts = $this->input->post('sorts');
        $filterData = $this->input->post('filterData');
        $defaultFilters = $this->input->post('defaultFilters');
        $settings = $this->input->post('settings');

        $response = $this->Table_model->search($settings, $page, $pageSize, $search, $sorts, $filterData, $defaultFilters);
        $this->json($response);
    }

    public function map($table)
    {
        $fields = $this->input->post('fields');
        $condition = $this->input->post('condition');
        $orderBy = $this->input->post('orderBy');

        $response = $this->Table_model->map($table, $fields, $condition, $orderBy);
        $this->json($response);
    }

    public function detail($table, $id)
    {
        $response = $this->Table_model->detail($table, $id);
        if ($response) {
            $this->json($response);
        } else {
            $this->json_exception('Not found', 404);
        }
    }

    public function update($table, $id)
    {
        $fields = $this->input->post('fields');
        $item = $this->input->post('item');

        $response = $this->Table_model->update($table, $id, $fields, $item);
        $this->json($response);
    }

    public function delete($table, $id)
    {
        $response = $this->Table_model->delete($table, $id);
        $this->json($response);
    }

    public function create($table)
    {
        $fields = $this->input->post('fields');
        $item = $this->input->post('item');

        $response = $this->Table_model->create($table, $fields, $item);
        $this->json($response);
    }

    public function update_column($table)
    {
        $column = $this->input->post('column');
        $values = $this->input->post('values');

        $response = $this->Table_model->update_column($table, $column, $values);
        $this->json($response);
    }

    public function update_attendance($table, $classId, $paymentPeriodId)
    {
        $attendances = $this->input->post('attendances');
        $response = $this->Table_model->update_attendance($table, $classId, $paymentPeriodId, $attendances);
        $this->json($response);
    }

    public function calculate_info_for_create_phieu_thu($table, $classId, $paymentPeriodId) {
        $students = $this->input->post('students');
        $response = $this->Table_model->calculate_info_for_create_phieu_thu($table, $classId, $paymentPeriodId, $students);
        $this->json($response);
    }
}
