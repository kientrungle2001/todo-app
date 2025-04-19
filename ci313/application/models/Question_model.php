<?php
# codeigniter 3 Question model
class question_model extends CI_Model {
    public function get_answers($questionId) {
        
        $answers = $this->db->where('question_id', $questionId)
            ->get('answers_question_tn')
            ->result_array();
        return $answers;
    }

    public function update_answers($questionId, $question) {
        
        $this->db->where('id', $questionId)->update('questions', array(
            'explaination' => $question['explaination']
        ));
        $answers = $question['answers'];
        $answerIds = array_map(function($answer) {
            return $answer['id'];
        }, $answers);
        $this->db->where_not_in('id', $answerIds)->where('question_id', $questionId)->delete('answers_question_tn');
        foreach($answers as $answer) {
            if (is_numeric($answer['id'])) {
                $this->db->where('id', $answer['id'])->update('answers_question_tn', array(
                    'content' => $answer['content'],
                    'content_vn' => $answer['content_vn']
                ));
            } else {
                unset($answer['id']);
                $answer['question_id'] = $questionId;
                $this->db->insert('answers_question_tn', $answer);
            }
        }
        return array('success' => true);
    }

    public function get_resource_questions($resourceId)
	{
		
		$questions = $this->db->query("SELECT * FROM questions WHERE courseResourceId = ? and status = 1 ORDER BY ordering asc", [$resourceId])
            ->result_array();
		$questionIds = array_map(function ($question) {
            return $question['id'];
        }, $questions);
        if (count($questionIds)) {
            $answers = $this->db->where_in('question_id', $questionIds)
                ->get('answers_question_tn')->result_array();
        } else {
            $answers = [];
        }

        foreach ($questions as &$question) {
            $question['answers'] = array();
            foreach ($answers as $answer) {
                if ($answer['question_id'] == $question['id']) {
                    $question['answers'][] = $answer;
                }
            }
        }
        return casting_numeric_fields($questions);
	}
}
