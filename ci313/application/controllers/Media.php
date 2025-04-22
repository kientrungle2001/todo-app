<?php
class Media extends MY_Controller
{

    protected $source_dir = '3rdparty/Filemanager/source';
    protected $thumbs_dir = '3rdparty/Filemanager/thumbs';

    public function __construct()
    {
        parent::__construct();
        $this->authenticate();
    }

    public function list_images()
    {
        $path = $this->input->get('path', TRUE); // Get path from query params

        $fullPath = FCPATH . $this->source_dir . '/' . $path; // Assuming you store media in 'uploads' folder
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
        $this->json(['files' => $files, 'folders' => $folders]);
    }

    public function upload()
    {
        $config['upload_path'] = './' . $this->source_dir . '/' . $this->input->post('folder');
        $config['allowed_types'] = 'jpg|png|gif|jpeg|webp|mp4|doc|docx|pdf';
        $config['max_size'] = 204800; // 2MB max
        /**
         * @var CI_Upload $upload
         */
        $this->upload;
        $this->upload->initialize($config, FALSE);

        if (!$this->upload->do_upload('file')) {
            $this->json_exception($this->upload->display_errors());
        } else {
            $data = array('upload_data' => $this->upload->data());
            $ext = explode('.', $data['upload_data']['full_path']);
            $ext = array_pop($ext);
            if (in_array(strtolower($ext), array('jpg', 'png', 'gif', 'jpeg', 'webp')))
                $this->create_thumbs($data);
            $this->json($data);
        }
    }

    public function create_thumbs($data)
    {
        $width = 122;
        $height = 91;
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

        $fullPath = FCPATH . $this->source_dir . '/' . $folder . '/' . $name;

        if (!file_exists($fullPath)) {
            mkdir($fullPath, 0755, TRUE); // Create directory with 755 permissions
            $fullThumbsPath = FCPATH . $this->thumbs_dir . '/' . $folder . '/' . $name;
            mkdir($fullThumbsPath, 0755, TRUE); // Create directory with 755 permissions
            $this->json(['status' => 'success', 'message' => 'Directory created']);
        } else {
            $this->json_exception('Directory already exists');
        }
    }

    public function delete()
    {
        $path = $this->input->post('path', TRUE);
        $fullPath = FCPATH . $this->source_dir . '/' . $path;

        if (is_dir($fullPath)) {
            if (count(scandir($fullPath)) == 2) { // Empty directory
                rmdir($fullPath);
                $fullThumbsPath = FCPATH . $this->thumbs_dir . '/' . $path;
                rmdir($fullThumbsPath);
                $this->output->set_content_type('application/json')
                    ->set_output(json_encode(['status' => 'success', 'message' => 'Directory deleted']));
            } else {
                $this->output->set_content_type('application/json')
                    ->set_output(json_encode(['status' => 'error', 'message' => 'Directory not empty', 'fullPath' => $fullPath]));
            }
        } elseif (is_file($fullPath)) {
            unlink($fullPath);
            $fullThumbsPath = FCPATH . '3rdparty/thumbs/' . $path;
            try {
                @unlink($fullThumbsPath);
            } catch (Exception $e) {
            }

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

        $fullOldPath = FCPATH . $this->source_dir . '/' . $folder . '/' . $oldName;
        $fullNewPath = FCPATH . $this->source_dir . '/' . $folder . '/' . $newName;

        if (file_exists($fullOldPath)) {
            rename($fullOldPath, $fullNewPath);
            $fullOldThumbsPath = FCPATH . $this->thumbs_dir . '/' . $folder . '/' . $oldName;
            $fullNewThumbsPath = FCPATH . $this->thumbs_dir . '/' . $folder . '/' . $newName;
            rename($fullOldThumbsPath, $fullNewThumbsPath);
            $this->output->set_content_type('application/json')
                ->set_output(json_encode(['status' => 'success', 'message' => 'Renamed successfully']));
        } else {
            $this->output->set_content_type('application/json')
                ->set_output(json_encode(['status' => 'error', 'message' => 'File/Directory not found']));
        }
    }
}
