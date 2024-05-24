import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import './RichText.css';

export default function RichText() {
  const [text, setText] = useState('')
  return (
    <>
      <div className='rich-text'>
        <CKEditor editor={ClassicEditor} data={text} onChange={(event, editor)=>{
            const data = editor.getData();
            setText(data);
          }}/>
      </div>
    </>
  )
}
