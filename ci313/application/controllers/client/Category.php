<?php
class Category extends CI_Controller
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
     * @var category_model
     */
    public $category_model;

    public $tokenInfo;

    public function questions($categoryId)
    {
        $this->load->model('category_model');
        $questions = $this->category_model->get_questions($categoryId);
        $this->output->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($questions));

    }

    public function tests($categoryId)
    {
        $this->load->model('category_model');
        $tests = $this->category_model->get_tests($categoryId);
        $this->output->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($tests));

    }

    public function courses($categoryId)
    {
        $this->load->model('category_model');
        $courses = $this->category_model->get_courses($categoryId);
        $this->output->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($courses));
    }

    public function courses_by_alias()
    {
        $categoryAlias = $this->input->post('category_alias');
        $this->load->model('category_model');
        $courses = $this->category_model->get_courses_by_alias($categoryAlias);
        $this->output->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($courses));
    }
}