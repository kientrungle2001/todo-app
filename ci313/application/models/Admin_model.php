<?php
# codeigniter 3 Admin model
class admin_model extends CI_Model {
    public function get_by_username($username) {
        $this->load->database();
        $this->db->where('name', $username);
        return $this->db->get('admin')->row();
    }
}