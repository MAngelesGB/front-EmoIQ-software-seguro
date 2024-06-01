import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './RichText.css';

export default function RichText({ body, setBody }) {
  return (
    <>
      <div className='rich-text'>
        <CKEditor editor={ClassicEditor} data={body} onChange={(event, editor)=>{
            const data = editor.getData();
            setBody(data);
          }}/>
      </div>
    </>
  )
}
