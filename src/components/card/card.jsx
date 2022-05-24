/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { cardSet } from "../../css/card/card_css"
import {motion} from "framer-motion"

export default function Card({title,desc,imgURL}) {
    console.log("url: ",imgURL)
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
                            src={`http://localhost:8080/img/${encodeURI(imgURL)}`} 
                            alt={title} 
                        />
                        <div css={cardSet.card_text}>
                            <figcaption><h3>{title}</h3></figcaption>
                            <p 
                                className="card_text___toDesc"
                                css={cardSet.card_text___toDesc}
                            >{desc}</p>
                        </div>
                    </figure>
                </a>
            </motion.article>
        </>
    )
}