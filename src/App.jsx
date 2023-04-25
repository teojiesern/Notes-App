import React from "react"
import Content  from "./components/Content"
import Sidebar from "./components/SideBar"
import Split from "react-split"

export default function App() {
  const [notes, setNotes] = React.useState([])
  const [currentId, setCurrentId] = React.useState(0)

  function createNote(){
    const newNote = {
      id: notes.length+1,
      body:"Welcome to new notes..."
    }
    changeCurrentId(newNote.id)
    setNotes(prevNotes => {
      return ([newNote, ...prevNotes])
    })
  }

  function changeCurrentId(newId){
    setCurrentId(newId)
  }

  return (
    <div>
      <Split 
        className="wrap"
        sizes={[25, 75]}
        gutterSize={20}
        gutterAlign="center"
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <Sidebar 
          notes={notes}
          createNote={createNote}
          currentId={currentId}/>
        <Content />
      </Split>
    </div>
  )
}