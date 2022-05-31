/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { cardSet } from "./card_css"
import {AnimatePresence, motion} from "framer-motion"
import { Link } from "react-router-dom"
import LoadedImg from "../img/Img"
import { useResource } from "../ResourceProvider"

export default function Card({article,edittable=false,del=false}) {
    const {deleteArticle} = useResource()

    return (
        <AnimatePresence>
            <motion.article 
                whileHover={{opacity:0.6}}
                css={[
                    cardSet.card_wrapper
                ]}
                onPan={e => {e.preventDefault()}}
            >
                {del && 
                    <span 
                        css={cardSet.cards___deletable}
                        onClick={e => {deleteArticle(e.target.dataset.id)}}
                        data-id={article.articleID}
                    >
                        <motion.svg
                            whileHover={{
                                stroke:"#ff0000",
                                scale:1.7
                            }} 
                            whileTap={{pointerEvents:"none"}}
                            width="27" 
                            height="27" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="#ffffff" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                        </motion.svg>
                    </span>
                }
                <Link 
                    to={edittable ? `/edit/${article.articleID}` : `/article/${article.articleID}`} 
                    css={{height:"100%"}}
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
        </AnimatePresence>
    )
}