import { css } from "@emotion/react"

const verticalize = css`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
`
const horizontalize = css`
    display:flex;
    justify-content:space-between;
`
const head_foot_opacity = css`
    opacity:1
`


export const utilSet = {
    verticalize,
    horizontalize,
    head_foot_opacity
}