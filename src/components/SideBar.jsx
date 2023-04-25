import React from "react"
import { FaTrash } from "react-icons/fa";
export default function Sidebar(props){
    const noteElements = props.notes.map(note => {
        let title = note.body.split("#")[1]
        return (
        <div 
            key={note.id} 
            className={note.id === props.currentNote.id ? "selected-note" : "non-selected-note"}
            onClick={() => props.updateCurrentNote(note.id)}
            >
            <p className="display-text">{title}</p>
            <p 
                className="trash"
                onClick={() => props.deleteNote(note.id)}
            ><FaTrash /></p>
        </div>
    )})
    return(
        <div className="sidebar">
            <div className="sidebar-title">
                <h1>Notes</h1>
                <button onClick={props.createNote}>+</button>
            </div>
            <div>
                {noteElements}
            </div>
        </div>
    )
}