<?php
class Test extends MY_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->authenticate();
    }

    public function questions($testId)
    {
        $questions = $this->test_model->get_questions($testId);
        $this->json($questions);
    }
}