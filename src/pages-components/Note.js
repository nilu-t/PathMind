import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import firebase from 'firebase/compat/app'; // for backward compatibility
import 'firebase/compat/auth'; // for backward compatibility
import CodeEditor from "../code-editor-components/CodeEditor";

const Note = () => {
    const { note_title, id } = useParams();
    const [noteDetails, setNoteDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const user = firebase.auth().currentUser;
    const codeEditorRef = useRef(null);


    useEffect(() => {

        const fetchData = async() =>{
            try{
                const response = await axios.get(`http://localhost:8000/get_note/${note_title}?email=${user.email}`);
                
                setNoteDetails(response.data[0]);
                setIsLoading(false);
            }
    
            catch(err){
                console.error(err);
                setIsLoading(false);
            }    
        };

        fetchData();

    }, [note_title]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!noteDetails || Object.keys(noteDetails).length <= 0) {
        return <div>Note not found</div>;
    }

    return (
        <div id="note-div">
            <h1> Notes on: {note_title} </h1>
            <div id="note-description-div">
                <p>{noteDetails.note_description}</p>
                <CodeEditor 
                    codingLanguage={noteDetails.note_subject} 
                    defaultContent={noteDetails.code_snippet} 
                    ref={codeEditorRef}
                />
                {/* <p>{noteDetails.code_snippet}</p> */}
            </div>
        </div>
    );
};

export default Note;
