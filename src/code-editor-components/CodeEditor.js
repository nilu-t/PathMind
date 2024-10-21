import Editor from '@monaco-editor/react' //from https://www.npmjs.com/package/@monaco-editor/react
import { files } from './codeEditorConstants';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { VscRunAll } from "react-icons/vsc"; //from https://react-icons.github.io/react-icons/
import { sendGetRequest, sendPostRequest } from '../api-tools/requests';
import { useState } from 'react';

/**
 * The monaco code editor will take up 100% of the width and height of the container element. 
 * Since this CodeEditor component will be inside the code-snippet-div we can just return the editor with the height as inherit and width as auto.
 * 
 * To run code I used the following Piston API: https://piston.readthedocs.io/en/latest/api-v2/
 * 
 * 
 */

const CodeEditor = forwardRef( ({codingLanguage, defaultContent=""}, ref) =>{
    let monacoRef = useRef(null); 
    let file = files[codingLanguage.toLowerCase()];
    let name = file.name;
    let defaultLanguage = file.defaultLanguage;
    let value = file.value;

    const [codeOutput, setCodeOutput] = useState('');
    const [isCodeRunning, setCodeRunning] = useState(false);

    if(defaultContent !== ""){
        value = defaultContent; //if defaultContent is provided we can just use that as the code inside the code editor. 
    }

    const handleEditorDidMount = (editor, monaco) =>{
        /**
         * This function is triggered after the monaco editor mounts to store the monaco instance. 
         */

        monacoRef.current = editor;
    }

    const getRuntimes = async()=>{
        const data = await sendGetRequest('https://emkc.org/api/v2/piston/runtimes'); //from https://github.com/engineer-man/piston
        // console.log(JSON.stringify(data, null, 2)); // Stringify and format the JSON response.
        return data;
    }

    const handleRunButtonClick = async() =>{

        try{
            setCodeRunning(true);
            setCodeOutput("Executing code..."); //letting the user know that the code is being executed as the API call to execute the code is asynchronous. 

            const data = 
            {
                "language": codingLanguage.replaceAll(" ", "").toLowerCase(), //accounting for the special case with "C Sharp"
                "version": "*", //The '*' here allows for any version of the language to be executed. 
                "files": [
                    {
                        "name": file.name,
                        "content":  monacoRef.current.getValue()
                    }
                ]
            }

            const config ={
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const codeOutput = await sendPostRequest('https://emkc.org/api/v2/piston/execute', data, config); //from https://github.com/engineer-man/piston
            
            // alert(JSON.stringify(codeOutput, null, 2));
            if(codeOutput.run.stderr){
                setCodeOutput(codeOutput.run.stderr); //set the code output to be the error (i.e, runtime, syntax, etc.)
            }
            else{
                setCodeOutput(codeOutput.run.stdout); //successful code output. 
            }
        }
        catch(error){
            setCodeOutput("Error: Unable to execute code. Please try again later.");
            console.error("Error while executing code:", error);
        }
        finally{
            setCodeRunning(false); //the code has finished execution by this point. 
        }
            
    }

    useImperativeHandle(ref, ()=> ({
        /**
         * This function returns the code inside the code editor.
         */
        getCodeSnippet:() =>{
            
            return monacoRef.current.getValue();
        }
    }))
    
    return(
        <div className="code-editor-container">
            <Editor
                className="code-editor"
                height="inherit"
                width="auto"
                theme="vs-dark"
                defaultLanguage={defaultLanguage}
                defaultValue={value}
                path={name}
                onMount={handleEditorDidMount}
            />
            <button className="run-code-button"
                onClick={handleRunButtonClick}
            >
                RUN <VscRunAll />
            </button>
            <textarea
                className='code-editor-output'
                readOnly={true}
                placeholder='Click on RUN button to see the output'
                value={codeOutput}
            ></textarea>
        </div>
    );

});

export default CodeEditor;