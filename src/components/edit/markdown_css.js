import { css } from "@emotion/react"

const markdown_styles = css`
    padding:1rem;
    font-family: 'Kiwi Maru', serif;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-size:1.2rem;
    h1,h2,h3,h4,h5,h6{
        border-left:8px solid black;
        border-bottom:1px solid black;
        margin:0.5rem 0;
        margin-top:1rem;
        padding:0.5rem;
    };
    ul,ol{
        margin-left:2rem;
    }
    table{
        border-spacing:0;
        border-collapse:"collapse";
        tr{
            background-color:white;
        };
        th,td{
            border:3px solid black;
            border-left:0;
            border-right:0;
            padding:0.5rem;
        };
        th{
            color:white;
            background-color:gray;
        };
        td{
            border-top:0;
            text-align:right;
            background-color:white;
        };
    };
    code{
        background-color:#333333;
        padding:1rem;
        border-radius:8px;
        color:white;
    };
    pre{
        margin:1.2rem 0;
    };
    img{
        width:100%;
        height:100%;
    };
    .footnotes{
        font-size:0.9rem;
        h2{
            font-size:0;
            border-left:8px solid #b0c4de;
            &:before{
                font-size:0.9rem;
                content:"用語説明"
            }
        }
    };
    .contains-task-list{
        list-style:none;
    };
    strong{
        color:red;
    }
`

export const markdownSet = {
    markdown_styles
}