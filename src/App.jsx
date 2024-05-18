import { useState } from 'react'
import ContentManagementEdit from './components/contentManager/ContentManagementEdit'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ContentManagementEdit/>

    </>
  )
}

export default App
