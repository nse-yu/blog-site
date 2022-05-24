import { css } from "@emotion/react"

//all
const edit_top_all = css`
    justify-content:center;
    padding:1.5rem;
`
//=============note basis==============//
const edit_note_wrapper = css`
    width:50%;
    color:white;
    font-family:'Zen Maru Gothic', sans-serif;
`
const edit_note_title = css`
    text-align:center;
    user-select: none;
`
const edit_note = css`
    height:640px;
    border:6px solid black;
    border-radius:10px;
    background-color:white;
`
//==============editable note(up)==============//
const edit_note_tools = css`
    padding:5px;
    justify-content:flex-start;
    gap:10px;
`
const scrollbar_style = css`
    overflow-x:scroll;
    overflow-y:scroll;
    scroll-behavior:smooth;
    &::-webkit-scrollbar{
        height: 4px;
        width: 4px;
    }
    &::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.291);
    }
    &::-webkit-scrollbar-track{
        background-color: rgba(0, 0, 0, 0.039);
    }

`
//=================editable note(down)===============//
const edit_note_canvas = css`
    height:100%;
    padding:0.5rem;
    color:black;
    textarea{
        width:100%;
        height:100%;
    }
`
//================hover board===============//
const tools_annotation = css`
    background-color:white;
    border-radius:5px;
    padding:0.6rem;
    color:red;
    position:absolute;
    top:50px;
    right:10px;
`
//==============preview note==============//
const preview_note = css`
    overflow-x:scroll;
` 

//=============note title & desc & img =============//
const note_info___el = css`
    margin:2rem;
`
const note_input_el = css`
    margin-bottom:0.5rem;
`
const note_info = css`
    width:100%;
    input,textarea{
        border:3px solid black;
        border-radius:8px;
        padding:3px;
    };
`
const note_input_up = css`
    width:20%;
`
const note_input_down = css`
    width:100%;
    textarea{
        width:80%;
        resize:none;
    };
    input[type="file"]{
        width:100%;
        height:100%;
        background-color:#f5f5f5;
        text-indent:9999px;
    }
`
const note_input_img = css`
    width:20%;
    overflow:hidden;
    position: relative;
`
const img_instruction = css`
    position:absolute;
    pointer-events:none;
`
const img_instruction_preview = css`
    border-radius:5px;
    width:86px;
    height:86px;
`

//=============inline obj for style/motion=============//
const edit_element = {
    padding:10,
    backgroundColor:"black"
}
const hover_props = {
    initial:{borderRadius:"50%"},
    transition:{duration:0.5},
}

//=============all to export=============//
export const editSet = {
    edit_note,
    edit_top_all,
    img_instruction_preview,
    edit_note_wrapper,
    edit_note_tools,
    note_input_el,
    edit_note_title,
    edit_element,
    note_input_up,
    img_instruction,
    note_input_down,
    scrollbar_style,
    tools_annotation,
    note_info___el,
    note_input_img,
    note_info,
    hover_props,
    preview_note,
    edit_note_canvas
}

