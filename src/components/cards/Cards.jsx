/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { topSet } from "../top/top_css"
import Card from "../card/card"
import { useResource } from "../ResourceProvider"
import {AnimatePresence, motion} from "framer-motion"

export default function Cards({grid=true,edit=false,pan,del=false,themes}) {
    const {articles} = useResource()

    return (
        <AnimatePresence>
            {console.log("Cards")}
            <motion.section
                className="top_cards"
                css={
                    grid ? topSet.top_cards : [topSet.top_cards___horizontalize]               
                }
                onPan={pan}
                initial={{x:-1000}}
                animate={{x:0}}
                transition={{duration:0.5}}
            >   
                {
                    Object.keys(articles).map(key => (
                        <Card 
                            key={key} 
                            edittable={edit} 
                            article={articles[key]} 
                            del={del}
                            themes={themes}    
                        />
                    ))
                }
                </motion.section>
        </AnimatePresence>
    )
}