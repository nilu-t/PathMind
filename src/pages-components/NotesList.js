import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import firebase from 'firebase/compat/app'; // for backward compatibility
import 'firebase/compat/auth'; // for backward compatibility
import { FaExpand, FaChevronDown} from "react-icons/fa"; //from https://react-icons.github.io/react-icons/
import { FaFilePdf } from "react-icons/fa6"; //from https://react-icons.github.io/react-icons/
import { VscRunAll } from "react-icons/vsc"; //from https://react-icons.github.io/react-icons/
import CodeEditor from "../code-editor-components/CodeEditor";
import NoteModal from "../modal-components/NoteModal";

const NotesList = () => {
    const myParams = useParams();
    const codeEditorRef = useRef(null);

    const [noteContent, setNoteContent] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [numSubmitted, setNumSubmitted] = useState(0);
    const [noteAddMessage, setNoteAddMessage] = useState('No note added yet.');
    const [myNotes, setMyNotes] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            firebase.auth().onAuthStateChanged(async (user) => {
                if (user) {
                    setUserEmail(user.email);
                    try {
                        const old_notes = await sendGetRequest(`http://localhost:8000/get_notes/${myParams.subject}?email=${user.email}`);
                        setMyNotes(old_notes);
                    } catch (error) {
                        console.error("Error fetching notes:", error);
                    }
                }
            });
        };
    
        fetchNotes();
    }, [myParams.subject]);
    
    const incrementNumSubmitted = () => {
        setNumSubmitted(numSubmitted + 1);
    };

    const sendPostRequest = async(route_name, data, config={}) => {
        try{
            const response = await axios.post(route_name, data, config);
            console.log(`response from post request is ${JSON.stringify(response.data, null, 2)}`);
            return response.data
        }
        catch (error) {
            console.log(`error from get request is ${error}`);
        }
    };

    const sendGetRequest = async (route_name) => {
        try {
            const response = await axios.get(route_name);
            console.log(`response from get request is ${JSON.stringify(response.data, null, 2)}`);
            return response.data;
        } catch (error) {
            console.log(`error from get request is ${error}`);
        }
    };

    const handleOptimizeButtonClick = async() =>{
        const codeSnippet = codeEditorRef.current.getCodeSnippet(); // Directly get the code from the editor
        let enhanced_note = await sendGetRequest(`http://localhost:8000/enhance_note?noteContent=${encodeURIComponent(noteContent)}&codeContent=${encodeURIComponent(codeSnippet)}&noteSubject=${myParams.subject}`);
        setNoteContent(enhanced_note);
    }

    const handleFileUpload = async(event) =>{
        let fileInput = event.target; 
        let file = fileInput.files[0];

        if (file.type === "application/pdf"){
            console.log(file);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', file.name);
            formData.append('type', file.type);
            formData.append('lastModifiedDate', file.lastModifiedDate);

            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                }
            }

            let fileContent = await sendPostRequest('http://localhost:8000/upload_note', formData, config);
            setNoteContent(fileContent.content); //update the note content to display the parsed PDF file.
            setNoteTitle(fileContent.name); //update the note title of the PDF file. 
        }
        else{
            // The uploaded file is not suitable for parsing, so we alert the user and clear the file input.
            alert("The file uploaded is not supported. Please upload a PDF file.");
            fileInput.value = ''; 
        }
    }

    const handleDeleteButtonClick = async(noteTitleToDelete) =>{

        const data = {
            noteTitle: noteTitleToDelete,
            userEmail: userEmail
        }

        await sendPostRequest('http://localhost:8000/delete_note', data);

        // After successful delete, update the state to show that removing the deleted note worked.
        let new_notes = await sendGetRequest(`http://localhost:8000/get_notes/${myParams.subject}?email=${userEmail}`);
        setMyNotes(new_notes);
    }

    const handleSubmitButtonClick = async() => {
        incrementNumSubmitted();

        const codeSnippet = codeEditorRef.current.getCodeSnippet(); // Directly get the code from the editor
        
        if (noteContent.trim() === '') {
            if(numSubmitted === 1){
                setNoteAddMessage("What kind of note is empty? 🤨");
            }
            else if (numSubmitted === 2){
                setNoteAddMessage("Again, what kind of note is empty?");
            }
            else if (numSubmitted >= 3){
                setNoteAddMessage("Do you think I am a joke? 😔");
            }
            return;

        } else {
            setNoteAddMessage(`You have added note: ${noteTitle}`); 

            setNumSubmitted(0);

            const data = {
                noteTitle: noteTitle,
                noteContent: encodeURIComponent(noteContent),
                codeContent: encodeURIComponent(codeSnippet),
                userEmail: userEmail,
                subject: myParams.subject
            };

            let addNoteResponse = await sendPostRequest(`http://localhost:8000/add_note/`, data);

            if(addNoteResponse === "User not found!"){
                alert("Please sign-up or sign-in to PathMind before adding any notes!");
            }

            //After successfully adding the note, update the state to show that adding the new note worked.
            let old_notes = await sendGetRequest(`http://localhost:8000/get_notes/${myParams.subject}?email=${userEmail}`);
            setMyNotes(old_notes);
        }
    };
    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };

    const noteTitleCallback = (event) =>{
        setNoteTitle(event.target.value);
    }

    const noteContentCallback = (event) =>{
        setNoteContent(event.target.value);
    }

    const handleExpandIconClick = (event) => {
        // alert("hello");
        // Example usage
        openModal();
    }

    let seenTitles = {};

    for (let i = 0; i < myNotes.length; i++) {
        let noteObj = myNotes[i];
        if (noteObj.note_title) {
            if (seenTitles[noteObj.note_title]) {
                myNotes.splice(i, 1);
                i--;
            } else {
                seenTitles[noteObj.note_title] = true;
            }
        }
    }

    const viewNotes = myNotes.map((noteObj) => {
        return (
            <Link to={`/Note/${noteObj.note_title}/${noteObj.id}`} key={noteObj.id}>
                <p>
                    {noteObj.note_title} 
                    <button onClick={(event) => {
                        event.preventDefault(); // since we're deleting the note, prevent the default behavior which is redirecting to the note link 
                        event.stopPropagation();  //we're deleting the note, so we don't want to redirect to the note compontent. 
                        handleDeleteButtonClick(noteObj.note_title)
                    }}>X</button>
                </p>
            </Link>
        );
    });
    
    return (
        <div id="notes-list-div">
            <h1 id="title"> {myParams.subject} Notebook</h1>
            <div id="full-page-div">
                <div id="entire-note-upload-div">
                    <div id="left-container">
                        <div id="left-part-div">
                            <h1>Upload new note </h1>
                            <p id="files-accepted">
                                Accepts: <FaFilePdf className="pdf-file-icon"/>
                            </p>
                            <input type="file" onChange={handleFileUpload}/>
                            
                            <h1>OR</h1>
                            <FaExpand className="expand-icon" onClick={handleExpandIconClick}/>
                            <NoteModal 
                                modalIsOpen={modalIsOpen} 
                                closeModal={closeModal} 
                                noteTitle={noteTitle} 
                                noteContent={noteContent} 
                                noteContentCallback={noteContentCallback}
                                noteTitleCallback={noteTitleCallback}
                            />
                            
                            <div id="paste-note-div">
                                <textarea
                                    id="note-title"
                                    placeholder="Your note title."
                                    value={noteTitle}
                                    onChange={noteTitleCallback}
                                ></textarea>
                                <textarea 
                                    id="note-text"
                                    placeholder="Your note content."
                                    value={noteContent}
                                    onChange={noteContentCallback}
                                ></textarea>
                            </div>
                        </div>
                        <div id="submit-div">
                            <button onClick={handleOptimizeButtonClick}>Optimize</button>
                            <button onClick={handleSubmitButtonClick}>Submit</button>
                            {<p>{noteAddMessage}</p>}
                        </div>
                    </div>

                    <div id="right-part-div">
                        <div id="code-snippet-div">
                            <h1>Code Snippet (Optional)</h1>
                            <CodeEditor codingLanguage={myParams.subject} ref={codeEditorRef}/>
                        </div>
                    </div>
                </div>

                <div id="view-notes-div">
                    <h1>View Notes</h1>
                    {viewNotes}
                    {myNotes && myNotes.length === 0 &&
                        <>
                            <p>Time to make some notes!</p>
                            <img src="/other-images/empty-note.png" draggable={false}></img>
                        </>}
                </div>
            </div>
        </div>
    );
};

export default NotesList;
