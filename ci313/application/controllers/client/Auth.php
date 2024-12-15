<?php
# codeigniter 3 Auth Controller

class Auth extends CI_Controller
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
     * @var user_model
     */
    public $user_model;

    public function login()
    {
        $this->load->library('form_validation');

        $this->form_validation->set_rules('username', 'Username', 'required');
        $this->form_validation->set_rules('password', 'Password', 'required');

        if ($this->form_validation->run()) {
            // Validate user credentials
            $username = $this->input->post('username');
            $password = $this->input->post('password');

            // Check if user exists in the database
            $this->load->model('user_model');
            $user = $this->user_model->get_by_username($username);

            if ($user && md5($password) === $user->password) {
                $user->password = null;
                # encrypt bearer token php5.6 for user unset password
                $this->load->library('JWT');
                $token = array(
                    'iat' => time(),
                    'exp' => time() + 3 * 60 * 60, // 10 secs
                    'data' => $user
                );
                $jwt = JWT::encode($token, 'your-secret-key');
                $this->output->set_status_header(200)
                    ->set_content_type('application/json', 'utf-8')
                    ->set_output(json_encode(array('token' => $jwt, 'user' => $user)));
            } else {
                $this->output->set_status_header(400)
                    ->set_content_type('application/json', 'utf-8')
                    ->set_output(json_encode(array('error' => 'Invalid credentials')));
            }
        }
    }
}
