import { css } from "@emotion/react"

const markdown_styles = css`
    margin-left:15px;
    h1,h2,h3,h4,h5,h6{
        border-left:8px solid black;
        padding:0.5rem;
    };
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