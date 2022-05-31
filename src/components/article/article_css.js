import { css } from "@emotion/react"

const article_all = css`
    padding:1rem;
    background:repeating-linear-gradient(135deg,#fdf5e6,#fafff0,#e6e6ff,#e6fff2);
    @media (max-width:600px){
        flex-direction:column;
    }
`
//============for info===========//
const article_info = css`
    color:white;
    font-family: 'Zen Maru Gothic', sans-serif;
    h1{
        font-size:2rem;
    }
`
const article_desc = css`
    color:black;
    font-weight:600;
`
//=============for big img============//
const article_bigimg_wrapper = css`
    width:90%;
`
const article_bigimg_wrapper__el = css`
    margin:0 auto;
`
//==============for page markdown===========//
const article_content = css`
    width:75%;
    @media (max-width:600px){
        width:100%;
    }
`

//==============for page line==============//
const article_page__line = css`
    border-right:1px solid black;
    @media (max-width:600px){
        border-bottom:1px solid black;
    }
`

export const articleSet = {
    article_all,
    article_info,
    article_desc,
    article_content,
    article_bigimg_wrapper,
    article_bigimg_wrapper__el,
    article_page__line
}