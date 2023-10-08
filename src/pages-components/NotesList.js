import { useParams } from "react-router-dom";

const NotesList = () => {
    const myParams = useParams();

    return(
        
        
        <div id="notes-list-div">
            <h1 id="title"> {myParams.subject} Notebook</h1>
            
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
                        <textarea placeholder="Got code? Place it here."></textarea>
                        <p></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NotesList;