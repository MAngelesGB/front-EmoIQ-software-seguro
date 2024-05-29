import { useParams, useNavigate, Navigate } from 'react-router-dom';
import TextEditor from '../../partials/TextEditor';
import { useEffect, useState } from 'react';
import { findLecture } from '../../../lib/manageLectures';

function ContentManagementEdit({openModal}) {
  const [lecture, setLecture] = useState(null);
  const { categoryId, lectureId } = useParams();
  const navigate = useNavigate();

  const validCategories = [
    'conciencia-emocional',
    'regulacion-emocional',
    'autonomia-emocional',
    'competencia-social',
    'competencia-bienestar'
  ];

  if (!validCategories.includes(categoryId)) {
    return <Navigate to="/404" />
  }

  useEffect(() => {
    const getLecture = async () => {
      const result = await findLecture(categoryId, lectureId);
      if (!result) navigate('/404');
      setLecture(result);
    }

    try {
      getLecture();
    } catch (err) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1>Error buscando la lectura</h1>
        </div>
      );
    }
  }, []);

  return (
    <TextEditor lecture={lecture} openModal={openModal}/>
  )
}

export default ContentManagementEdit;
