import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { lexical_tool_commands } from './lexicalEditorConstants';
import { useState, useEffect } from 'react';

const Toolbar = () => {
    /**
     * This is the toolbar component for the lexical editor. 
     */

    const [editor] = useLexicalComposerContext(); 
    const [toolIcons, setToolIcons] = useState([]);

    useEffect(() =>{
        const icons = Object.keys(lexical_tool_commands).map(key => lexical_tool_commands[key].icon);
        setToolIcons(icons);
    }, []);

    return (
        <div>
            {toolIcons.map( (Icon, index) => (
                <span className='tool-icons'>
                    {Icon}
                </span>
            ))}
        </div>
    );

}
export default Toolbar;
