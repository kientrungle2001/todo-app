<?php
# codeigniter 3 Payment model
class Payment_model extends MY_Model
{
    public function get_payment_info($user, $route)
    {
        
        $todayDate = date('Y-m-d H:i:s');
		return $this->db->query("SELECT * FROM history_payment WHERE username = ? and courseId = ? and software = ? and paymentDate <= ? and expiredDate >= ?", [$user->username, $route['course']->id, $route['course']->software, $todayDate, $todayDate])
            ->row_array();
	}
}
