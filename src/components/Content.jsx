import React from "react"
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });
export default function Content({currentNote, updateNote}){     
    const [selectedTab, setSelectedTab] = React.useState("write")
    return (
        <div className="container">
        <ReactMde
            value={currentNote.body}
            onChange={updateNote}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
            }
            minEditorHeight={681}
            maxEditorHeight={681}
        />
        </div>
    );
}
