import { css } from "@emotion/react"

const top_all = css`
    display:flex;
    justify-content:space-between;
    background:linear-gradient(#000000,white);
    border-radius:5px;
    padding:1rem;
`

//===============section==============//
const top_grid_article = css`
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:3rem;
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
    opacity:0.5;
    li{
        list-style:none;
    }
`
const top_side_box__el = css`
    margin-bottom:2rem;
`

//============test props============//
const top__test = css`
    height:1000px;
`

export const topSet = {
    top_all,
    top_side_all,
    top_grid_article,
    top_side_box__el,
    top_side_box,
    top__test
}
