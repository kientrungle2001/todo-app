<?php
class Question extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->authenticate();
    }

    public function answers($questionId)
    {
        $answers = $this->question_model->get_answers($questionId);
        $this->json($answers);
    }

    public function updateAnswers($questionId)
    {
        $item = $this->input->post('item');
        $result = $this->question_model->update_answers($questionId, $item);
        $this->json($result);
    }
}
