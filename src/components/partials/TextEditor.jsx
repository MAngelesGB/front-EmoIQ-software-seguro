import { useState, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import RichText from "./RichText";
import './TextEditor.css';
import { addLecture, addSuggestion } from '../../lib/manageLectures';
import { useAuth } from '../../contexts/AuthContext';

function validarDatos(data) {
  const errores = [];

  if (data.title.length >= 50) {
    errores.push("El título no debe tener más de 50 caracteres.");
  }

  if (data.body.length <= 100 || data.body.length >= 5000) {
    errores.push("El contenido debe tener entre 100 y 5000 caracteres.");
  }

  if (data.exercise.length >= 50) {
    errores.push("El nombre del ejercicio no debe tener más de 50 caracteres.");
  }

  return errores;
}

export default function TextEditor({ lecture, openModal, emotionalSkill }) {
  const [title, setTitle] = useState(lecture?.title || '');
  const [body, setBody] = useState(lecture?.body || '');
  const [comments, setComments] = useState('');
  const [exercise, setExercise] = useState(lecture?.exercise || '');
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    setTitle(lecture?.title || '');
    setBody(lecture?.body || '');
    setExercise(lecture?.exercise || '');
  }, [lecture]);

  const inputValidation = () => {
    const data = {
      title: title.trim(),
      body: body.trim(),
      comments: comments.trim(),
      exercise: exercise.trim(),
      modifiedBy: user.uid,
      lastModified: Timestamp.now()
    };

    if (title.trim() === "" || exercise.trim() === "" || body.trim() === "") {
      openModal("Los campos de título, ejercicio y contenido son obligatorios");
      return null;
    }

    const errors = validarDatos(data);

    if (errors.length > 0) {
      openModal(errors.join('\n'));
      return null;
    }

    return data;
  }

  const handleSuggest = async () => {
    const data = inputValidation();
    if (!data) return;

    try {
      await addSuggestion(data);
      setTitle('');
      setBody('');
      setExercise('');
      setComments('');

      openModal('La sugerencia fue añadida correctamente', 'Éxito');
    } catch (err) {
      openModal(err.message);
    }
  };

  const handleSave = async () => {
    const data = inputValidation();
    if (!data) return;

    try {
      await addLecture(categoryId, data);
      navigate('/manager/content/');
    } catch (err) {
      openModal(err.message);
    }
  };

  return (
    <>
      <div className="contentManagementEdit">
        <h1>{emotionalSkill}</h1>
        <div className="items-form-material">
          <div className="options">
            {
              lecture &&
              <button className="option-btn" onClick={handleSuggest}>
                <svg width="17" height="17" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21.5V17.25L16.2 4.075C16.4 3.89167 16.621 3.75 16.863 3.65C17.105 3.55 17.359 3.5 17.625 3.5C17.891 3.5 18.1493 3.55 18.4 3.65C18.6507 3.75 18.8673 3.9 19.05 4.1L20.425 5.5C20.625 5.68333 20.771 5.9 20.863 6.15C20.955 6.4 21.0007 6.65 21 6.9C21 7.16667 20.9543 7.421 20.863 7.663C20.7717 7.905 20.6257 8.12567 20.425 8.325L7.25 21.5H3ZM17.6 8.3L19 6.9L17.6 5.5L16.2 6.9L17.6 8.3Z" fill="#F6F6F6"/>
                </svg>
                <span>Sugerir</span>
              </button>
            }
            {
              !lecture &&
              <button className="option-guardar" onClick={handleSave}>
                <svg width="14" height="15" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3.923V14.885C16 15.345 15.846 15.7293 15.538 16.038C15.23 16.3467 14.8453 16.5007 14.384 16.5H1.616C1.15533 16.5 0.771 16.346 0.463 16.038C0.155 15.73 0.000666667 15.3453 0 14.884V2.116C0 1.65533 0.154333 1.271 0.463 0.963C0.771667 0.655 1.156 0.500667 1.616 0.5H12.577L16 3.923ZM7.996 13.038C8.55 13.038 9.02233 12.844 9.413 12.456C9.80367 12.068 9.99933 11.597 10 11.043C10.0007 10.489 9.80667 10.0163 9.418 9.625C9.02933 9.23367 8.55833 9.03833 8.005 9.039C7.45167 9.03967 6.97867 9.23333 6.586 9.62C6.19333 10.0067 5.998 10.4783 6 11.035C6.002 11.5917 6.196 12.0643 6.582 12.453C6.968 12.8417 7.43933 13.0373 7.996 13.04M2.769 6.27H10.192V3.27H2.77L2.769 6.27Z" fill="#F2F2F2"/>
                </svg>
                <span>Guardar</span>
              </button>
            }
            <button className="option-btn" onClick={() => navigate('/manager/content')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.4 17L12 13.4L15.6 17L17 15.6L13.4 12L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4L10.6 12L7 15.6L8.4 17ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22Z" fill="#F6F6F6"/>
              </svg>
              <span>Cancelar</span>
            </button>
          </div>
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="items">
              <div className="group-items">
                <div className="items-form">
                  <label>Titulo del material:</label>
                  <input type="text" id="tituloMaterial" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div  className="items-form">
                  <label className="lbl-area">Mensaje al administrador:</label>
                  <textarea id="mensajeAdministrador" onChange={e => setComments(e.target.value)} value={comments}></textarea>
                </div>
              </div>
              <div className="group-items">
                <div  className="items-form-vertical">
                  <label className="lbl-buscar">Ejercicio vinculado:</label>
                  <div className="buscar">
                    <input type="text" id="ejercicioVinculado" value={exercise} onChange={e => setExercise(e.target.value)}/>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z" fill="black" fillOpacity="0.5"/>
                    </svg>
                  </div>
                  
                </div>
                { false && <div className="items-form-vertical">
                  <label className="ejercicio-vinculado" id="etiquetaEjericicioVinculado">
                    Mindful Observación del Entorno
                    <button>
                      <svg width="15" height="15" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.6572 12.9052C13.7065 12.9546 13.7457 13.0132 13.7724 13.0776C13.7991 13.1421 13.8128 13.2113 13.8128 13.2811C13.8128 13.3509 13.7991 13.42 13.7724 13.4845C13.7457 13.549 13.7065 13.6076 13.6572 13.6569C13.6078 13.7063 13.5492 13.7454 13.4847 13.7721C13.4202 13.7989 13.3511 13.8126 13.2813 13.8126C13.2115 13.8126 13.1424 13.7989 13.0779 13.7721C13.0134 13.7454 12.9548 13.7063 12.9054 13.6569L8.50005 9.25086L4.09466 13.6569C3.99498 13.7566 3.85978 13.8126 3.7188 13.8126C3.57783 13.8126 3.44263 13.7566 3.34294 13.6569C3.24326 13.5572 3.18726 13.422 3.18726 13.2811C3.18726 13.1401 3.24326 13.0049 3.34294 12.9052L7.749 8.49981L3.34294 4.09442C3.24326 3.99473 3.18726 3.85953 3.18726 3.71856C3.18726 3.57758 3.24326 3.44238 3.34294 3.3427C3.44263 3.24301 3.57783 3.18701 3.7188 3.18701C3.85978 3.18701 3.99498 3.24301 4.09466 3.3427L8.50005 7.74875L12.9054 3.3427C13.0051 3.24301 13.1403 3.18701 13.2813 3.18701C13.4223 3.18701 13.5575 3.24301 13.6572 3.3427C13.7568 3.44238 13.8128 3.57758 13.8128 3.71856C13.8128 3.85953 13.7568 3.99473 13.6572 4.09442L9.25111 8.49981L13.6572 12.9052Z" fill="black"/>
                      </svg>
                    </button>
                  </label>
                </div>}
              </div>
            </div>
            <div className="contenido">
              <label>Contenido:</label>
              <RichText body={body} setBody={setBody}/>
            </div>
            
          </form>
        </div>
        
      </div>
    </>
  );
}
