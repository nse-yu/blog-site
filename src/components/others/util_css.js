import { css } from "@emotion/react"

const verticalize = css`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`
const horizontalize = css`
    display:flex;
    justify-content:space-between;
    gap:1rem;
`
const head_foot_opacity = css`
    opacity:1
`
const horizontalize___left = css`
    justify-content:flex-start;
`
const horizontalize___right = css`
    justify-content:flex-end;
`
const horizontalize___center = css`
    justify-content:center;
`
const horizontalize__align = css`
    align-items:center;
`
const verticalize___center = css`
    align-items:center;
`

const list_reset = css`
    a{
        text-decoration:none;
    }
    li{
        list-style:none;
        color:white;
    }
`


export const utilSet = {
    verticalize,
    horizontalize,
    head_foot_opacity,
    verticalize___center,
    horizontalize___center,
    horizontalize__align,
    horizontalize___left,
    horizontalize___right,
    list_reset
}