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

//===============for cards==============//

export const cardSet = {
    card_wrapper,
    card_img,
    card_text___toDesc,
    card_text,
    card_test
}