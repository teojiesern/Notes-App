import React from "react"
import Content  from "./components/Content"
import Sidebar from "./components/SideBar"
import Split from "react-split"

export default function App() {
  const [notes, setNotes] = React.useState([])
  const [currentNote, setCurrentNote] = React.useState("")

  function createNote(){
    const newNote = {
      id: notes.length+1,
      body:"#Welcome to new notes..."
    }
    setCurrentNote(newNote)
    setNotes(prevNotes => {
      return ([newNote, ...prevNotes])
    })
  }

  function updateNote(text){
    setNotes(prevNotes => {
      return (prevNotes.map(note => {
        return note.id === currentNote.id ? {
          ...note,
          body: text
        }:note
      }))
    })
  }

  function findCurrentNote(){
    return notes.find(note => {
      return note.id === currentNote.id
    }) || ""
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
          currentNote={currentNote}/>
        <Content 
          currentNote={findCurrentNote()}
          updateNote={updateNote}
        />
      </Split>
    </div>
  )
}