import { css } from "@emotion/react"

const card_wrapper = css`
    border:1px solid white;
    box-shadow:1px 3px 10px white;
    background-color:rgb(0,0,0);
    border-radius:5px;
    height:300px;
    z-index:1;
    flex-shrink:0;
    user-select: none;
    overflow:hidden;
    position: relative;
    a{
        text-decoration:none;
    }
`
//===============for img==============//
const card_img = css`
    width:100%;
    height:50%;
    object-fit:cover;
    border-radius:5px;
`

//=============for caption=============//
const card_text = css`
    padding:0.5rem;
    color:white;
`
const card_text___toDesc = css`
    color:gray;
`


//===============test props===============//
const card_test = css`
    width:100px;
    height:300px;
`

//===============for cards================//
const cards_wrapper = css`
    height:400px;
`
const cards_img = css`
    width:100%;
    object-fit:cover;
`
const cards___deletable = css`
    position:absolute;
    top:0.5rem;
    left:0.5rem;
`

//===============for motion==============//
const cards_img__motion___animate = {
    opacity:0.6,
    borderRadius:10,
    x:5
}
const cards_img__motion___trans = {
    duration:0.6
}

//===============for cards==============//

export const cardSet = {
    card_wrapper,
    card_img,
    card_text___toDesc,
    cards_wrapper,
    cards_img__motion___animate,
    cards_img__motion___trans,
    cards_img,
    card_text,
    cards___deletable,
    card_test
}