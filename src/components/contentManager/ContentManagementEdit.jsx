import ReachText from "../partials/RichText";
import './ContentManagementEdit.css';
export default function ContentManagementEdit() {
  return (
    <>
      <div className="contentManagementEdit">
        <div>
          <button>Sugerir</button>
          <button>Guardar</button>
          <button>Cancelar</button>
        </div>
        <form>
          <div>
            <div>
              <label>Titulo del material</label>
              <input type="text" id="tituloMaterial" />
            </div>
            <div>
              <label>Mensaje al administrador</label>
              <textarea id="mensajeAdministrador"></textarea>
            </div>
            <div>
              <label>Ejercicio vinculado</label>
              <input type="text" id="ejercicioVinculado" />
            </div>
            <div>
              <label id="etiquetaEjericicioVinculado"></label>
            </div>
            <ReachText />
          </div>
        </form>
      </div>
    </>
  );
}
