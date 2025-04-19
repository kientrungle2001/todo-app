<?php
# codeigniter 3 Test model
class test_model extends CI_Model {
    public function get_questions($testId) {
        
        $questions = $this->db->query("SELECT * FROM questions WHERE FIND_IN_SET(?, testId) ORDER BY ordering asc", [$testId])
        ->result_array();
        $questionIds = array_map(function($question) {
            return $question['id'];
        }, $questions);
		if (count($questionIds)) {
			$answers = $this->db->where_in('question_id', $questionIds)
				->get('answers_question_tn')->result_array();
		} else {
			$answers = array();
		}

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
