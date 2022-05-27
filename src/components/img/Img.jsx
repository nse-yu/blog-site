/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { click } from "@testing-library/user-event/dist/click"
import { motion } from "framer-motion"

export default function LoadedImg({
    style_css,
    url,
    motion_animate={},
    motion_transition={},
    clicked = f => f
}) {
    return (
        <>
            <motion.img 
                whileHover={motion_animate}
                transition={motion_transition}
                css={[style_css]}
                src={`http://localhost:8080/img/${encodeURI(url)}`}
                alt={url}
                data-url={url}
                onClick={clicked}
            /> 
        </>
    )
}