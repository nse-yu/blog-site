/** @jsxImportSource @emotion/react */
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
                src={`http://localhost:5000/img/${encodeURI(url)}`}
                alt={url}
                data-url={url}
                onClick={clicked}
            /> 
        </>
    )
}