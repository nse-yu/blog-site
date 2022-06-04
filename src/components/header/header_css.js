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
        .header-up__nav-wrapper{
            display:block;
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
const header_logo__el = css`
    margin-top:0.5rem;
`

//===============custom properties===============//
const header___minimize = css`
    padding:0.5rem;
`

//================for edit header================//
const header_up_all___edit = css`

    @media (max-width:600px){
        align-items:center;
        .header-up__prev-following,.header-up__edit-options{
            display:none;
        }
        .header-up__when-smartphone{
            display:block;
        }
    }
`
const header_up_options___edit = css`
    @media (max-width:600px){
        gap:0;
    }
`

export const headerSet = {
    header_all,
    header_down,
    header_up_all,
    header___minimize,
    header_logo__el,
    header_up_all___edit,
    header_up_options___edit,
    header__test
}