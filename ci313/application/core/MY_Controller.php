<?php
defined('BASEPATH') or exit('No direct script access allowed');

class MY_Controller extends CI_Controller
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
     * @var CI_Form_validation
     */
    public $form_validation;

    /**
     * 
     * @var Table_model
     */
    public $Table_model;

    /**
     * @var test_model
     */
    public $test_model;

    /**
     * @var resource_model
     */
    public $resource_model;

    /**
     * @var question_model
     */
    public $question_model;

    /**
     * 
     * @var route_model
     */
    public $route_model;

    /**
     * @var payment_model
     */
    public $payment_model;

    public $tokenInfo;

    protected function authenticate()
    {
        $token = $this->input->get_request_header('Authorization', TRUE);
        $token = $this->extractToken($token);

        $authResponse = $this->Table_model->authenticate($token);
        if ($authResponse['status'] !== 200) {
            $this->json_exception($authResponse['error'], $authResponse['status']);
        }
        $this->tokenInfo = $this->Table_model->tokenInfo;
    }

    private function extractToken($header)
    {
        if (!$header) {
            return '';
        }
        $token = explode(' ', $header);
        return isset($token[1]) ? $token[1] : '';
    }

    protected function json($data, $code = 200)
    {
        $this->output->set_status_header($code)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($data))->_display();
        die;
    }

    protected function json_exception($message, $code = 500)
    {
        $this->output->set_status_header($code)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode([
                'success' => false,
                'error' => $message,
                'message' => $message
            ]))->_display();
        die;
    }
}
