<?php
# codeigniter 3 Police Controller

class Police extends CI_Controller
{
    /**
     * @var CI_Input
     */
    public $input;

    /**
     * 
     * @var CI_Output
     */
    public $output;

    /**
     * 
     * @var CI_Form_validation
     */
    public $form_validation;

    /**
     * 
     * @var route_model
     */
    public $route_model;

    public function route()
    {
        $this->load->library('form_validation');

        $this->form_validation->set_rules('alias', 'Alias', 'required');

        if ($this->form_validation->run()) {
            $alias = $this->input->post('alias');

            $this->load->model('route_model');
            $route = $this->route_model->get_by_alias($alias);
            if ($route) {
                
                $this->output->set_status_header(200)
                    ->set_content_type('application/json', 'utf-8')
                    ->set_output(json_encode(array('route' => $route)));
            } else {
                $this->output->set_status_header(400)
                    ->set_content_type('application/json', 'utf-8')
                    ->set_output(json_encode(array('error' => 'No route')));
            }
        }
    }

    public function course_route()
    {
        $this->load->library('form_validation');

        $this->form_validation->set_rules('alias', 'Alias', 'required');

        if ($this->form_validation->run()) {
            $alias = $this->input->post('alias');

            $this->load->model('route_model');
            $route = $this->route_model->course_get_by_alias($alias);
            if ($route) {
                
                $this->output->set_status_header(200)
                    ->set_content_type('application/json', 'utf-8')
                    ->set_output(json_encode(array('route' => $route)));
            } else {
                $this->output->set_status_header(400)
                    ->set_content_type('application/json', 'utf-8')
                    ->set_output(json_encode(array('error' => 'No route')));
            }
        }
    }
}
