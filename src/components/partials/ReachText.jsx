import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import './ReachText.css';

export default function ReachText() {
  const [text, setText] = useState('')
  return (
    <> 
    <div className='reach-text'>
      <CKEditor editor={ClassicEditor} data={text} onChange={(event, editor)=>{
          const data = editor.getData();
          setText(data);
        }}/>
    </div> 
      
    </>
  )
}





