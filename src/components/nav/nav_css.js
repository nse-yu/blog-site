import { css } from "@emotion/react"

//==================タブ系ナビゲーション===============//
const nav_all = css`
    .nav-tab__item{
        border:2px solid #a9a9a9;
        border-bottom:none;
        border-radius:8px 8px 0 0;
        width:100%;
        background-color:#f8f8ff;
        text-align:center;
        user-select: none;
        &:hover{
            border-color:black;
        }
        li{
            padding:10px;
        }
    }
`
const nav_tab = css`
    display:flex;
    align-items:center;
    justify-content:space-between;
    li{
        list-style:none;
    }
`

//=================リスト系ナビゲーション===============//
const nav_list = css`
    border:1px solid white;
    border-radius:5px;
    background-color:white;
    padding:10px;
    li{
        list-style:none;
    };
    a{
        text-decoration:none;
        color:#778899;
    }
`
const nav_list_title = css`
    font-family:'Zen Maru Gothic',sans-serif;
    font-weight:bold;
    border-bottom:1px solid black;
`
const nav_list_group = css`
    margin-top:1.1rem;
    .group__title{
        font-family: 'Zen Maru Gothic', sans-serif;
    };
    .group__item{
        font-style:italic;
        color:black;
        margin-top:0.4rem;
    }
`

export const navSet = {
    nav_all,
    nav_tab,
    nav_list,
    nav_list_group,
    nav_list_title
}