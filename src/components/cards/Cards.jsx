/** @jsxImportSource @emotion/react */
import { topSet } from "../top/top_css"
import Card from "../card/card"
import { useData } from "../ResourceProvider"
import {AnimatePresence, motion} from "framer-motion"

export default function Cards({
    grid=true,
    edit=false,
    pan,
    del=false,
    delMethod = f => f,
    themes
}) {

    const {articles} = useData()
    
    return (
        <AnimatePresence>
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
                            delMethod={delMethod}
                            themes={themes}    
                        />
                    ))
                }
                </motion.section>
        </AnimatePresence>
    )
}