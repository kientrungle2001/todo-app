<?php
# codeigniter 3 User model
class user_model extends CI_Model {
    public function get_by_username($username) {
        
        $this->db->where('username', $username);
        return $this->db->get('user')->row();
    }

    public function create($user) {
		$user['status'] = 1;
		$user['registered'] = date('Y-m-d H:i:s');
		$user['created'] = date('Y-m-d H:i:s');
		$this->db->insert('user', $user);
	}
}
