import { useParams } from "react-router-dom";

const Note = () => {
    const myParams = useParams();

    return(
        <div id="note-div">
            <h1> Note on "{myParams.note_title}" </h1>

            <div id="note-content-div">
                
            </div>
        </div>
    )
}

export default Note;