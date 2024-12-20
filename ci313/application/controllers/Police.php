<?php
# codeigniter 3 Police Controller

class Police extends CI_Controller
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
     * @var route_model
     */
    public $route_model;

    /**
     * @var payment_model
     */
    public $payment_model;

    public function route()
    {
        $this->load->library('form_validation');

        $this->form_validation->set_rules('alias', 'Alias', 'required');

        if ($this->form_validation->run()) {
            $alias = $this->input->post('alias');

            $this->load->model('route_model');
            $route = $this->route_model->get_by_alias($alias);
            if ($route) {
                
                $this->output->set_status_header(200)
                    ->set_content_type('application/json', 'utf-8')
                    ->set_output(json_encode(array('route' => $route)));
            } else {
                $this->output->set_status_header(400)
                    ->set_content_type('application/json', 'utf-8')
                    ->set_output(json_encode(array('error' => 'No route')));
            }
        }
    }

    public function course_route()
    {
        $this->load->library('JWT');
        $token = $this->input->get_request_header('Authorization', TRUE);
        $user = false;
		$error = false;
		if ($token){
			$token = explode(' ', $token);
			if (!isset($token[1]) || !trim($token[1])) {
				$user = false;
			} else {
				$token = $token[1];
				try {
					$user = JWT::decode($token, 'your-secret-key', array('HS256'));
				} catch (Exception $e) {
					$user = false;
					$error = $e->getMessage();
				}
			}
		}

        $this->load->library('form_validation');

        $this->form_validation->set_rules('alias', 'Alias', 'required');

        if ($this->form_validation->run()) {
            $alias = $this->input->post('alias');

            $this->load->model('route_model');
            $route = $this->route_model->course_get_by_alias($alias);
            if ($route) {
                $payment = false;
                if ($user) {
                    // get user payment
                    $this->load->model('payment_model');
                    $payment = $this->payment_model->get_payment_info($user->data, $route);
                    if (!$payment) {
                        $payment = false;
                    }
                }
                $questions = false;
				if ($payment) {
					if ($route['type'] === 'resource') {
						// get questions of resource
						$this->load->model('question_model');
						$questions = $this->question_model->get_resource_questions($route['resource']->id);
					}

				}
				$route['questions'] = $questions;
                $this->output->set_status_header(200)
                    ->set_content_type('application/json', 'utf-8')
                    ->set_output(json_encode(array('route' => $route, 'user' => $user, 'payment' => $payment, 'error' => $error)));
            } else {
                $this->output->set_status_header(400)
                    ->set_content_type('application/json', 'utf-8')
                    ->set_output(json_encode(array('error' => 'No route', 'user' => $user)));
            }
        }
    }
}
