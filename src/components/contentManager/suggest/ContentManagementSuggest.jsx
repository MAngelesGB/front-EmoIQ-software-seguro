import { Navigate, useParams } from 'react-router-dom';
import TextEditor from '../../partials/TextEditor';

function ContentManagementSuggest({ openModal }) {
  const { categoryId } = useParams();
  const validCategories = {
    'conciencia-emocional': 'Conciencia emocional',
    'regulacion-emocional': 'Regulación emocional',
    'autonomia-emocional': 'Autonomía emocional',
    'competencia-social': 'Competencia social',
    'competencia-bienestar': 'Competencia para la vida y el bienestar',
  };

  if (!validCategories[categoryId]) {
    return <Navigate to="/404" />;
  }

  return (
    <TextEditor
      openModal={openModal}
      emotionalSkill={validCategories[categoryId]}
    />
  );
}

export default ContentManagementSuggest;
