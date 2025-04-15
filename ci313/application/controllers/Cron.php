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
        $updateStudentSql = 'update 
                class_student cs, student s 
            set 
                cs.studentName = s.name 
            where cs.studentId = s.id';
        $this->db->query($updateStudentSql);
        $updateClassesSql = 'update 
                class_student cs, classes c 
            set cs.className = c.name, 
                cs.subjectId = c.subjectId, 
                cs.teacherId = c.teacherId, 
                cs.roomId = c.roomId 
            where cs.classId = c.id';
        $this->db->query($updateClassesSql);
        $updateSubjectSql = 'update 
                class_student cs, subject s 
            set 
                cs.subjectName = s.name 
            where cs.subjectId = s.id';
        $this->db->query($updateSubjectSql);
        $updateTeacherSql = 'update 
                class_student cs, teacher t 
            set 
                cs.teacherName = t.name 
            where cs.teacherId = t.id';
        $this->db->query($updateTeacherSql);
        $updateTeacher2Sql = 'update 
                class_student cs, teacher t 
            set 
                cs.teacher2Name = t.name 
            where cs.teacher2Id = t.id';
        $this->db->query($updateTeacher2Sql);
        $updateRoomSql = 'update 
                class_student cs, room r 
            set 
                cs.roomName = r.name,
                cs.centerId = r.centerId 
            where cs.roomId = r.id';
        $this->db->query($updateRoomSql);
        $updateCenterSql = 'update 
                class_student cs, center c 
            set 
                cs.centerName = c.name
            where cs.centerId = c.id';
        $this->db->query($updateCenterSql);
        $updateCenterSql = 'update 
                classes cs, room r 
            set 
                cs.centerId = r.centerId
            where cs.roomId = r.id';
        $this->db->query($updateCenterSql);
        
        if ($errors = $this->db->error()) {
            echo json_encode($errors);
        } else {
            echo "Running cron job safely...\n";
        }
    }
}
