/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { utilSet } from "../../../css/util_css"
import { headerSet } from "../../../css/header/header_css"
import { motion } from "framer-motion"
import { useEffect } from "react"


export default function EditHeader({info,setheight}) {
    useEffect(() => {
        //ヘッダー高さを取得し、マージン調整
        setheight(info.current.getBoundingClientRect().height)
    },[])

    return (
        <>
            <header 
            css={[
                headerSet.header_all,
                utilSet.verticalize,
                utilSet.head_foot_opacity
            ]}
            ref={info}>
                <div className="header-up" css={headerSet.header_up_all}>
                    <div className="header-up__logo">
                        <a href="/">
                            <svg width="400px" height="50px" viewBox="200 0 400 100" strokeLinecap="round" strokeLinejoin="round">
                                <motion.path
                                    d="
                                    M 10 80 V 10 L 60 80 V 10
                                    M 80 80 L 110 10 L 140 80 M 130 60 H 90
                                    M 210 25 A 30 40 0 0 0 160 30 A 40 40 0 0 0 170 75 A 26 28 0 0 0 211 50 H 190
                                    M 250 50 L 260 65 L 270 50 M 260 80 V 65
                                    M 290 50 V 70 A 10 10 0 0 0 310 70 V 50
                                    M 10 80 H 400
                                    "
                                    stroke="#ffffff"
                                    strokeWidth="4"
                                    fill="none"
                                    initial={{filter:"drop-shadow(3px 3px 10px black)"}}
                                    animate={{filter:"drop-shadow(4px 6px 5px white)"}}
                                    transition={{duration:0.7,repeat:"Infinity",repeatType:"reverse"}}
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </header>
        </>
    )
}