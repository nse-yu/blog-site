import { css } from "@emotion/react"

const article_all = css`
    padding:1rem;
`
//============for info===========//
const article_info = css`
    color:white;
    font-family: 'Zen Maru Gothic', sans-serif;
`
const article_desc = css`
    color:black;
`
//=============for big img============//
const article_bigimg_wrapper = css`
    width:90%;
`
const article_bigimg_wrapper__el = css`
    margin:0 70px;
`
//==============for page markdown===========//
const article_content = css`
    width:75%;
`

export const articleSet = {
    article_all,
    article_info,
    article_desc,
    article_content,
    article_bigimg_wrapper,
    article_bigimg_wrapper__el
}