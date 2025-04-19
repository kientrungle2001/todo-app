<?php
// application/controllers/Cron.php
class Cron extends CI_Controller
{
    /**
     * @var CI_DB
     */
    public $db;

    public function runJob()
    {
        // your logic
        
        $this->updateColumn(array(
            'class_student' => 'cs',
            'student' => 's'
        ), array(
            'cs.studentName' => 's.name'
        ), array(
            'cs.studentId' => 's.id'
        ));

        $this->updateColumn(array(
            'class_student' => 'cs',
            'classes' => 'c'
        ), array(
            'cs.className' => 'c.name',
            'cs.subjectId' => 'c.subjectId',
            'cs.teacherId' => 'c.teacherId',
            'cs.roomId' => 'c.roomId'
        ), array(
            'cs.classId' => 'c.id'
        ));
        $this->updateColumn(array(
            'class_student' => 'cs',
            'subject' => 's'
        ), array(
            'cs.subjectName' => 's.name'
        ), array(
            'cs.subjectId' => 's.id'
        ));
        $this->updateColumn(array(
            'class_student' => 'cs',
            'teacher' => 't'
        ), array(
            'cs.teacherName' => 't.name'
        ), array(
            'cs.teacherId' => 't.id'
        ));
        $this->updateColumn(array(
            'class_student' => 'cs',
            'teacher' => 't'
        ), array(
            'cs.teacher2Name' => 't.name'
        ), array(
            'cs.teacher2Id' => 't.id'
        ));
        $this->updateColumn(array(
            'class_student' => 'cs',
            'room' => 'r'
        ), array(
            'cs.roomName' => 'r.name',
            'cs.centerId' => 'r.centerId'
        ), array(
            'cs.roomId' => 'r.id'
        ));
        $this->updateColumn(array(
            'class_student' => 'cs',
            'center' => 'c'
        ), array(
            'cs.centerName' => 'c.name'
        ), array(
            'cs.centerId' => 'c.id'
        ));
        $this->updateColumn(array(
            'classes' => 'cs',
            'room' => 'r'
        ), array(
            'cs.centerId' => 'r.centerId'
        ), array(
            'cs.roomId' => 'r.id'
        ));

        if ($errors = $this->db->error()) {
            echo json_encode($errors);
        } else {
            echo "Running cron job safely...\n";
        }
    }

    public function updateColumn($tables, $set, $where)
    {
        $tablesArr = array();
        foreach ($tables as $table => $alias) {
            $tablesArr[] = '`' . $table . '` ' . '`' . $alias . '`';
        }
        $tablesStr = implode(', ', $tablesArr);
        $setArr = array();
        foreach ($set as $left => $right) {
            $setArr[] = $left . '=' . $right;
        }
        $setStr = implode(', ', $setArr);
        $whereArr = array();
        foreach ($where as $left => $right) {
            $whereArr[] = $left . '=' . $right;
        }
        $whereStr = implode(' AND ', $whereArr);
        $sql = 'update ' . $tablesStr . ' set ' . $setStr . ' where ' . $whereStr;
        $this->db->query($sql);
    }
}
