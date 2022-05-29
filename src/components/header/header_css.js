import { css } from "@emotion/react"

//===============base properties==============//
const header_all = css`
    position: fixed;
    top:0;
    width:100%;
    z-index:2;
    gap:5px;
    background:linear-gradient(#1a1a1a,white);
    padding: 1rem 1rem 0 1rem;
    @media (max-width:600px){
        .header-down{
            display:none;
        }
        .header-up__nav{
            display:block;
            padding:0 1rem 0 0;
        }
    }
`
const header__test = css`
    height:100px;
`
const header_down = css`
    padding: 0 2rem;
`
const header_up_all = css`
    display:flex;
    justify-content:space-between;
    align-items:center;
`

//===============custom properties===============//
const header___minimize = css`
    padding:0.5rem 0.5rem 0 0.5rem;
`

export const headerSet = {
    header_all,
    header_down,
    header_up_all,
    header___minimize,
    header__test
}