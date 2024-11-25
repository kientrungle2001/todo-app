<?php
class Media extends CI_Controller
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
     * @var CI_Upload
     */
    public $upload;

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
            $tokenInfo = JWT::decode($token, 'your-secret-key', array('HS256'));
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

    public function list_images()
    {
        $path = $this->input->get('path', TRUE); // Get path from query params
        $this->load->helper('directory');

        $fullPath = FCPATH . '3rdparty/' . $path; // Assuming you store media in 'uploads' folder
        $map = directory_map($fullPath);

        $files = [];
        $folders = [];

        foreach ($map as $key => $item) {
            if (is_array($item)) {
                $folders[] = $key; // Folders
            } else {
                $files[] = $item; // Files
            }
        }

        $this->output->set_content_type('application/json')
            ->set_output(json_encode(['files' => $files, 'folders' => $folders]));
    }

    public function upload()
    {
        $config['upload_path'] = './3rdparty/' . $this->input->post('folder');
        $config['allowed_types'] = 'jpg|png|gif|jpeg|webp';
        $config['max_size'] = 2048; // 2MB max

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('file')) {
            $error = array('error' => $this->upload->display_errors());
            $this->output->set_content_type('application/json')
                ->set_output(json_encode($error));
        } else {
            $data = array('upload_data' => $this->upload->data());
            $this->create_thumbs($data);
            $this->output->set_content_type('application/json')
                ->set_output(json_encode($data));
        }
    }

    public function create_thumbs($data)
    {
        $width = 122;
        $height = 91;
        $this->load->library('image_lib');
        $config['image_library']  = 'gd2';
        $config['source_image']   = $data['upload_data']['full_path'];
        $config['create_thumb']   = false;
        $config['maintain_ratio'] = TRUE;
        $config['width']          = $width;
        $config['height']         = $height;
        $config['new_image']      = str_replace('/source/', '/thumbs/', $data['upload_data']['full_path']);
        $this->image_lib->initialize($config);
        if (! $this->image_lib->resize()) {
            echo $this->image_lib->display_errors();
        }
    }

    public function create_directory()
    {
        $folder = $this->input->post('folder', TRUE);
        $name = $this->input->post('name', TRUE);

        $fullPath = FCPATH . '3rdparty/' . $folder . '/' . $name;

        if (!file_exists($fullPath)) {
            mkdir($fullPath, 0755, TRUE); // Create directory with 755 permissions
            $this->output->set_content_type('application/json')
                ->set_output(json_encode(['status' => 'success', 'message' => 'Directory created']));
        } else {
            $this->output->set_content_type('application/json')
                ->set_output(json_encode(['status' => 'error', 'message' => 'Directory already exists']));
        }
    }

    public function delete()
    {
        $path = $this->input->input_stream('path', TRUE);
        $fullPath = FCPATH . '3rdparty/' . $path;

        if (is_dir($fullPath)) {
            if (count(scandir($fullPath)) == 2) { // Empty directory
                rmdir($fullPath);
                $this->output->set_content_type('application/json')
                    ->set_output(json_encode(['status' => 'success', 'message' => 'Directory deleted']));
            } else {
                $this->output->set_content_type('application/json')
                    ->set_output(json_encode(['status' => 'error', 'message' => 'Directory not empty']));
            }
        } elseif (is_file($fullPath)) {
            unlink($fullPath);
            $this->output->set_content_type('application/json')
                ->set_output(json_encode(['status' => 'success', 'message' => 'File deleted']));
        } else {
            $this->output->set_content_type('application/json')
                ->set_output(json_encode(['status' => 'error', 'message' => 'File/Directory not found']));
        }
    }

    public function rename()
    {
        $folder = $this->input->post('folder', TRUE);
        $oldName = $this->input->post('oldName', TRUE);
        $newName = $this->input->post('newName', TRUE);

        $fullOldPath = FCPATH . '3rdparty/' . $folder . '/' . $oldName;
        $fullNewPath = FCPATH . '3rdparty/' . $folder . '/' . $newName;

        if (file_exists($fullOldPath)) {
            rename($fullOldPath, $fullNewPath);
            $this->output->set_content_type('application/json')
                ->set_output(json_encode(['status' => 'success', 'message' => 'Renamed successfully']));
        } else {
            $this->output->set_content_type('application/json')
                ->set_output(json_encode(['status' => 'error', 'message' => 'File/Directory not found']));
        }
    }
}
