import { css } from "@emotion/react"

const maxWidth = 700

const top_all = css`
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    gap:2rem;
    background:linear-gradient(#000000,white);
    padding:1rem;
    @media (max-width: ${maxWidth}px){
        flex-direction:column;
    }
`

//===============section==============//
const top_cards = css`
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:3rem;
    align-content:center;
    padding:0 1rem;
    width:100%;
    @media (max-width: ${maxWidth}px){
        display:flex;
        flex-direction:column;
    }
    @media (max-width: 900px){
        grid-template-columns:repeat(2,1fr);
    }
`
const top_cards___horizontalize = css`
    width:100%;
    display:flex;
    gap:2rem;
    justify-content:center;
`
//===============aside================//
const top_side_all = css`
    display:flex;
    flex-direction:column;
    justify-content:start;
    width:250px;
`
const top_side_box__el = css`
    margin-bottom:2rem;
`

//===========hidden guide============//
const top_open_hidden = css`
    position:absolute;
    left:40px;
    margin:0.5rem;
    padding:1rem;
    border-radius:8px;
    justify-content:flex-start;
    align-items:flex-end;
    background-color:#d3d3d3;
    width:70vw;
    height:90vh;
    z-index:10;
`
const top_open_hidden___imgs = css`
    margin:0.5rem;
    padding:1rem;
    border-radius:8px;
    position:absolute;
    background-color:#d3d3d3;
    width:60%;
    z-index:9;
`
const top_open_hidden___list = css`
    width:100%;
    overflow-y:scroll;
`

//============test props============//
const top__test = css`
    height:1000px;
`

export const topSet = {
    top_all,
    top_side_all,
    top_cards,
    top_cards___horizontalize,
    top_side_box__el,
    top_open_hidden___imgs,
    top_open_hidden,
    top__test,
    top_open_hidden___list
}
