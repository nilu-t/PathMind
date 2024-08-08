import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import firebase from 'firebase/compat/app'; // for backward compatibility
import 'firebase/compat/auth'; // for backward compatibility

const Note = () => {
    const { note_title, id } = useParams();
    const [noteDescription, setNoteDescription] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const user = firebase.auth().currentUser;

    useEffect(() => {
        axios.get(`http://localhost:8000/get_note/${note_title}?email=${user.email}`)
            .then((response) => {
                setNoteDescription(response.data[0]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(`error is ${error}`);
                setIsLoading(false);
            });
    }, [note_title]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!noteDescription) {
        return <div>Note not found</div>;
    }

    const handleDeleteNoteButton = async() =>{
        
    }

    return (
        <div id="note-div">
            <h1> Notes on: {note_title} </h1>
            <div id="note-description-div">
                <p>{noteDescription.note_description}</p>
                <p>{noteDescription.code_snippet}</p>
            </div>
        </div>
    );
};

export default Note;
