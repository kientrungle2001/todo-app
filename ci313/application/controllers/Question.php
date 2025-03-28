<?php
class Question extends CI_Controller
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
     * @var question_model
     */
    public $question_model;

    public $tokenInfo;

    public function __construct()
    {
        parent::__construct();
        $this->load->library('JWT');
        $token = $this->input->get_request_header('Authorization', TRUE);
        if (!$token) {
            $this->output->set_status_header(401)->set_content_type('application/json')->set_output(json_encode(array('error' => 'Invalid token')));
            die;
        }
        $token = explode(' ', $token);
        if (!isset($token[1]) || !trim($token[1])) {
            $token = '';
        } else {
            $token = $token[1];
        }
        try {
            $tokenInfo = JWT::decode($token, 'SC2lcAAA23!!@C!!^', array('HS256'));
        } catch (Exception $e) {
            $tokenInfo = null;
            $this->output->set_status_header(401)->set_content_type('application/json')->set_output(json_encode(array('error' => 'Invalid token')))->_display();
            die;
        }

        if (!$tokenInfo) {
            $this->output->set_status_header(401)->set_content_type('application/json')->set_output(json_encode(array('error' => 'Invalid token')))->_display();
            die;
        }
    }

    public function answers($questionId)
    {
        $this->load->model('question_model');
        $answers = $this->question_model->get_answers($questionId);
        $this->output->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($answers));
    }

    public function updateAnswers($questionId) {
        $this->load->model('question_model');
        $item = $this->input->post('item');
        $result = $this->question_model->update_answers($questionId, $item);
        $this->output->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($result));
    }
}
