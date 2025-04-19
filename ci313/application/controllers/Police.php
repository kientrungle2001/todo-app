<?php
# codeigniter 3 Police Controller

class Police extends MY_Controller
{

    public function route()
    {
        $this->form_validation->set_rules('alias', 'Alias', 'required');

        if ($this->form_validation->run()) {
            $alias = $this->input->post('alias');

            $route = $this->route_model->get_by_alias($alias);
            if ($route) {
                $this->json(array(
                    'route' => $route
                ));
            } else {
                $this->json_exception('No route', 400);
            }
        }
    }

    public function document_route()
    {
        $this->form_validation->set_rules('alias', 'Alias', 'required');

        if ($this->form_validation->run()) {
            $alias = $this->input->post('alias');

            $route = $this->route_model->document_get_by_alias($alias);
            if ($route) {
                $this->json(array(
                    'route' => $route
                ));
            } else {
                $this->json_exception('No route', 400);
            }
        }
    }

    public function course_route()
    {
        $token = $this->input->get_request_header('Authorization', TRUE);
        $user = false;
        $error = false;
        if ($token) {
            $token = explode(' ', $token);
            if (!isset($token[1]) || !trim($token[1])) {
                $user = false;
            } else {
                $token = $token[1];
                try {
                    $user = JWT::decode($token, 'SC2lcAAA23!!@C!!^', array('HS256'));
                } catch (Exception $e) {
                    $user = false;
                    $error = $e->getMessage();
                }
            }
        }

        $this->form_validation->set_rules('alias', 'Alias', 'required');

        if ($this->form_validation->run()) {
            $alias = $this->input->post('alias');

            $route = $this->route_model->course_get_by_alias($alias);
            if ($route) {
                $payment = false;
                if ($user) {
                    // get user payment
                    $payment = $this->payment_model->get_payment_info($user->data, $route);
                    if (!$payment) {
                        $payment = false;
                    }
                }
                $questions = false;
                if ($payment) {
                    if ($route['type'] === 'resource') {
                        // get questions of resource
                        $questions = $this->question_model->get_resource_questions($route['resource']->id);
                    }
                }
                $route['questions'] = $questions;
                $this->json(array('route' => $route, 'user' => $user, 'payment' => $payment, 'error' => $error));
            } else {
                $this->json_exception(array(
                    'error' => 'No route',
                    'user' => $user
                ), 400);
            }
        }
    }
}
