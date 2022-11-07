/** @jsxImportSource @emotion/react */
import { cardSet } from "./card_css"
import {AnimatePresence, motion} from "framer-motion"
import { Link } from "react-router-dom"
import LoadedImg from "../img/Img"
import { useData } from "../ResourceProvider"


export default function Card({
    article,
    edittable=false,
    del=false,
    delMethod = f => f,
    themes
}) {

    //===================IMPORT====================//
    const {
        onActiveTabChanged,
        activeTab,
        findTagById
    } = useData()

    function Del(e){
        delMethod(e.target.dataset.id)
    }


    return (
        <AnimatePresence>
            <motion.article 
                whileHover={{opacity:0.6}}
                css={[
                    cardSet.card_wrapper,
                    themes
                ]}
                onPan={e => {e.preventDefault()}}
            >
                {del && 
                    <span 
                        css={cardSet.cards___deletable}
                        onClick={Del}
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
                    to={
                        edittable ? 
                        {pathname:`/edit/${article.articleID}`} 
                        : 
                        {pathname:`/article/${article.articleID}`}
                    } 
                    state={{tag:activeTab}}
                    css={{height:"100%"}}
                    onClick={() => {

                        if(activeTab.id && activeTab.name) return 

                        let tag = findTagById(article.tagID) //activeTabが空の場合（検索から記事を閲覧した場合）に備える
                        onActiveTabChanged({id:article.tagID, name:tag[1]})

                    }}
                >
                    <figure css={{height:"inherit"}}>
                        <LoadedImg
                            style_css={[
                                cardSet.card_img
                            ]}
                            url={article.imgURL} 
                            motion_animate={del ? {}:{scale:1.1, opacity:0.6}}
                        />
                        <div css={cardSet.card_text}>
                            <figcaption>
                                <p css={{opacity:0.4,color:"white",fontSize:"0.6rem"}}>{article.lastUpdate}</p>
                                <h3>{article.title}</h3>
                            </figcaption>
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