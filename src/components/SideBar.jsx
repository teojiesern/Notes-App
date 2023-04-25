import React from "react"

export default function Sidebar(props){
    const [newNoteAdded, setNewNoteAdded] = useState(false);
    const noteElements = props.notes.map(note => (
        <div key={note.id} className={note.id === props.currentId ? "selected-note" : "non-selected-note"}>
            {note.body}
        </div>
    ))
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