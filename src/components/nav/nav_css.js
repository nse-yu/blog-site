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
    height:500px;
    li{
        list-style:none;
    };
    a{
        text-decoration:none;
    }
`
const nav_list_title = css`
    font-family:'Zen Maru Gothic',sans-serif;
`

export const navSet = {
    nav_all,
    nav_tab,
    nav_list,
    nav_list_title
}