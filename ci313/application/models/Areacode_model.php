<?php
class Areacode_Model extends CI_Model
{
    public function get_by_id($areacode) {
        
        $this->db->where('id', $areacode);
        return $this->db->get('areacode')->row();
    }
}
