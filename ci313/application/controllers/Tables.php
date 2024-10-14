<?php
defined('BASEPATH') OR exit('No direct script access allowed');

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
     * 
     * @var Table_model
     */
    public $Table_model;

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Table_model');
        $this->load->library('JWT');
    }

    public function authenticate()
    {
        $token = $this->input->get_request_header('Authorization', TRUE);
        $token = $this->extractToken($token);
        
        $authResponse = $this->Table_model->authenticate($token);
        if ($authResponse['status'] !== 200) {
            $this->output
                ->set_status_header($authResponse['status'])
                ->set_content_type('application/json')
                ->set_output(json_encode(['error' => $authResponse['error']]));
            return;
        }
    }

    public function search($table)
    {
        $this->authenticate();

        $page = intval($this->input->post('page')) ?: 1;
        $pageSize = intval($this->input->post('pageSize')) ?: 10;
        $search = '%' . $this->input->post('search') . '%';
        $sorts = $this->input->post('sorts');
        $filterData = $this->input->post('filterData');

        $response = $this->Table_model->search($table, $page, $pageSize, $search, $sorts, $filterData);
        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json')
            ->set_output(json_encode($response));
    }

    public function map($table)
    {
        $this->authenticate();

        $fields = $this->input->post('fields');
        $condition = $this->input->post('condition');
        $orderBy = $this->input->post('orderBy');

        $response = $this->Table_model->map($table, $fields, $condition, $orderBy);
        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json')
            ->set_output(json_encode($response));
    }

    public function detail($table, $id)
    {
        $this->authenticate();

        $response = $this->Table_model->detail($table, $id);
        if ($response) {
            $this->output
                ->set_status_header(200)
                ->set_content_type('application/json')
                ->set_output(json_encode($response));
        } else {
            $this->output
                ->set_status_header(404)
                ->set_content_type('application/json')
                ->set_output(json_encode(['error' => 'Not found']));
        }
    }

    public function update($table, $id)
    {
        $this->authenticate();

        $fields = $this->input->post('fields');
        $item = $this->input->post('item');

        $response = $this->Table_model->update($table, $id, $fields, $item);
        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json')
            ->set_output(json_encode($response));
    }

    public function delete($table, $id)
    {
        $this->authenticate();

        $response = $this->Table_model->delete($table, $id);
        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json')
            ->set_output(json_encode($response));
    }

    public function create($table)
    {
        $this->authenticate();

        $fields = $this->input->post('fields');
        $item = $this->input->post('item');

        $response = $this->Table_model->create($table, $fields, $item);
        $this->output
            ->set_status_header(201)
            ->set_content_type('application/json')
            ->set_output(json_encode($response));
    }

    public function update_column($table)
    {
        $this->authenticate();

        $column = $this->input->post('column');
        $values = $this->input->post('values');

        $response = $this->Table_model->update_column($table, $column, $values);
        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json')
            ->set_output(json_encode($response));
    }

    private function extractToken($header)
    {
        if (!$header) {
            return '';
        }
        $token = explode(' ', $header);
        return isset($token[1]) ? $token[1] : '';
    }
}
