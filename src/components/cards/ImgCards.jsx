/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { topSet } from "../top/top_css"
import {motion} from "framer-motion"
import LoadedImg from "../img/Img"
import { cardSet } from "../card/card_css"
import { utilSet } from "../others/util_css"
import { useState } from "react"
import { useLayoutEffect } from "react"
import { useEffect } from "react"

export default function ImgCards({
    imgs,
    grid=true,
    edit=false,
    pan,
    clicked,
    preUpload=false,
    changed = f => f
}) {
    //==================DEFINITION==================//
    //state
    const [uploadImg,setUploadImg] = useState("")

    //==================SET STATES==================//
    //when img has uploaded
    useEffect(() => {
        changed()
    },[uploadImg])

    //fetch
    const inputChanged = e => {
        if(!e.target.files[0]) return
        
        const data = new FormData()
        data.append("img",e.target.files[0])
        fetch("http://localhost:8080/img/upload",{
            method:"POST",
            mode:"cors",  
            body:data
        })
        .then(res => res.json())
        .catch(err => {console.log(err)})
        
        setUploadImg(e.target.files[0])
    }

    return (
        <>
            <motion.section
                className="top_cards"
                css={
                    grid ? topSet.top_cards : [topSet.top_cards___horizontalize]               
                }
                onPan={pan}
            >
                {preUpload && (
                    <>
                        <motion.div
                            whileHover={{scale:0.9,opacity:0.3}}  
                            transition={{duration:0.7}}                          
                            css={[
                                cardSet.card_img,
                                utilSet.horizontalize,
                                utilSet.horizontalize___center,
                                utilSet.verticalize___center,
                                {height:"100%",fontSize:0,backgroundColor:"white",border:"1px solid white",position:"relative"}]}
                        >
                            <motion.svg
                                css={{position:"absolute"}}
                                width="40" 
                                height="40" 
                                viewBox="0 0 40 40" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                strokeWidth="0.4"
                                stroke="black"
                            >
                                <path d="M 10 20 H 30 M 20 10 V 30"></path>
                            </motion.svg>
                            <input 
                                type="file" 
                                css={{width:"100%",height:"100%",opacity:0}}
                                onChange={inputChanged}
                            />
                        </motion.div>
                    </>
                )}
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