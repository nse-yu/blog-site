/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { utilSet } from "../others/util_css"
import { headerSet } from "../header/header_css"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { btnSet } from "../others/btn_css"
import { useResource } from "../ResourceProvider"


export default function EditHeader({methods}) {
    //==================IMPORT====================//
    const {article,headerInfo,headerHeight} = useResource()

    //==================USE EFFECT=================//
    //only first mounted
    useEffect(() => {
        window.addEventListener("resize",() => {
            headerHeight(headerInfo.current.getBoundingClientRect().height)
        })
       
        //ヘッダー高さを取得し、マージン調整
        headerHeight(headerInfo.current.getBoundingClientRect().height)
    },[])

    return (
        <>
            {console.log("EditHeader")}
            <header 
                css={[
                    headerSet.header_all,
                    utilSet.verticalize,
                    utilSet.head_foot_opacity,
                    headerSet.header___minimize
                ]}
                ref={headerInfo}
            >
                <div className="header-up" css={[headerSet.header_up_all,headerSet.header_up_all___edit]}>
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
                    {article &&
                        <div className="header-up__current-edit">
                            <motion.p 
                                style={{
                                    color:"#dc143c",
                                    filter:"drop-shadow(1px 1px 1px #ffffff)",
                                    fontFamily: "'Kiwi Maru', serif"
                                }}
                                animate={{scale:0.95,opacity:0.7,color:"#000000"}}
                                transition={{duration:1.5,repeatType:"mirror",repeat:"Infinity"}}
                            >
                                タイトル「{article.title}」を編集中です...
                            </motion.p>
                        </div>
                    }
                    <div className="header-up__edit-options" 
                        css={[headerSet.header_up_options___edit,utilSet.horizontalize]}>
                        <motion.div className="btn btn__open"
                            whileHover={{opacity:0.5}}
                        >
                            <button 
                                css={[btnSet.btn,btnSet.btn___new]}
                                onClick={methods.newfile}
                            >
                                新規作成
                            </button>
                        </motion.div>
                        <motion.div className="btn btn__open"
                            whileHover={{opacity:0.5}}
                        >
                            <button 
                                css={[btnSet.btn,btnSet.btn___open]}
                                onClick={methods.open}
                            >
                                開く
                            </button>
                        </motion.div>
                        <motion.div className="btn btn__reset"
                            whileHover={{opacity:0.5}}
                        >
                            <button 
                                css={[btnSet.btn,btnSet.btn___reset]}
                                onClick={methods.reset}
                            >
                                破棄
                            </button>
                        </motion.div>
                        <motion.div className="btn btn__submit"
                            whileHover={{opacity:0.5}}
                        >
                            <button 
                                css={[btnSet.btn,btnSet.btn___submit]}
                                onClick={methods.submit}
                            >
                                投稿
                            </button>
                        </motion.div>
                    </div>
                </div>
            </header>
        </>
    )
}