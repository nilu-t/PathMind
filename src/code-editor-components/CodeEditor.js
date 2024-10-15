
import Editor from '@monaco-editor/react' //from https://www.npmjs.com/package/@monaco-editor/react
import { files } from './codeEditorConstants';
import { forwardRef, useImperativeHandle, useRef } from 'react';

/**
 * The monaco code editor will take up 100% of the width and height of the container element. 
 * Since this CodeEditor component will be inside the code-snippet-div we can just return the editor with the height as inherit and width as auto.
 */

const CodeEditor = forwardRef( ({codingLanguage, defaultContent=""}, ref) =>{
    let monacoRef = useRef(null); 
    let file = files[codingLanguage.toLowerCase()];
    let name = file.name;
    let defaultLanguage = file.defaultLanguage;
    let value = file.value;

    if(defaultContent != ""){
        value = defaultContent; //if defaultContent is provided we can just use that as the code inside the code editor. 
    }

    const handleEditorDidMount = (editor, monaco) =>{
        /**
         * This function is triggered after the monaco editor mounts to store the monaco instance. 
         */

        monacoRef.current = editor;
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
    );

});

export default CodeEditor;
