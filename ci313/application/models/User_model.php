<?php
# codeigniter 3 User model
class user_model extends CI_Model {
    public function get_by_username($username) {
        $this->load->database();
        $this->db->where('username', $username);
        return $this->db->get('user')->row();
    }
}
