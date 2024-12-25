<?php
class Media extends CI_Controller
{
    public function thumbnail()
    {
        $arguments = func_get_args();
        $ext = array_pop($arguments);
        $y = array_pop($arguments);
        $x = array_pop($arguments);
        $fileName = implode('/', $arguments);
        $sourceFile = FCPATH . '3rdparty/Filemanager/source/' . $fileName . '.' . $ext;
        $destDir = FCPATH . '3rdparty/Filemanager/thumbnails/';
        $destFile = $destDir . $fileName . '-' . $x . 'x' . $y . '.' . $ext;

        // Ensure the destination directory (including subfolders) exists
        $fullDestDir = $destDir . dirname($fileName);  // Get the directory part of the file path

        if (!is_dir($fullDestDir)) {
            mkdir($fullDestDir, 0755, true);  // Create directories recursively
        }

        $this->load->library('image_lib');
        $config['image_library']  = 'gd2';
        $config['source_image']   = $sourceFile;
        $config['create_thumb']   = false;
        $config['maintain_ratio'] = false;
        $config['width']          = $x;
        $config['height']         = $y;
        $config['new_image']      = $destFile;
        $config['master_dim']     = 'auto'; // Let the library decide which dimension to use for cropping (auto is usually fine)
        $config['x_axis']         = 0;      // Start cropping at the x-axis (left)
        $config['y_axis']         = 0;      // Start cropping at the y-axis (top)

        $this->image_lib->initialize($config);
        if (!$this->image_lib->resize()) {
            echo $this->image_lib->display_errors();
        } else {
            header('Content-Type: ' . mime_content_type($destFile));
            readfile($destFile);  // Output the image content
        }
    }
}
