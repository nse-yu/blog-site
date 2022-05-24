import { css } from "@emotion/react"

const btn = css`
    border:3px solid black;
    border-radius:10px;
    padding:0.2rem 2rem;
    font-family: 'Zen Maru Gothic', sans-serif;
    font-weight:bold;
`

const btn___reset = css`
    background-color:white;
`
const btn___submit = css`
    background-color:#98fb98;
`
export const btnSet = {
    btn,
    btn___reset,
    btn___submit
}