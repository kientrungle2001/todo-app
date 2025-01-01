<?php
class Test extends CI_Controller
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
     * @var test_model
     */
    public $test_model;

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

    public function questions($testId)
    {
        $this->load->model('test_model');
        $questions = $this->test_model->get_questions($testId);
        $this->output->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($questions));

    }
}