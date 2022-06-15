import { css } from "@emotion/react"

//==================タブ系ナビゲーション===============//
const nav_all = css`
    .nav-tab__item{
        border:2px solid #a9a9a9;
        border-bottom:none;
        border-radius:8px 8px 0 0;
        width:100%;
        text-align:center;
        user-select: none;
        &:hover{
            border-color:black;
        }
        li{
            padding:10px;
            list-style:none;
        }
    }
`

//=================リスト系ナビゲーション===============//
const nav_list = css`
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
    user-select: none;
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
const nav_list___humberger = css`
    margin-top:100px;
    .nav-tab__item > li{
        padding:1rem 0;
        text-align:center;
    }
`
const nav_list___dot = css`
    li{
        padding:1rem 0;
        color:white;
    }
`

export const navSet = {
    nav_all,
    nav_list,
    nav_list_group,
    nav_list___humberger,
    nav_list_title,
    nav_list___dot
}