import { css } from "@emotion/react"

const markdown_styles = css`
    padding:1rem;
    font-family: 'Kiwi Maru', serif;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-size:1.2rem;
    h1,h2,h3,h4,h5,h6{
        background:repeating-linear-gradient(135deg,rgba(255,255,255,0.456) 50%,white);
        border-left:8px solid black;
        border-bottom:1px solid black;
        margin:0.5rem 0;
        margin-top:1rem;
        padding:0.5rem;
    };
    h5,h6{
        background-color:transparent;
        border-color:gray;
        background:none;
    }
    h6{
        border-bottom:0;
        border-color:#93d057;
        border-width:3px;
    }
    blockquote{
        border:3px solid black;
        border-radius:5px;
        padding:0.5rem;
        margin:0.3rem;
    }
    em{
        border-bottom:1px solid black;
        margin:0 0.25rem 0 0;
    }
    ul,ol{
        margin-left:2rem;
    }
    table{
        border-spacing:0;
        border-collapse:"collapse";
        margin:0.5rem;
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
            text-align:center;
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
        border-radius:5px;
        width:80%;
        height:80%;
        box-shadow:1px 2px 6px gray;
        margin:0.3rem 0;
        max-height:300px;
        object-fit:contain;
        background:repeating-linear-gradient(45deg,#faf0e6 10%,white 30%)
    };
    .footnotes{
        font-size:0.9rem;
        margin-top:5rem;
        h2{
            font-size:0;
            border-left:8px solid #b0c4de;
            &:before{
                font-size:0.9rem;
                content:"注釈説明"
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