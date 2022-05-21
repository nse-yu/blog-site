import { css } from "@emotion/react"

const card_wrapper = css`
    border:1px solid white;
    box-shadow:1px 3px 10px white;
    background-color:rgb(0,0,0);
    border-radius:5px;
    width:100%;
    height:300px;
    z-index:1;
    a{
        text-decoration:none;
    }
`
const card_img = css`
    width:100%;
    height:50%;
    object-fit:cover;
    border-radius:5px;
`
//===============test props===============//
const card_test = css`
    width:100px;
    height:300px;
`

export const cardSet = {
    card_wrapper,
    card_img,
    card_test
}