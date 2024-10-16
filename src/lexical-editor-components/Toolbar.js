import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { lexical_tool_commands } from './lexicalEditorConstants';
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, REDO_COMMAND, UNDO_COMMAND } from 'lexical';
import { INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list'

import { useState, useEffect } from 'react';

const Toolbar = () => {
    /**
     * This is the toolbar component for the lexical editor. 
     */

    const [editor] = useLexicalComposerContext(); 
    const [toolIcons, setToolIcons] = useState([]);


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
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND); //need to fix this 
        }
        else if(iconKeyName == "strikethrough"){
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");  //need to fix this 
        }

    }
    useEffect(() =>{
        const icons = Object.keys(lexical_tool_commands).map(key => [key, lexical_tool_commands[key].icon]); // each item in icons array will be a array with the list [tool name, tool icon component]  
        setToolIcons(icons);
    }, []);

    return (
        <div>
            {toolIcons.map( (item, index) => (
                <span key={index} className='tool-icons' onClick={() => handleToolIconClick(item[0])}>
                    {item[1]}
                </span>
            ))}
        </div>
    );

}
export default Toolbar;
