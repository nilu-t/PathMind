import { Link, useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import axios from "axios";

const handleFileUpload = (title, event) => {
    const file = event.target.files[0];
    console.log(`File uploaded for ${title}: ${file.name}`);
    //handling the uploaded file. 

};


const NotesList = () => {
    const myParams = useParams()

    const [noteContent, setNoteContent] = useState('')
    const [noteTitle, setNoteTitle] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)
    const [numSubmitted, setNumSubmitted] = useState(0)
    const [myNotes, setMyNotes] = useState([])

    useEffect(() => {
        // This function will run when the component mounts
        sendGetRequest(`http://localhost:8000/get_notes/${myParams.subject}`);
    }, [myParams.subject]); // The effect will re-run if myParams.subject changes


    const incrementNumSubmitted = () =>{
        setNumSubmitted(numSubmitted + 1)
    }

    const sendPostRequest = (route_name) =>{

        axios.post(route_name)
        .then(response =>{
            console.log(`response from post request is ${JSON.stringify(response.data, null, 2)}`)
        })
        .catch(error =>{
            console.log(`error is ${error}`)
        })
    }

    const sendGetRequest = (route_name) =>{

        axios.get(route_name)
        .then(response =>{
            console.log(`response from get request is ${JSON.stringify(response.data, null, 2)}`)
            setMyNotes(response.data)
        })
        .catch(error =>{
            console.log(`error is ${error}`)
        })
    }

    const handleSubmitButtonClick = () =>{

        incrementNumSubmitted()
        if((noteContent.trim() === '')){
            setIsEmpty(true);
            return;
        }
        else{
            setIsEmpty(false);
            setNumSubmitted(0)
            sendPostRequest(`http://localhost:8000/add_note/${myParams.subject}/${noteTitle}/${noteContent}`)
            sendGetRequest(`http://localhost:8000/get_notes/${myParams.subject}`)
        }
        // alert(`Text area contains ${text}`)
    }

    const viewNotes = myNotes.map((noteObj) => {

        return (

            <Link to= {`/Note/${noteObj.note_title}/${noteObj.id}`} key={noteObj.id}>
                <p>{noteObj.note_title}</p>
            </Link>
        );
    });
    
    return(
        
        <div id="notes-list-div">
            <h1 id="title"> {myParams.subject} Notebook</h1>
            
            <div id="full-page-div">
                <div id="entire-note-upload-div">

                    <div id="left-container">
                        <div id="left-part-div">
                            <h1>Upload new note </h1>
                            <p id="files-accepted">Accepts: .pdf</p>
                            <input type="file"/>

                            <h1>OR</h1>
                            <div id="paste-note-div">
                                <textarea 
                                id="note-title"
                                placeholder="Your note title."
                                value = {noteTitle}
                                onChange = {(e) =>{
                                    setNoteTitle(e.target.value)
                                }}
                                ></textarea>
                                <textarea id="note-text"
                                placeholder="Your note content."
                                value = {noteContent}
                                onChange = {(e) => {
                                    setNoteContent(e.target.value)
                                }}
                                
                                ></textarea>
                            </div>
                        </div>
                        <div id="submit-div">
                                <button onClick={handleSubmitButtonClick}>Submit</button>
                                {isEmpty && numSubmitted==1 &&<p className="error-message">What kind of note is empty? 🤨</p>} {/** Conditional rendering when the note is empty */}
                                {isEmpty && numSubmitted==2 &&<p className="error-message">Again, what kind of note is empty? 🤨</p>} {/** Conditional rendering when the note is empty */}
                                {numSubmitted >= 3 && isEmpty && <p>Do you think I am a joke ? 😔</p>}
                                
                        </div>

                    </div>

                    <div id="right-part-div">
                        
                        <div id="code-snippet-div">
                            <h1>Code Snippet (Optional)</h1>
                            <textarea placeholder="Got code? Place it here before submitting."></textarea>
                        </div>

                    </div>
                </div>

                <div id="view-notes-div">
                    <h1>View Notes</h1>
                    {viewNotes}
                    {myNotes.length === 0 && 
                    <>
                    <p>Time to make some notes! 📝</p> 
                    <img></img>
                    </>} {/** Conditional rendering when there are no notes at all. */}
                </div>

                <div id="favourite-notes-div">
                    <h1>Favourite Notes</h1>
                </div>
            </div>
        </div>
    )
}

export default NotesList;