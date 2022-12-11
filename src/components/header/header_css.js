import { css } from "@emotion/react"

const maxWidth = 700

//===============base properties==============//
const header_all = css`
    position: fixed;
    top:0;
    width:100%;
    z-index:2;
    gap:5px;
    background:linear-gradient(#1a1a1a,white);
    padding: 1rem 1rem 0 1rem;
    @media (max-width:${maxWidth}px){
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

    .nav-tab__item:focus-visible{
        opacity: 0.2;
    }
`
const header_up_all = css`
    display:flex;
    justify-content:space-between;
    align-items:flex-start;

    .header-up__logo,
    .header-up__theme,
    .header-up__github,
    .header-up__edit{
        border: 2px solid transparent;
    }

    .header-up__logo a:focus-visible,
    .header-up__theme a:focus-visible,
    .header-up__github a:focus-visible,
    .header-up__edit a:focus-visible{
        outline: 2px solid rgb(255 255 255 / 83%);
    }
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
    align-items:center;
    @media (max-width:${maxWidth}px){
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
    @media (max-width:${maxWidth}px){
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