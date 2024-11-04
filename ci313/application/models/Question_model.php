<?php
# codeigniter 3 Question model
class question_model extends CI_Model {
    public function get_answers($questionId) {
        $this->load->database();
        $answers = $this->db->where('question_id', $questionId)
            ->get('answers_question_tn')
            ->result_array();
        return $answers;
    }
}