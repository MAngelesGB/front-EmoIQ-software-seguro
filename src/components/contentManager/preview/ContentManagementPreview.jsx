import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { findLecture } from '../../../lib/manageLectures';
import { getUsernamesFromIds } from '../../../lib/manageUsers';
import DOMPurify from 'dompurify';

const sanitizeHtml = html => {
  return DOMPurify.sanitize(html);
};

function ContentManagementPreview() {
  const [lecture, setLecture] = useState(null);
  const { categoryId, lectureId } = useParams();
  const navigate = useNavigate();

  const validCategories = {
    'conciencia-emocional': 'Conciencia emocional',
    'regulacion-emocional': 'Regulación emocional',
    'autonomia-emocional': 'Autonomía emocional',
    'competencia-social': 'Competencia social',
    'competencia-bienestar': 'Competencia para la vida y el bienestar',
  };

  useEffect(() => {
    const getLecture = async () => {
      const result = await findLecture(categoryId, lectureId);
      if (!result) navigate('/404');

      const uid = result.modifiedBy;
      if (uid) {
        const { names } = await getUsernamesFromIds({ uids: [uid] });
        result.modifiedBy = names[0];
      }

      setLecture(result);
    };

    try {
      getLecture();
    } catch (err) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>Error buscando la lectura</h1>
        </div>
      );
    }
  }, []);

  if (!validCategories[categoryId]) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      {lecture && (
        <div className="contentManagementEdit">
          <h1>{validCategories[categoryId]}</h1>
          <div
            className="items-form-material"
            style={{ padding: '0 1rem', width: '80%' }}
          >
            <div className="options">
              <button
                className="option-btn"
                onClick={() => navigate('/manager/content')}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 256 256"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M216 40H40C35.7565 40 31.6869 41.6857 28.6863 44.6863C25.6857 47.6869 24 51.7565 24 56V200C24 204.243 25.6857 208.313 28.6863 211.314C31.6869 214.314 35.7565 216 40 216H216C220.243 216 224.313 214.314 227.314 211.314C230.314 208.313 232 204.243 232 200V56C232 51.7565 230.314 47.6869 227.314 44.6863C224.313 41.6857 220.243 40 216 40ZM184 136C184 138.122 183.157 140.157 181.657 141.657C180.157 143.157 178.122 144 176 144H99.31L109.66 154.34C110.403 155.083 110.993 155.966 111.395 156.937C111.797 157.908 112.004 158.949 112.004 160C112.004 161.051 111.797 162.092 111.395 163.063C110.993 164.034 110.403 164.917 109.66 165.66C108.917 166.403 108.034 166.993 107.063 167.395C106.092 167.797 105.051 168.004 104 168.004C102.949 168.004 101.908 167.797 100.937 167.395C99.9657 166.993 99.0833 166.403 98.34 165.66L74.34 141.66C73.5962 140.917 73.0061 140.035 72.6035 139.064C72.2009 138.092 71.9937 137.051 71.9937 136C71.9937 134.949 72.2009 133.908 72.6035 132.936C73.0061 131.965 73.5962 131.083 74.34 130.34L98.34 106.34C99.8411 104.839 101.877 103.996 104 103.996C106.123 103.996 108.159 104.839 109.66 106.34C111.161 107.841 112.004 109.877 112.004 112C112.004 114.123 111.161 116.159 109.66 117.66L99.31 128H168V104C168 101.878 168.843 99.8434 170.343 98.3431C171.843 96.8429 173.878 96 176 96C178.122 96 180.157 96.8429 181.657 98.3431C183.157 99.8434 184 101.878 184 104V136Z"
                    fill="#F6F6F6"
                  />
                </svg>
                <span>Regresar</span>
              </button>
            </div>
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <div
                className="items"
                style={{
                  justifyContent: 'space-between',
                  margin: '1rem 0',
                  width: '100%',
                  gap: '0.5rem',
                }}
              >
                <div className="group-items" style={{ flex: 1 }}>
                  <div
                    className="items-form"
                    style={{
                      flexDirection: 'column',
                      textAlign: 'left',
                      margin: 0,
                      alignItems: 'flex-start',
                    }}
                  >
                    <label style={{ fontSize: '1.5rem' }}>
                      Titulo del material
                    </label>
                    {lecture.title}
                  </div>
                </div>
                <div className="group-items" style={{ flex: 1 }}>
                  <div className="items-form-vertical" style={{ margin: 0 }}>
                    <label
                      className="lbl-buscar"
                      style={{ margin: 0, fontSize: '1.5rem' }}
                    >
                      Ejercicio vinculado
                    </label>
                    {lecture.exercise || 'Ninguno'}
                  </div>
                  {false && (
                    <div className="items-form-vertical">
                      <label
                        className="ejercicio-vinculado"
                        id="etiquetaEjericicioVinculado"
                      >
                        Mindful Observación del Entorno
                        <button>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.6572 12.9052C13.7065 12.9546 13.7457 13.0132 13.7724 13.0776C13.7991 13.1421 13.8128 13.2113 13.8128 13.2811C13.8128 13.3509 13.7991 13.42 13.7724 13.4845C13.7457 13.549 13.7065 13.6076 13.6572 13.6569C13.6078 13.7063 13.5492 13.7454 13.4847 13.7721C13.4202 13.7989 13.3511 13.8126 13.2813 13.8126C13.2115 13.8126 13.1424 13.7989 13.0779 13.7721C13.0134 13.7454 12.9548 13.7063 12.9054 13.6569L8.50005 9.25086L4.09466 13.6569C3.99498 13.7566 3.85978 13.8126 3.7188 13.8126C3.57783 13.8126 3.44263 13.7566 3.34294 13.6569C3.24326 13.5572 3.18726 13.422 3.18726 13.2811C3.18726 13.1401 3.24326 13.0049 3.34294 12.9052L7.749 8.49981L3.34294 4.09442C3.24326 3.99473 3.18726 3.85953 3.18726 3.71856C3.18726 3.57758 3.24326 3.44238 3.34294 3.3427C3.44263 3.24301 3.57783 3.18701 3.7188 3.18701C3.85978 3.18701 3.99498 3.24301 4.09466 3.3427L8.50005 7.74875L12.9054 3.3427C13.0051 3.24301 13.1403 3.18701 13.2813 3.18701C13.4223 3.18701 13.5575 3.24301 13.6572 3.3427C13.7568 3.44238 13.8128 3.57758 13.8128 3.71856C13.8128 3.85953 13.7568 3.99473 13.6572 4.09442L9.25111 8.49981L13.6572 12.9052Z"
                              fill="black"
                            />
                          </svg>
                        </button>
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label
                  style={{
                    fontSize: '1.5rem',
                    fontFamily: 'gg-sans-semibold',
                    display: 'block',
                  }}
                >
                  Última modificación
                </label>
                {String(lecture.lastModified)}{' '}
                {lecture.modifiedBy && 'hecha por ' + lecture.modifiedBy}
              </div>
              <div className="contenido" style={{ padding: 0 }}>
                <label style={{ fontSize: '1.5rem' }}>Contenido:</label>
                <p
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(lecture.body),
                  }}
                ></p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ContentManagementPreview;
