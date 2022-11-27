import { css } from "@emotion/react"

const markdown_styles = css`
    padding:1rem;
    font-family: 'Kiwi Maru', serif;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    font-size:1rem;
    line-height:2rem;
    a{
        color: #00c4d6;
        &:hover{
            opacity: 0.3;
            transition: 0.6s;
        }
    }
    i{
        font-weight:900;
    }
    p{
        padding: 0 0.3rem;
    }
    h1,h2,h3,h4,h5,h6{
        margin:0.5rem 0;
        margin-top:1rem;
        text-shadow: 1px 1px 1px rgb(0 0 0 / 20%);
    }
    h2,h3,h4,h5,h6{
        margin-top:2rem;
    }
    h1, h2, h3{
        margin: 1.5rem 0;
        margin-top: 3rem;
    }
    h1{
        font-size:2.5rem;
    }
    h2{
        font-size:2.0rem;
    }
    h3{
        font-size:1.5rem;
    }
    h4{
        border-left: 0.5rem solid #f5deb3;
        padding: 0.8rem;
        font-size: 1.2rem;
        color: #ffa802ed;
    }
    h5{
        border-bottom: 0.15rem solid rgba(0, 0, 0, 0.1);
        font-size: 1.2rem;
        padding: 0.5rem;
    }
    h6{
        border-bottom:1px double #e7b556;
        border-top:1px double #e7b556;
        border-left:none;
        border-width:3px;
        padding: 0.5rem;
        font-size: 0.85rem;
    }
    blockquote{
        border:3px solid #fbdeb852;
        border-radius:5px;
        padding:0.5rem;
        margin:0.3rem;
        background-color: #fbdeb852;
        border-style: double;
    }
    pre{
        div{
            background: rgba(0, 0, 0, 0.77)!important;
            border: 0.3em solid rgb(0, 0, 0)!important;
        }
    }
    em{
        border-bottom:1px solid black;
        margin:0 0.25rem 0 0;
        font-weight:600;
        strong{
            font-size:1.2rem;
            font-style: normal;
            background-color: #ffeb0f75;
            padding: 0.3rem;
            color: black;
        }
    }
    strong{
        color: red;
    }
    ul,ol{
        margin-left:2rem;
    }
    li{
        margin-bottom:1.2rem;
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
    img{
        border-radius:5px;
        width:50%;
        height:80%;
        box-shadow:1px 2px 6px gray;
        margin:0.3rem 0;
        max-height:300px;
        object-fit:contain;
        background:transparent;
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
`

export const markdownSet = {
    markdown_styles
}