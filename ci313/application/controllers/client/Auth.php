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
                $jwt = JWT::encode($token, 'SC2lcAAA23!!@C!!^');
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

    public function register()
    {
        $this->load->library('form_validation');

        $this->form_validation->set_rules('username', 'Username', 'required');
        $this->form_validation->set_rules('password', 'Password', 'required');
		$this->form_validation->set_rules('confirmPassword', 'Confirm Password', 'required');
		$this->form_validation->set_rules('name', 'Name', 'required');
		$this->form_validation->set_rules('phone', 'Phone', 'required');

        if ($this->form_validation->run()) {
			$this->load->model('user_model');
			$user = $this->user_model->get_by_username($this->input->post('username'));
			if ($user) {
				$this->output->set_status_header(400)
                    ->set_content_type('application/json', 'utf-8')
                    ->set_output(json_encode(array('error' => 'Invalid credentials')));
			} else {
				$this->user_model->create([
					'username' => $this->input->post('username'),
					'password' => md5($this->input->post('password')),
					'name' => $this->input->post('name'),
					'phone' => $this->input->post('phone'),
					'email' => $this->input->post('email') ? $this->input->post('email') : '',
					'areacode' => $this->input->post('provinceId') ? $this->input->post('provinceId') : '',
					'class' => $this->input->post('class') ? $this->input->post('class') : '',
				]);
				$this->login();
			}
        }
    }
}
