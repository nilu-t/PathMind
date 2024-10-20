import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { lexical_tool_commands } from './lexicalEditorConstants';
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, REDO_COMMAND, UNDO_COMMAND, KEY_ENTER_COMMAND, COMMAND_PRIORITY_LOW, $createParagraphNode} from "lexical"
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_CHECK_LIST_COMMAND } from '@lexical/list'

import {$getSelection, $createTextNode, $getRoot} from 'lexical';

import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';


const EditorCommandPanel = forwardRef((props, ref) => {
    /**
     * This is the toolbar component for the lexical editor. 
     * Docs on registering new editor commands: https://lexical.dev/docs/concepts/commands#editorregistercommand
     */

    const [editor] = useLexicalComposerContext(); 
    const [toolIcons, setToolIcons] = useState([]);


    //customizing the enter command to insert new lines instead of new paragraphs. Since, by default Lexical creates a new 'p' tag. 
    editor.registerCommand(
        KEY_ENTER_COMMAND,
        (event) => {
          event.preventDefault(); // Prevent the default behavior of creating a new <p> by lexical
          
          editor.update(() => {
            const selection = $getSelection();
            if (selection) {
              // Insert a line break or append text to the existing paragraph
              const textNode = $createTextNode('\n'); // Adding a new line
              selection.insertText(textNode.getTextContent());
            }
          });
          return true; // Mark the event as handled
        },
        COMMAND_PRIORITY_LOW
      );
    

    const handleToolIconClick = (iconKeyName) =>{
        //the commands are found from: https://github.com/facebook/lexical/blob/main/packages/lexical/src/LexicalEvents.ts
        if(iconKeyName === "redo"){
            editor.dispatchCommand(REDO_COMMAND); 
        }
        else if(iconKeyName === "undo"){
            editor.dispatchCommand(UNDO_COMMAND); 
        }
        else if(iconKeyName === "align-left"){
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }
        else if(iconKeyName === "align-center"){
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }
        else if(iconKeyName === "align-right"){
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }
        else if(iconKeyName === "bold"){
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold"); 
        }
        else if(iconKeyName === "italics"){
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic"); 
        }
        else if(iconKeyName === "underline"){
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline"); //need to fix this 
        }
        else if(iconKeyName === "bullets-list"){
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        }
        else if(iconKeyName === "numbers-list"){
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }
        else if(iconKeyName === "strikethrough"){
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough"); //need to fix this
        }        
        else if(iconKeyName === "h1"){
            //need to fix this 
        }

    }
    useEffect(() =>{
        const icons = Object.keys(lexical_tool_commands).map(key => [key, lexical_tool_commands[key].icon]); // each item in icons array will be a array with the list [tool name, tool icon component]  
        setToolIcons(icons);

    }, []);

    useImperativeHandle(ref, () => ({
        getNoteContent: () => {
            let noteContent = "";
            editor.read(() => {
                // Get the root node and convert the entire editor state to text content.
                const root = $getRoot();

                if(root){
                    noteContent = root.getTextContent(); // Retrieve content from the root
                }

            });
            return noteContent;
        },
        setNoteContent: (noteContent) =>{
            editor.update(()=>{
                const root = $getRoot();

                if(root){
                    root.clear(); //clear any text in the editor.

                    const paragraphNode = $createParagraphNode();
                    const textNode = $createTextNode(noteContent);
                    paragraphNode.append(textNode);
                    root.append(paragraphNode);
                }
            })
        },
        getEditorStateJSON: () => {
            let editorStateJSON = "";
            editor.read(() => {
                editorStateJSON = editor.getEditorState().toJSON(); // Convert state to JSON
            });
            return editorStateJSON;
        },
        setEditorStateFromJSON: (editorStateJSON) => {
            editor.update(() => {
                const editorState = editor.parseEditorState(editorStateJSON); // Parse JSON back to state
                editor.setEditorState(editorState); // Set the editor state
            });
        }

    }));
    
    return (
        <div>
            {toolIcons.map( (item, index) => (
                <span key={index} className='tool-icons' onClick={() => handleToolIconClick(item[0])}>
                    {item[1]}
                </span>
            ))}
        </div>
    );

})

export default EditorCommandPanel;