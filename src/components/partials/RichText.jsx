import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

export default function RichText() {
  const [text, setText] = useState('')
  return (
    <>
      <CKEditor editor={ClassicEditor} data={text} onChange={(event, editor)=>{
        const data = editor.getData();
        setText(data);
      }}/>
      <div>
        {parse(text)}
      </div>
    </>
  )
}
