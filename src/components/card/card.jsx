/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { cardSet } from "../../css/card/card_css"
import {motion} from "framer-motion"

export default function Card({title,imgURL}) {
    console.log(imgURL)
    return (
        <>
            <motion.article 
                whileHover={{opacity:0.6}}
                css={[
                    cardSet.card_wrapper
                ]}
            >
                <a href="" css={{height:"100%"}}>
                    <figure css={{height:"inherit"}}>
                        <img 
                            css={[
                                cardSet.card_img
                            ]}
                            src={`http://localhost:8080/img/${imgURL}`} 
                            alt={title} 
                        />
                        <figcaption css={{color:"white",padding:5}}>{title}</figcaption>
                    </figure>
                </a>
            </motion.article>
        </>
    )
}