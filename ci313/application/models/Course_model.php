<?php
# codeigniter 3 Course model
class Course_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('array');
    }

    public function get_all()
    {
        $this->load->database();
        $courses = $this->db->query('select * from courses where status = 1 order by categoryId asc, ordering asc limit 10')->result_array();
        return casting_numeric_fields($courses);
    }
}