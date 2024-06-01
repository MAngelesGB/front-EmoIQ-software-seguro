import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ContentManagement.css";
import { getLectures } from '../../../lib/manageLectures';
import { truncateContent } from '../../../lib/truncateContent';
import { getUsernamesFromIds } from '../../../lib/manageUsers';

export default function ContentManagement() {
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [filteredLectures, setFilteredLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [emotionalSkill, setEmotionalSkill] = useState('regulacion-emocional');

  useEffect(() => {
    const fetchLectures = async () => {
      const result = await getLectures(emotionalSkill);
      const uids = result.filter(lecture => lecture.modifiedBy).map(lecture => lecture.modifiedBy);

      if (uids.length > 0) {
        const { names } = await getUsernamesFromIds({ uids });
        result.filter(lecture => lecture.modifiedBy).forEach((lecture, index) => lecture.modifiedBy = names[index]);
      }

      setLectures(result);
      setFilteredLectures(result);
    }

    fetchLectures();
  }, [emotionalSkill]);

  const filterLectures = (e) => {
    e.preventDefault();
    const term = searchTerm.trim().toLocaleLowerCase();

    setFilteredLectures(() => (
      lectures.filter(lecture => lecture.title.toLowerCase().includes(term))
    ));
  }

  const changeCategory = (category) => {
    setEmotionalSkill(category);
    setSearchTerm('');
  }

  const parseHtml = (html) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const plainText = tempElement.textContent || tempElement.innerText || '';
    return plainText;
  }

  return(
    <>
    <div className="contenido-material">
      <div className="group-contenido">
        <div className="layer">
          <div className="lecturas">
            <h2>Lecturas</h2>
          </div>
          <div className="ejercicios">
            <h2>Ejercicios</h2>
          </div>
        </div>

        <form className="buscar" onSubmit={filterLectures}>
          <label htmlFor="buscar">Buscar:</label>
          <input type="text" id="buscar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <button type="submit">BUSCAR</button>
        </form>

          {
            filteredLectures.length === 0 ? <h3 style={{textAlign: 'center'}}>No hay lecturas disponibles</h3> :
            filteredLectures.map(lecture => (
              <div className="items" key={lecture.id}>
                <div className="item-contenido">
                  <h3>Título</h3>
                  <p>{lecture.title}</p>
                </div>
                <div className="item-contenido">
                  <h3>Resumen</h3>
                  <p>{truncateContent(parseHtml(lecture.body), 30)}</p>
                </div>
                <div className="item-contenido-fecha">
                  <h3>Última modificación</h3>
                  <p>{String(lecture.lastModified)} { lecture.modifiedBy && 'hecha por ' + lecture.modifiedBy}</p>
                </div>
                <div className="btn-options">
                  <button className="btn-detalles" onClick={() => navigate(`/manager/content/${emotionalSkill}/${lecture.id}`)}>
                    <svg width="15" height="15" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.49159 6.55183C4.94992 5.14766 7.09742 3.8335 9.99992 3.8335C12.9024 3.8335 15.0499 5.14766 16.5083 6.55183C17.5298 7.54364 18.3754 8.70178 19.0091 9.97683C19.1699 10.3093 19.1699 10.691 19.0091 11.0227C18.3758 12.2979 17.5304 13.4564 16.5091 14.4485C15.0499 15.8527 12.9024 17.1668 9.99992 17.1668C7.09742 17.1668 4.94992 15.8527 3.49159 14.4485C2.47006 13.4567 1.62443 12.2985 0.990753 11.0235C0.911528 10.8606 0.870361 10.6818 0.870361 10.5006C0.870361 10.3194 0.911528 10.1406 0.990753 9.97766C1.62409 8.7024 2.47028 7.54398 3.49159 6.55183ZM9.99992 13.0002C10.663 13.0002 11.2988 12.7368 11.7677 12.2679C12.2365 11.7991 12.4999 11.1632 12.4999 10.5002C12.4999 9.83712 12.2365 9.20124 11.7677 8.7324C11.2988 8.26355 10.663 8.00016 9.99992 8.00016C9.33688 8.00016 8.70099 8.26355 8.23215 8.7324C7.76331 9.20124 7.49992 9.83712 7.49992 10.5002C7.49992 11.1632 7.76331 11.7991 8.23215 12.2679C8.70099 12.7368 9.33688 13.0002 9.99992 13.0002Z" fill="#FFEEEE"/>
                    </svg>
                    <span>Ver más</span>
                  </button>
                  <button className="btn-editar" onClick={() => navigate(`/manager/content/${emotionalSkill}/${lecture.id}/edit`)}>
                    <svg width="15" height="15" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 21.5V17.25L16.2 4.075C16.4 3.89167 16.621 3.75 16.863 3.65C17.105 3.55 17.359 3.5 17.625 3.5C17.891 3.5 18.1493 3.55 18.4 3.65C18.6507 3.75 18.8673 3.9 19.05 4.1L20.425 5.5C20.625 5.68333 20.771 5.9 20.863 6.15C20.955 6.4 21.0007 6.65 21 6.9C21 7.16667 20.9543 7.421 20.863 7.663C20.7717 7.905 20.6257 8.12567 20.425 8.325L7.25 21.5H3ZM17.6 8.3L19 6.9L17.6 5.5L16.2 6.9L17.6 8.3Z" fill="#F6F6F6"/>
                    </svg>
                    <span>Editar</span>
                  </button>
                </div>
              </div>
            ))
          }
      </div>
      <div className="ruta-aprendizaje">
        <div className="competencias">
          <h2>Competencias emocionales</h2>
          <label>Selecciona una para ver el contenido disponible</label>
        </div>
        <div className={"tema" + (emotionalSkill === 'conciencia-emocional' ? ' selected' : '')} onClick={() => changeCategory('conciencia-emocional')}>
          <div className="tema-contenido">
            <h3>Conciencia emocional</h3>
            <p>
              Conoce y es consciente de las emociones propias y ajenas.
            </p>
          </div>
            <img src="/images/conciencia-emocional.png"/>
        </div>
        <div className={"tema" + (emotionalSkill === 'regulacion-emocional' ? ' selected' : '')} onClick={() => changeCategory('regulacion-emocional')}>
          <div className="tema-contenido">
            <h3>Regulación emocional</h3>
            <p>
              Gestiona y ajusta tus emociones.
            </p>
          </div>
            <img src="/images/regulacion-emocional.png"/>
        </div>
        <div className={"tema" + (emotionalSkill === 'autonomia-emocional' ? ' selected' : '')} onClick={() => changeCategory('autonomia-emocional')}>
          <div className="tema-contenido">
            <h3>Autonomía emocional</h3>
            <p>
              Autogestiona emociones y pensamientos.
            </p>
          </div>
            <img src="/images/autonomia-emocional.png" />
        </div>
        <div className={"tema" + (emotionalSkill === 'competencia-social' ? ' selected' : '')} onClick={() => changeCategory('competencia-social')}>
          <div className="tema-contenido">
            <h3>Competencia social</h3>
            <p>
              Establece y mantiene relaciones interpersonales.
            </p>
          </div>
            <img src="/images/competencia-social.png"/>
        </div>
        <div className={"tema" + (emotionalSkill === 'competencia-bienestar' ? ' selected' : '')} onClick={() => changeCategory('competencia-bienestar')}>
          <div  className="tema-contenido">
            <h3>Competencia para la vida y el bienestar</h3>
            <p>
              Afronta retos de manera positiva y constructiva.
            </p>
          </div>
            <img src="/images/competencia-vida.png"/>
        </div>
        <div className="agregar-contenido" style={{ marginTop: '0.5rem' }}>
          <button onClick={() => navigate(`/manager/content/${emotionalSkill}/suggestion`)}>
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 10.5C19 5.80729 15.1927 2 10.5 2C5.80729 2 2 5.80729 2 10.5C2 15.1927 5.80729 19 10.5 19C15.1927 19 19 15.1927 19 10.5Z" stroke="#F2F2F2" strokeMiterlimit="10"/>
              <path d="M10.5 6.9585V14.0418" stroke="#F2F2F2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.0417 10.5H6.95834" stroke="#F2F2F2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Agregar contenido</span>
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
