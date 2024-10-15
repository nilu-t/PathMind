
import Modal from 'react-modal'; // from https://reactcommunity.org/react-modal/
import {FaChevronDown} from "react-icons/fa"; //from https://react-icons.github.io/react-icons/

const NoteModal = ({modalIsOpen, closeModal, noteTitle, noteContent, noteTitleCallback, noteContentCallback}) =>{
    /**
     * This note modal will be a controlled component to manage the users note title and note content.
     */

    return(
        <Modal className="custom-modal" overlayClassName="custom-modal-overlay" isOpen={modalIsOpen} onRequestClose={closeModal}>
            <textarea 
                id="modal-note-title"
                placeholder="Your note title."
                value={noteTitle}
                onChange={noteTitleCallback}
            ></textarea>
            <textarea
                id="modal-note-content"
                placeholder="Your note content"
                value={noteContent}
                onChange={noteContentCallback}
            >
            </textarea>
            <FaChevronDown className="down-close-icon" onClick={closeModal}/>
        </Modal>
    );
}

export default NoteModal;