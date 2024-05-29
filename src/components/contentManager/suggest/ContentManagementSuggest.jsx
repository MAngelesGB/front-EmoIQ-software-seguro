import { Navigate, useParams } from 'react-router-dom';
import TextEditor from '../../partials/TextEditor';

function ContentManagementSuggest({openModal}) {
  const { categoryId } = useParams();
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

  return (
    <TextEditor openModal={openModal} />
  )
}

export default ContentManagementSuggest;
