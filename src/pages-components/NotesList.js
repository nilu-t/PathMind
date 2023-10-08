import { useParams } from "react-router-dom";

const NotesList = () => {
    const myParams = useParams();

    return(
        
        <div id="notes-list-div">
            <h1>Notes List for {myParams.subject} </h1>
        </div>
    )
}

export default NotesList;