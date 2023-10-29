import { useParams } from "react-router-dom";
import axios from "axios"
import { useState, useEffect } from "react";

const Note = () => {
    const myParams = useParams();
    const [noteDesArr, setNoteDesArr] = useState([]);
  
    useEffect(() => {
      axios.get(`http://localhost:8000/get_note/${myParams.note_title}`)
        .then((response) => {
          setNoteDesArr(response.data);
        })
        .catch((error) => {
          console.log(`error is ${error}`);
        });
    }, [myParams.note_title]);  //the effect will re-run if the note title changes. 

    const noteDescription = noteDesArr.map( (noteObj)=>{
        return(
            <div id="note-description-div">
                <p>{noteObj.note_description}</p>
                <p>{noteObj.code_snippet}</p>
            </div>
        )
    })


    return(
        <div id="note-div">
            <h1> Notes on "{myParams.note_title}" </h1>

            <div id="note-content-div">
                {noteDescription}
            </div>
        </div>
    )
}

export default Note;