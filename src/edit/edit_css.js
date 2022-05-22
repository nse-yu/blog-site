import { css } from "@emotion/react"

const edit_note_wrapper = css`
    text-align:center;
    width:100%;
    height:100vh;
    color:white;
    font-family:'Zen Maru Gothic', sans-serif;
`
const edit_note = css`
    height:100%;
    border:6px solid black;
    border-radius:10px;
    background-color:white;
`
const edit_note_tools = css`
    padding:5px;
`
const edit_note_canvas = css`
    height:100%;
    padding:0.5rem;
    color:black;
    position:relative;
`

//=============inline obj for style/motion=============//
const edit_element = {
    border:"4px solid black",
    padding:5,
    backgroundColor:"black",
    zIndex:3
}
const drag_props = {
    initial:{borderRadius:"50%"},
    transition:{duration:0.8},
    whileDrag:{scale:0.6,width:200,borderRadius:"5px"},
    drag:true,
    dragMomentum:false,    //慣性をなくす
    dragSnapToOrigin:true //drag後に必ず元の位置に戻る
}

//=============all to export=============//
export const editSet = {
    edit_note,
    edit_note_wrapper,
    edit_note_tools,
    edit_element,
    drag_props,
    edit_note_canvas
}

