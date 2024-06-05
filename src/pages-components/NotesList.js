import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import firebase from 'firebase/compat/app'; // for backward compatibility
import 'firebase/compat/auth'; // for backward compatibility

const NotesList = () => {
    const myParams = useParams();
    const [noteContent, setNoteContent] = useState('');
    const [codeContent, setCodeContent] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);
    const [isEmptyTitle, setIsEmptyTitle] = useState('');
    const [numSubmitted, setNumSubmitted] = useState(0);
    const [myNotes, setMyNotes] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
                sendGetRequest(`http://localhost:8000/get_notes/${myParams.subject}?email=${user.email}`);
            }
        });
    }, [myParams.subject]);

    const incrementNumSubmitted = () => {
        setNumSubmitted(numSubmitted + 1);
    };

    const sendPostRequest = (route_name, data) => {
        axios.post(route_name, data)
            .then((response) => {
                console.log(`response from post request is ${JSON.stringify(response.data, null, 2)}`);
            })
            .catch((error) => {
                console.log(`error is ${error}`);
            });
    };

    const sendGetRequest = (route_name) => {
        axios.get(route_name)
            .then((response) => {
                console.log(`response from get request is ${JSON.stringify(response.data, null, 2)}`);
                setMyNotes(response.data);
            })
            .catch((error) => {
                console.log(`error is ${error}`);
            });
    };

    const handleSubmitButtonClick = () => {
        incrementNumSubmitted();

        if (noteContent.trim() === '') {
            setIsEmpty(true);
            return;
        } else if (noteTitle.trim() === '') {
            setIsEmptyTitle(true);
            return;
        } else {
            setIsEmpty(false);
            setNumSubmitted(0);
            const data = {
                noteTitle: noteTitle,
                noteContent: noteContent,
                codeContent: codeContent,
                userEmail: userEmail
            };
            sendPostRequest(`http://localhost:8000/add_note/${myParams.subject}`, data);
            sendGetRequest(`http://localhost:8000/get_notes/${myParams.subject}?email=${userEmail}`);
        }
    };

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
                <p>{noteObj.note_title}</p>
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
                            <p id="files-accepted">Accepts: .pdf</p>
                            <input type="file" />

                            <h1>OR</h1>
                            <div id="paste-note-div">
                                <textarea
                                    id="note-title"
                                    placeholder="Your note title."
                                    value={noteTitle}
                                    onChange={(e) => {
                                        setNoteTitle(e.target.value);
                                    }}
                                ></textarea>
                                <textarea id="note-text"
                                    placeholder="Your note content."
                                    value={noteContent}
                                    onChange={(e) => {
                                        setNoteContent(e.target.value);
                                    }}
                                ></textarea>
                            </div>
                        </div>
                        <div id="submit-div">
                            <button onClick={handleSubmitButtonClick}>Submit</button>
                            {isEmpty && numSubmitted === 1 && <p className="error-message">What kind of note is empty? 🤨</p>}
                            {isEmpty && numSubmitted === 2 && <p className="error-message">Again, what kind of note is empty? 🤨</p>}
                            {numSubmitted >= 3 && isEmpty && <p>Do you think I am a joke? 😔</p>}
                        </div>
                    </div>

                    <div id="right-part-div">
                        <div id="code-snippet-div">
                            <h1>Code Snippet (Optional)</h1>
                            <textarea
                                placeholder="Got code? Place it here before submitting."
                                value={codeContent}
                                onChange={(e) => {
                                    setCodeContent(e.target.value);
                                }}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div id="view-notes-div">
                    <h1>View Notes</h1>
                    {viewNotes}
                    {myNotes.length === 0 &&
                        <>
                            <p>Time to make some notes!</p>
                            <img src="/other-images/empty-note.png" draggable={false}></img>
                        </>}
                </div>

                <div id="favourite-notes-div">
                    <h1>Favourite Notes</h1>
                </div>
            </div>
        </div>
    );
};

export default NotesList;
