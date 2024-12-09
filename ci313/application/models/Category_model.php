<?php
# codeigniter 3 Category model
class Category_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('array');
    }
    public function get_questions($categoryId)
    {
        $this->load->database();
        $questions = $this->db->query("SELECT * FROM questions WHERE FIND_IN_SET(?, categoryIds) ORDER BY ordering asc", [$categoryId])
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

    public function get_tests($categoryId)
    {
        $this->load->database();
        $tests = $this->db->query("SELECT * FROM tests WHERE FIND_IN_SET(?, categoryIds) ORDER BY ordering asc", [$categoryId])
            ->result_array();
        return casting_numeric_fields($tests);
    }

    public function get_courses($categoryId)
    {
        $this->load->database();
        $courses = $this->db->query("SELECT * FROM courses WHERE categoryId = ? ORDER BY ordering asc", [$categoryId])
            ->result_array();
        return casting_numeric_fields($courses);
    }

    public function get_courses_by_alias($categoryAlias)
    {
        $this->load->database();
        /**
         * @var CI_DB
         */
        $db = $this->db;
        $category = $db->query("SELECT * FROM categories WHERE alias = ? ORDER BY ordering asc", [$categoryAlias])
            ->row_array();
        if (!$category) return [];
        $courses = $db->query("SELECT * FROM courses WHERE categoryId = ? ORDER BY ordering asc", [$category['id']])
            ->result_array();
        return casting_numeric_fields($courses);
    }
}
