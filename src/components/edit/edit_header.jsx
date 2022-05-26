/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { utilSet } from "../others/util_css"
import { headerSet } from "../header/header_css"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { btnSet } from "../others/btn_css"


export default function EditHeader({info,setheight,methods}) {
    //==================USE EFFECT=================//
    //only first mounted
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
                    utilSet.head_foot_opacity,
                    headerSet.header___minimize
                ]}
                ref={info}
            >
                <div className="header-up" css={headerSet.header_up_all}>
                    <div className="header-up__logo">
                        <a href="/">
                            <svg width="250px" height="30px" viewBox="200 0 400 100" strokeLinecap="round" strokeLinejoin="round">
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
                    <div className="header-up__edit-options" css={utilSet.horizontalize}>
                        <motion.div className="btn btn__open"
                            css={[btnSet.btn,btnSet.btn___new]}
                            whileHover={{opacity:0.5}}
                        >
                            <button onClick={methods.newfile}>新規作成</button>
                        </motion.div>
                        <motion.div className="btn btn__open"
                            css={[btnSet.btn,btnSet.btn___open]}
                            whileHover={{opacity:0.5}}
                        >
                            <button onClick={methods.open}>開く</button>
                        </motion.div>
                        <motion.div className="btn btn__reset"
                            css={[btnSet.btn,btnSet.btn___reset]}
                            whileHover={{opacity:0.5}}
                        >
                            <button onClick={methods.reset}>破棄</button>
                        </motion.div>
                        <motion.div className="btn btn__submit"
                            css={[btnSet.btn,btnSet.btn___submit]}
                            whileHover={{opacity:0.5}}
                        >
                            <button onClick={methods.submit}>投稿</button>
                        </motion.div>
                    </div>
                </div>
            </header>
        </>
    )
}