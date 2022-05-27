/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { topSet } from "../top/top_css"
import Card from "../card/card"
import { useResource } from "../ResourceProvider"
import {motion} from "framer-motion"
import { editSet } from "../edit/edit_css"

export default function Cards({grid=true,edit=false,pan}) {
    const {articles} = useResource()

    return (
        <>
        {console.log(articles)}
            <motion.section
                className="top_cards"
                css={
                    grid ? topSet.top_cards : [topSet.top_cards___horizontalize,editSet.scrollbar_style]               
                }
                onPan={pan}
            >
                {
                    Object.keys(articles).map(key => (
                        <Card key={key} edittable={edit} article={articles[key]} />
                    ))
                }
                </motion.section>
        </>
    )
}