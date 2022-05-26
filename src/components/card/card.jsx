/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { cardSet } from "./card_css"
import {motion} from "framer-motion"
import { Link } from "react-router-dom"
import LoadedImg from "../img/Img"
import { useResource } from "../ResourceProvider"

export default function Card({article,edittable=false}) {
    const {setCurrentArticle} = useResource()
    return (
        <>
            <motion.article 
                whileHover={{opacity:0.6}}
                css={[
                    cardSet.card_wrapper
                ]}
                onPan={e => {e.preventDefault()}}
            >
                <Link 
                    to={edittable ? `/edit` : `/article`} 
                    css={{height:"100%"}} 
                    onClick={() => {setCurrentArticle(article)}}
                >
                    <figure css={{height:"inherit"}}>
                        <LoadedImg
                            style_css={[
                                cardSet.card_img
                            ]}
                            url={article.imgURL} 
                        />
                        <div css={cardSet.card_text}>
                            <figcaption><h3>{article.title}</h3></figcaption>
                            <p 
                                className="card_text___toDesc"
                                css={cardSet.card_text___toDesc}
                            >{article.desc}</p>
                        </div>
                    </figure>
                </Link>
            </motion.article>
        </>
    )
}