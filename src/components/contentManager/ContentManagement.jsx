import { Link } from 'react-router-dom';

export default function ContentManagement() {
  const contentData = [];

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    if (words.length <= wordLimit) {
      return content;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    {/*Especifica las opciones para formatear la fecha*/}
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit' };
    {/*
    Formatea fechas y horas de acuerdo a las horas locales 
    Utiliza la configuración regional y las opciones del formateo
    */}
    return new Intl.DateTimeFormat('es-MX', options).format(date);
  };
  return (
    <>
      <div>
      {contentData.map((item, index) => (
        <div key={index} className="content-item">
          <h3>{item.title}</h3>
          <p>{truncateContent(item.content, 50)}</p>
          <small>
            {`${formatDate(item.creationDate)} hecha por ${item.author}`}
          </small>
          <Link to={`managementcontent/editar/${index}`} role="button">Editar</Link>
          <button>Ver más</button>
        </div>
      ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%' }}>
        <div>
          
          <div>
            <div>
              <p>Conciencia emocional</p>
              <p>
                Conoce y es consciente de las emociones propias y ajenas.
              </p>
            </div>
          </div>
          <div>
            <div>
              <p>Regulación emocional</p>
              <p>
                Gestiona y ajusta tus emociones.
              </p>
            </div>
          </div>
          <div>
            <div>
              <p>Autonomía emocional</p>
              <p>
                Autogestiona emociones y pensamientos.
              </p>
            </div>
          </div>
          <div>
            <div>
              <p>Competencia social</p>
              <p>
                Establece y mantiene relaciones interpersonales.
              </p>
            </div>
          </div>
          <div>
            <div>
              <p>Competencia para la vida y el bienestar</p>
              <p>
                Afronta retos de manera positiva y constructiva.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
