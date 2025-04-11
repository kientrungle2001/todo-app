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
        $this->load->database();
        $updateStudentSql = 'update class_student cs, student s set cs.studentName = s.name where cs.studentId = s.id';
        $this->db->query($updateStudentSql);
        $updateClassesSql = 'update class_student cs, classes c set cs.className = c.name, cs.subjectId = c.subjectId, cs.teacherId = c.teacherId, cs.roomId = c.roomId where cs.classId = c.id';
        $this->db->query($updateClassesSql);
        if ($errors = $this->db->error()) {
            echo json_encode($errors);
        } else {
            echo "Running cron job safely...\n";
        }
        
    }
}
