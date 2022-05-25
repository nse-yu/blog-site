/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"

export default function LoadedImg({style_css,url}) {
    return (
        <>
            <img 
                css={style_css}
                src={`http://localhost:8080/img/${encodeURI(url)}`}
                alt={url}
            /> 
        </>
    )
}