import { useParams, useNavigate, Navigate } from 'react-router-dom';
import TextEditor from '../../partials/TextEditor';
import { useEffect, useState } from 'react';
import { findLecture } from '../../../lib/manageLectures';

function ContentManagementEdit({openModal}) {
  const [lecture, setLecture] = useState(null);
  const { categoryId, lectureId } = useParams();
  const navigate = useNavigate();

  const validCategories = {
    'conciencia-emocional': 'Conciencia emocional',
    'regulacion-emocional': 'Regulación emocional',
    'autonomia-emocional': 'Autonomía emocional',
    'competencia-social': 'Competencia social',
    'competencia-bienestar': 'Competencia para la vida y el bienestar'
  };

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

  if (!validCategories[categoryId]) {
    return <Navigate to="/404" />
  }

  return (
    <TextEditor lecture={lecture} openModal={openModal} emotionalSkill={validCategories[categoryId]}/>
  )
}

export default ContentManagementEdit;
