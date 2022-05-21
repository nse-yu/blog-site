import { css } from "@emotion/react"

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

export const navSet = {
    nav_all,
    nav_tab
}