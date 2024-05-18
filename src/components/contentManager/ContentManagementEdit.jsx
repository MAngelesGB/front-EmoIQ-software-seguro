import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ContentManagementEdit() {
  //const [value, setValue] = useState('');
  return (
    <>
      <div>
        <button>Sugerir</button>
        <button>Guardar</button>
        <button>Cancelar</button>
      </div>
      <form>
        <div>
          <label for="tituloMaterial">Titulo del material</label>
          <input type="text" id="tituloMaterial" />
          <label for="mensajeAdministrador">Mensaje al administrador</label>
          <textarea id="mensajeAdministrador"></textarea>
          <label for="ejercicioVinculado">Ejercicio vinculado</label>
          <input type="text" id="ejercicioVinculado" />
          <label id="etiquetaEjericicioVinculado"></label>
        </div>
        <ReactQuill theme="snow" />
      </form>
    </>
  );
}
