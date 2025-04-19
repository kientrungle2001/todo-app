<?php
class Resource extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->authenticate();
    }

    public function questions($resourceId)
    {
        $questions = $this->resource_model->get_questions($resourceId);
        $this->json($questions);
    }

    public function tests($resourceId)
    {
        $tests = $this->resource_model->get_tests($resourceId);
        $this->json($tests);
    }

    public function courses($resourceId)
    {
        $courses = $this->resource_model->get_courses($resourceId);
        $this->json($courses);
    }
}