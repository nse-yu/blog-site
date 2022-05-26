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

export const btnSet = {
    btn,
    btn___reset,
    btn___submit,
    btn___open,
    btn___new
}