import { css } from "@emotion/react"

const top_all = css`
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    gap:2rem;
    background:linear-gradient(#000000,white);
    border-radius:5px;
    padding:1rem;
`

//===============section==============//
const top_cards = css`
    width:75%;
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:3rem;
    align-content:center;
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
    width:20%;
`
const top_side_box = css`
    height:500px;
    border:1px solid white;
    border-radius:5px;
    background-color:white;
    padding:10px;
    li{
        list-style:none;
    }
`
const top_side_box__el = css`
    margin-bottom:2rem;
`

//===========hidden guide============//
const top_open_hidden = css`
    margin:0.5rem;
    padding:1rem;
    border-radius:8px;
    position:absolute;
    justify-content:flex-start;
    align-items:flex-start;
    background-color:#d3d3d3
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
    top_open_hidden,
    top_side_box,
    top__test
}
