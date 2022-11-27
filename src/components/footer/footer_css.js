import { css } from "@emotion/react"

const footer_all = css`
    border-top:2px solid white;
    width:100%;
    padding:2rem;
    font-family:'Source Code Pro', monospace;

    .nav-tab__item:focus-within{
        border: 2px solid rgb(73 149 219 / 83%);
        border-radius: 5px;
    }
    .footer__media-logo{
        height: fit-content;
        &:focus-within{
            border: 2px solid rgb(73 149 219 / 83%);
            border-radius: 5px;
        }
    }
`
const footer__test = css`
    height:100px;
`

export const footerSet = {
    footer_all,
    footer__test
}