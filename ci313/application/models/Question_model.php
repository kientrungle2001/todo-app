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

    public function update_answers($questionId, $question) {
        $this->load->database();
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
}