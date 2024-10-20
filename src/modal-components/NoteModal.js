import Modal from 'react-modal';
import { FaChevronDown } from "react-icons/fa";
import Editor from '../lexical-editor-components/EditorWrapper';
import { useEffect, useState } from 'react';

const NoteModal = ({ modalIsOpen, closeModal, lexicalEditorRef, modalLexicalEditorRef }) => {

    // This will be called after the modal has opened and is ready (fully rendered).
    const handleAfterOpen = () => {
        if (modalLexicalEditorRef.current && lexicalEditorRef.current) {
            // Get the editor state from the main editor. 
            const editorState = lexicalEditorRef.current.getEditorStateJSON(); // Serialize the state to JSON
            // Set the modal editor's state. 
            modalLexicalEditorRef.current.setEditorStateFromJSON(editorState); // Deserialize into modal editor
        }
    };

    // This will be called just before the modal closes
    const handleBeforeClose = () => {
        if (modalLexicalEditorRef.current && lexicalEditorRef.current) {
            // Get the editor state from the modal editor. 
            const modalEditorState = modalLexicalEditorRef.current.getEditorStateJSON();  // Serialize the state to JSON
            // Update the main editor with the modal editor's state. 
            lexicalEditorRef.current.setEditorStateFromJSON(modalEditorState); // Deserialize into main editor
        }
    };

    return (
        <Modal
            className="custom-modal"
            overlayClassName="custom-modal-overlay"
            isOpen={modalIsOpen}
            onRequestClose={() => {
                handleBeforeClose();
                closeModal();
            }}
            onAfterOpen={handleAfterOpen}
            ariaHideApp={false}
        >
            {/* Render the Lexical editor, with ref forwarded */}
            <Editor className="modal-lexical-editor" ref={modalLexicalEditorRef} />
            <FaChevronDown className="down-close-icon" onClick={() => {
                handleBeforeClose();
                closeModal();
            }} />
        </Modal>
    );
};

export default NoteModal;
