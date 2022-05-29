/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { topSet } from "../top/top_css"
import Card from "../card/card"
import { useResource } from "../ResourceProvider"
import {AnimatePresence, motion} from "framer-motion"

export default function Cards({grid=true,edit=false,pan,del=false}) {
    const {articles} = useResource()

    return (
        <AnimatePresence>
            <motion.section
                className="top_cards"
                css={
                    grid ? topSet.top_cards : [topSet.top_cards___horizontalize]               
                }
                onPan={pan}
                layout
            >   
                {
                    Object.keys(articles).map(key => (
                        <Card key={key} edittable={edit} article={articles[key]} del={del}/>
                    ))
                }
                </motion.section>
        </AnimatePresence>
    )
}