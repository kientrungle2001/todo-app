<?php
class Practice extends CI_Controller
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

    public $tokenInfo;

    /**
     * 
     * @var Table_model
     */
    public $Table_model;

    /**
     * @var CI_DB
     */
    public $db;

    public function save()
    {
        
        $tokenInfo = $this->authenticate();
        if ($tokenInfo) {
            $resourceId = $this->input->post('resourceId');
            $numOfRights = $this->input->post('numOfRights');
            $numOfWrongs = $this->input->post('numOfWrongs');
            $totalMinutes = $this->input->post('totalMinutes');
            $remainingTime = $this->input->post('remainingTime');
            $duration = $totalMinutes * 60 - $remainingTime;
            $numOfQuestions = $numOfRights + $numOfWrongs;
            $resource = $this->db->where('id', $resourceId)->get('courses_resources', 1)->row();
            if ($resource) {
                $this->db->insert('courses_practice', array(
                    'numberOfQuestions' => $numOfQuestions,
                    'numberOfRights' => $numOfRights,
                    'studentId' => $tokenInfo->data->id,
                    'courseResourceId' => $resourceId,
                    'courseId' => $resource->courseId,
                    'totalMinutes' => $totalMinutes,
                    'duration' => $duration,
                    'created' => date('Y-m-d H:i:s')
                ));
                $this->output
                    ->set_status_header(200)
                    ->set_content_type('application/json')
                    ->set_output(json_encode([
                        'error' => false,
                        'numberOfQuestions' => $numOfQuestions,
                        'numberOfRights' => $numOfRights,
                        'studentId' => $tokenInfo->data->id,
                        'courseResourceId' => $resourceId,
                        'courseId' => $resource->courseId,
                        'totalMinutes' => $totalMinutes,
                        'duration' => $duration
                    ]))
                    ->_display();
                die;
            }
        }
    }

    public function history()
    {
        
        $tokenInfo = $this->authenticate();
        if ($tokenInfo) {
            $pageSize = $this->input->post('pageSize');
            $currentPage = $this->input->post('currentPage');
            $items = $this->db
                ->select('courses_practice.*, courses.name as courseName, courses_resources.name as resourceName')
                ->where('studentId', $tokenInfo->data->id)
                ->join('courses', 'courses_practice.courseId=courses.id', 'inner')
                ->join('courses_resources', 'courses_practice.courseResourceId=courses_resources.id', 'inner')
                ->limit($pageSize)->offset($pageSize * $currentPage)
                ->order_by('courses_practice.created', 'desc')->get('courses_practice')->result_array();
            $totalItems = $this->db->where('studentId', $tokenInfo->data->id)->count_all('courses_practice');
            $this->output
                ->set_status_header(200)
                ->set_content_type('application/json')
                ->set_output(json_encode([
                    'error' => false,
                    'items' => $items,
                    'totalItems' => $totalItems
                ]))
                ->_display();
            die;
        }
    }

    public function authenticate()
    {
        $token = $this->input->get_request_header('Authorization', TRUE);
        $token = $this->extractToken($token);

        $authResponse = $this->Table_model->authenticate($token);
        if ($authResponse['status'] !== 200) {
            $this->output
                ->set_status_header($authResponse['status'])
                ->set_content_type('application/json')
                ->set_output(json_encode(['error' => $authResponse['error']]))
                ->_display();
            die;
        }
        return $this->Table_model->tokenInfo;
    }

    private function extractToken($header)
    {
        if (!$header) {
            return '';
        }
        $token = explode(' ', $header);
        return isset($token[1]) ? $token[1] : '';
    }
}
