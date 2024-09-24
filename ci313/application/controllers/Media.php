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

    public function list_images()
    {
        $path = $this->input->get('path', TRUE); // Get path from query params
        $this->load->helper('directory');

        $fullPath = FCPATH . 'uploads/' . $path; // Assuming you store media in 'uploads' folder
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
        $config['upload_path'] = './uploads/' . $this->input->post('folder');
        $config['allowed_types'] = 'jpg|png|gif|jpeg|webp';
        $config['max_size'] = 2048; // 2MB max

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('file')) {
            $error = array('error' => $this->upload->display_errors());
            $this->output->set_content_type('application/json')
                ->set_output(json_encode($error));
        } else {
            $data = array('upload_data' => $this->upload->data());
            $this->output->set_content_type('application/json')
                ->set_output(json_encode($data));
        }
    }

    public function create_directory()
    {
        $folder = $this->input->post('folder', TRUE);
        $name = $this->input->post('name', TRUE);

        $fullPath = FCPATH . 'uploads/' . $folder . '/' . $name;

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
        $fullPath = FCPATH . 'uploads/' . $path;

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

        $fullOldPath = FCPATH . 'uploads/' . $folder . '/' . $oldName;
        $fullNewPath = FCPATH . 'uploads/' . $folder . '/' . $newName;

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
