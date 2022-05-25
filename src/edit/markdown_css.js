import { css } from "@emotion/react"

const markdown_styles = css`
    padding:1rem;
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
`

export const markdownSet = {
    markdown_styles
}