<?php
class Areacode extends CI_Controller
{
    /**
     * @var CI_Output
     */
    public $output;

    public function getProvinces()
    {
        
        $provinces = $this->db->where('status', 1)->where('type', 'province')->get('areacode')->result_array();
        $this->output->set_status_header(200)
            ->set_content_type('application/json', 'utf-8')
            ->set_output(json_encode($provinces));

    }
}