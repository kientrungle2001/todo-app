// components/class-management/ClassInformation.tsx
import React, { useState, useEffect } from 'react';
import axios from '@/api/axiosInstance';
import { formatVNDate } from '@/utils';

interface ClassInformationProps {
  classId: string | string[];
}

const ClassInformation: React.FC<ClassInformationProps> = ({ classId }) => {
  const [classInfo, setClassInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (classId) {
      const fetchClassInfo = async () => {
        try {
          const response = await axios.get(`/classes/${classId}`);
          setClassInfo(response.data);
        } catch (err) {
          setError('Failed to load class information.');
        } finally {
          setLoading(false);
        }
      };

      fetchClassInfo();
    }
  }, [classId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Class Information</h3>
      {classInfo ? (
        <div>
          <p><strong>Name:</strong> {classInfo.name}</p>
          <p><strong>Start Date:</strong> {formatVNDate(classInfo.startDate)}</p>
          <p><strong>End Date:</strong> {formatVNDate(classInfo.endDate)}</p>
          <p><strong>Room:</strong> {classInfo.roomName}</p>
          <p><strong>Subject:</strong> {classInfo.subjectName}</p>
          <p><strong>Teacher:</strong> {classInfo.teacherName}</p>
          <p><strong>Level:</strong> {classInfo.level}</p>
          <p><strong>Amount:</strong> {classInfo.amount}</p>
          <p><strong>Amount By:</strong> {classInfo.amountBy}</p>
          <p><strong>Status:</strong> {classInfo.status === 1 ? 'Active' : 'Inactive'}</p>
          <p><strong>Secondary Teacher:</strong> {classInfo.teacher2Name}</p>
          <p><strong>Online:</strong> {classInfo.online ? 'Yes' : 'No'}</p>
          <p><strong>Classed:</strong> {classInfo.classed}</p>
          <p><strong>Code:</strong> {classInfo.code}</p>
          <p><strong>Fee Type:</strong> {classInfo.feeType}</p>
          <p><strong>Schedule Days:</strong> {classInfo.scheduleDays}</p>
        </div>
      ) : (
        <p>No class information available.</p>
      )}
    </div>
  );
};

export default ClassInformation;
