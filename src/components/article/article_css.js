import { css } from "@emotion/react"
import back from "./lines-7124376_1920.png"

const article_all = css`
    padding:1rem;
    background-image:url(${back});
    background-repeat:round;
    @media (max-width:600px){
        flex-direction:column;
    }
`
//============for info===========//
const article_info = css`
    font-family: 'Zen Maru Gothic', sans-serif;
    h1{
        font-size:2rem;
    }
`
const article_desc = css`
    font-weight:600;
`
const breadcrumb_wrapper = css`
`
const breadcrumb_link = css`
    a{
        &:hover{
            opacity:0.5;
        }
    }
    &::after{
        content:">";
        margin-left:0.3rem;
    }
`
const breadcrumb_link___end = css`
    margin-top:1.5px;
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
    background-color:white;
    border-radius:10px;
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
    article_page__line,
    breadcrumb_link,
    breadcrumb_link___end,
    breadcrumb_wrapper
}