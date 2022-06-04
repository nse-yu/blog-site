import { css } from "@emotion/react"

const btn = css`
    border:3px solid black;
    border-radius:10px;
    padding:0.2rem 2rem;
    font-family: 'Zen Maru Gothic', sans-serif;
    font-weight:bold;
    box-shadow:white 1px 1px 1px;
`

const btn___reset = css`
    background-color:#87cefa;
`
const btn___submit = css`
    background-color:#98fb98;
`
const btn___open = css`
    background-color:#fffacd;
`
const btn___new = css`
    background-color:#ffd1cc;
`

//toggle
const toggle_btn_wrapper = css`
    background-color:#e6e6e6;
    box-shadow:1px 1px 4px black;
    padding:0.3rem;
    border-radius:5px;
    font-size:0.8rem;
    font-family:'Zen Maru Gothic',sans-serif;
    font-weight:bold;
`
const toggle_btn_area = css`
    padding:2px;
    border-radius:50px;
    background-color:white;
    width:50px;
    height:30px;
`
const toggle_btn_area___long = css`
    width:65px;
`
const toggle_btn = css`
    border-radius:50%;
    width:25px;
    height:25px;
`

export const btnSet = {
    btn,
    btn___reset,
    btn___submit,
    btn___open,
    btn___new,
    toggle_btn_wrapper,
    toggle_btn_area,
    toggle_btn_area___long,
    toggle_btn
}