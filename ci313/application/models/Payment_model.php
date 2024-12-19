<?php
# codeigniter 3 Payment model
class Payment_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('array');
    }
    public function get_payment_info($user, $route)
    {
        $this->load->database();
        $todayDate = date('Y-m-d H:i:s');
		return $this->db->query("SELECT * FROM history_payment WHERE username = ? and courseId = ? and software = ? and paymentDate <= ? and expiredDate >= ?", [$user->username, $route['course']->id, $route['course']->software, $todayDate, $todayDate])
            ->row_array();
	}
}
