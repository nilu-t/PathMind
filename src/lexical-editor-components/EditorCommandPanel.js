import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { lexical_tool_commands } from './lexicalEditorConstants';
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, REDO_COMMAND, UNDO_COMMAND, KEY_ENTER_COMMAND, COMMAND_PRIORITY_LOW, $createParagraphNode, $isRangeSelection} from "lexical"
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND, INSERT_CHECK_LIST_COMMAND } from '@lexical/list'

import {
    $isHeadingNode,
    $createHeadingNode,
    $createQuoteNode,

} from "@lexical/rich-text";

import {$getSelection, $createTextNode, $getRoot, $wrapNodes,$isTextNode} from 'lexical';

import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';


const EditorCommandPanel = forwardRef((props, ref) => {
    /**
     * This is the toolbar component for the lexical editor. 
     * Docs on registering new editor commands: https://lexical.dev/docs/concepts/commands#editorregistercommand
     */

    const [editor] = useLexicalComposerContext(); 
    const [toolIcons, setToolIcons] = useState([]);

    editor.registerCommand(
        KEY_ENTER_COMMAND,
        (event) => {
          event.preventDefault();

          const selection = $getSelection();
          const anchorNode = selection?.anchor.getNode();
          
          if (anchorNode?.getParent().getType() === 'listitem') {
            editor.update(() => {
                const selection = $getSelection();  // Get the current selection
                if ($isRangeSelection(selection)) {
                    const newParagraph = $createParagraphNode();
                    newParagraph.append($createTextNode());  // Add a space inside the paragraph
                    selection.insertNodes([newParagraph]);
                }
            });
            return false; // Let Lexical handle lists
          }
      
          // Insert a new line
          editor.update(() => {
            const newTextnote = $createTextNode('\n');
            selection.insertText(newTextnote.getTextContent());
          });
      
          return true; // Custom behavior handled
        },
        COMMAND_PRIORITY_LOW
      );
      

      
      
    //helper function for formatting heading.
    const formatHeadingHelper = (headingType) =>{

        editor.update(()=>{
            const selection = $getSelection();

            if(selection && $isRangeSelection(selection)){
                const nodes = selection.getNodes(); //all the nodes from the selection. 

                const headingNode = $createHeadingNode(headingType); //i.e, headingType === "h1" || "h2" || "h3"...
                nodes.forEach((node, i)=>{
                    node.replace(headingNode); //replace method in Lexical works to swap nodes in the editor document tree, here we swap with the heading node. 
                    headingNode.append(node);
                })
              
            }
        })
    }

    const formatQuoteHelper = () => {
        // editor.update(() => {
        //     const selection = $getSelection();
    
        //     if (selection && $isRangeSelection(selection)) {
        //         const nodes = selection.getNodes();
        //         const quoteNode = $createQuoteNode();
    
        //         nodes.forEach((node) => {
        //             // If it's a text node, clone its content to preserve the text inside the quote
        //             if ($isTextNode(node)) {
        //                 const clonedTextNode = node.clone();
        //                 quoteNode.append(clonedTextNode);
        //             } else {
        //                 // Append any other node types directly
        //                 quoteNode.append(node);
        //             }
        //         });
    
        //         // Replace the selected range with the new quoteNode
        //         selection.insertNodes([quoteNode]);
        //     }
        // });
    };

    const formatUnderlineHelper = () =>{

    }

    const formatLinkHelper = () =>{

    }

    const uploadImageHelper = () =>{

    }

    
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
        else if(iconKeyName === "quote"){
            formatQuoteHelper(iconKeyName);
        }   
        else if(iconKeyName === "h1" || iconKeyName === "h2" || iconKeyName === "h3"){
            formatHeadingHelper(iconKeyName);
        }
    }
    useEffect(() =>{
        const icons = Object.keys(lexical_tool_commands).map(key => [key, lexical_tool_commands[key].icon]); // each item in icons array will be a array with the list [tool name, tool icon component]  
        setToolIcons(icons);

        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left"); //let the editor start with left align by default. 

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
        <div className='toolbar-container'>
            {toolIcons.map( (item, index) => (
                <span key={index} className='tool-icons' onClick={() => handleToolIconClick(item[0])}>
                    {item[1]}
                </span>
            ))}
        </div>
    );

})

export default EditorCommandPanel;