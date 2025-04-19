<?php
class Course extends CI_Controller
{

    /**
     * @var CI_Output
     */
    public $output;
    
    /**
     * @var course_model
     */
    public $course_model;

    public function courses()
    {
        $courses = $this->course_model->get_all();
        $this->output->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($courses));
    }
}