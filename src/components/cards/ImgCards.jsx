/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { topSet } from "../top/top_css"
import {motion} from "framer-motion"
import LoadedImg from "../img/Img"
import { cardSet } from "../card/card_css"

export default function ImgCards({imgs,grid=true,edit=false,pan,clicked}) {

    return (
        <>
            <motion.section
                className="top_cards"
                css={
                    grid ? topSet.top_cards : [topSet.top_cards___horizontalize]               
                }
                onPan={pan}
            >
                {
                    imgs.map(url => (
                        <LoadedImg 
                            style_css={[cardSet.cards_img]} 
                            key={url} 
                            url={url} 
                            clicked={clicked}
                            motion_animate={cardSet.cards_img__motion___animate}
                            motion_transition={cardSet.cards_img__motion___trans}
                        />
                    ))
                }
                </motion.section>
        </>
    )
}