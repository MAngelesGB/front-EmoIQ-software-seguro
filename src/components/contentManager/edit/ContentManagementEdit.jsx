import { useParams } from 'react-router-dom';
import TextEditor from '../../partials/TextEditor';
import { useEffect, useState } from 'react';
import { findLecture } from '../../../lib/manageLectures';

function ContentManagementEdit() {
  const [lecture, setLecture] = useState(null);
  const { categoryId, lectureId } = useParams();
  console.log(categoryId, lectureId);

  useEffect(() => {
    const getLecture = async () => {
      const result = await findLecture(categoryId, lectureId);
      setLecture(result)
    }

    getLecture();
  }, []);

  return (
    <TextEditor lecture={lecture}/>
  )
}

export default ContentManagementEdit
