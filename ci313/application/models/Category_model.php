<?php
# codeigniter 3 Category model
class category_model extends CI_Model {
    public function get_questions($categoryId) {
        $this->load->database();
        $questions = $this->db->query("SELECT * FROM questions WHERE FIND_IN_SET(?, categoryIds) ORDER BY ordering asc", [$categoryId])
        ->result_array();
        $questionIds = array_map(function($question) {
            return $question['id'];
        }, $questions);
        $answers = $this->db->where_in('question_id', $questionIds)
            ->get('answers_question_tn')->result_array();
        foreach($questions as &$question) {
            $question['answers'] = array();
            foreach($answers as $answer) {
                if ($answer['question_id'] == $question['id']) {
                    $question['answers'][] = $answer;
                }
            }
        }
        return $questions;
    }
}