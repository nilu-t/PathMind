

import { BsTypeH1, BsTypeH2, BsTypeH3, BsTypeBold, BsTypeItalic, BsListUl ,
    BsTypeUnderline, BsListOl, BsQuote, BsTypeStrikethrough, BsTextLeft,
    BsTextCenter, BsTextRight, BsLink, BsCardImage
} from "react-icons/bs";

import { FaUndo, FaRedo } from "react-icons/fa";

export const lexical_tool_commands = {
    "h1": {
        icon: <BsTypeH1/>
    },
    "h2": {
        icon: <BsTypeH2/>
    },
    "h3": {
        icon: <BsTypeH3/>
    },
    "bold": {
        icon: <BsTypeBold/>
    },
    "italics": {
        icon: <BsTypeItalic/>
    },
    "bullets-list": {
        icon: <BsListUl/>
    },
    "numbers-list":{
        icon: <BsListOl/>
    },
    "underline": {
        icon: <BsTypeUnderline/>
    },
    "undo":{
        icon: <FaUndo/>
    },
    "redo":{
        icon: <FaRedo/>
    },
    "quote":{
        icon: <BsQuote/>
    },
    "strikethrough":{
        icon: <BsTypeStrikethrough/>
    },
    "align-left":{
        icon: <BsTextLeft/>
    },
    "align-center":{
        icon: <BsTextCenter/>
    },
    "align-right":{
        icon: <BsTextRight/>
    },
    "insert-link":{
        icon: <BsLink/>
    },
    "insert-image":{
        icon: <BsCardImage/>
    }

}

