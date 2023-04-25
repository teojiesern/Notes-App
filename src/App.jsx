import React from "react"
import Content  from "./components/Content"
import Sidebar from "./components/SideBar"
import Split from "react-split"

let deleted = false
export default function App() {
  const [notes, setNotes] = React.useState(JSON.parse(localStorage.getItem("notes")) || [])
  const [currentNote, setCurrentNote] = React.useState(notes[0] || "")

  React.useEffect(() => {
    localStorage.setItem("notes",JSON.stringify(notes))
    if(deleted){
      setCurrentNote(notes[0])
      deleted = false
    }
  },[notes])

  function createNote(){
    const newNote = {
      id: notes.length+1,
      body:"#Welcome to new notes...#"
    }
    setCurrentNote(newNote)
    setNotes(prevNotes => {
      return ([newNote, ...prevNotes])
    })
  }

  function updateCurrentNote(id){
    let Note = currentNote
    for(let i=0; i<notes.length; i++){
      if(notes[i].id === id){
        Note = notes[i]
        break
      }  
    }
    setCurrentNote(Note)
  }

  function updateNote(text){
    setNotes(prevNotes => {
      let tempNote = []
      for(let i=0; i<prevNotes.length; i++){
        if(prevNotes[i].id === currentNote.id){
          tempNote.unshift({...prevNotes[i],body:text})
        }else{
          tempNote.push(prevNotes[i])
        }
      }
      return tempNote
    })
  }

  function findCurrentNote(){
    return notes.find(note => {
      return note.id === currentNote.id
    }) || ""
  }

  function deleteNote(id){
    setNotes(prevNotes => prevNotes.filter(note => note.id != id))
    deleted = true
  }

  return notes.length > 0?
   (<div>
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
          currentNote={currentNote}
          updateCurrentNote={updateCurrentNote}
          deleteNote={deleteNote}
          />
        <Content 
          currentNote={findCurrentNote()}
          updateNote={updateNote}
        />
      </Split>
    </div>
  ):
  (
    <div className="starting-screen">
      <div className="starting-container">
        <h1>You have no notes, create one now!!</h1>
        <button 
          className="create-button"
          onClick={createNote}
          >Create</button>
      </div>
    </div>
  )
}