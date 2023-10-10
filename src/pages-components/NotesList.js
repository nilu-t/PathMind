import { useParams } from "react-router-dom";


const handleFileUpload = (title, event) => {
    const file = event.target.files[0];
    console.log(`File uploaded for ${title}: ${file.name}`);
    //handling the uploaded file. i.e, extract the text and upload the note to the database. 

};

const NotesList = () => {
    const myParams = useParams();

    return(
        
        <div id="notes-list-div">
            <h1 id="title"> {myParams.subject} Notebook</h1>
            
            <div id="full-page-div">
                <div id="left-and-right-part-div">

                    <div id="left-container">
                        <div id="left-part-div">
                            <h1>Upload new note </h1>
                            <p id="files-accepted">Accepts: .pdf</p>
                            <input type="file"/>
                        </div>

                        <div id="submit-div">
                                <button>Submit</button>
                        </div>

                    </div>

                    <div id="right-part-div">
                        
                        <div id="code-snippet-div">
                            <h1>Code Snippet (Optional)</h1>
                            <textarea placeholder="Got code? Place it here before submitting."></textarea>
                            <p></p>
                        </div>

                    </div>
                </div>

                <div id="view-notes-div">
                    <h1>View Notes</h1>
                </div>

                <div id="favourite-notes-div">
                    <h1>Favourite Notes</h1>
                </div>
            </div>
        </div>
    )
}

export default NotesList;