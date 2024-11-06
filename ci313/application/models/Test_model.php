<?php
# codeigniter 3 Test model
class test_model extends CI_Model {
    public function get_questions($testId) {
        $this->load->database();
        $questions = $this->db->query("SELECT * FROM questions WHERE FIND_IN_SET(?, testId) ORDER BY ordering asc", [$testId])
        ->result_array();
        return $questions;
    }
}