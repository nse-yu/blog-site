/** @jsxImportSource @emotion/react */
import { utilSet } from "../others/util_css"
import { headerSet } from "../header/header_css"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"
import { btnSet } from "../others/btn_css"
import { useData } from "../ResourceProvider"
import { useState } from "react"
import { navSet } from "../nav/nav_css"


export default function EditHeader({methods,prev_follow}) {

    //==================IMPORT====================//
    const {
        article,
        headerInfo,
        onHeightChanged
    } = useData()


    //=================DEFINITION==================//

    //state
    const [isMenuOpen, toggleMenuOpen] = useState(false)


    //==================USE EFFECT=================//
    //only first mounted
    useEffect(() => {

        window.addEventListener("resize",() => {
            onHeightChanged(headerInfo.current.getBoundingClientRect().height)
        })
       
        //ヘッダー高さを取得し、マージン調整
        onHeightChanged(headerInfo.current.getBoundingClientRect().height)
        
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
                ref={headerInfo}
            >
                <div className="header-up" css={[headerSet.header_up_all,headerSet.header_up_all___edit]}>
                    <div className="header-up__logo" css={headerSet.header_logo__el}>
                        <a href="/">
                            <svg width="100px" height="30px" viewBox="0 0 350 100" strokeLinecap="round" strokeLinejoin="round">
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
                                css={{
                                    filter:"drop-shadow(1px 1px 1px #ffffff)",
                                    fontFamily: "'Kiwi Maru', serif",
                                    backfaceVisibility:"hidden"
                                }}
                                style={{
                                    color:"#dc143c",
                                    opacity:1
                                }}
                                animate={{scale:0.95,opacity:0.3}}
                                transition={{duration:1.5,repeatType:"mirror",repeat:"Infinity"}}
                            >
                                タイトル「{article.title}」を編集中です...
                            </motion.p>
                        </div>
                    }
                    <div className="header-up__prev-following" 
                        css={[utilSet.verticalize,utilSet.verticalize___center,btnSet.toggle_btn_wrapper]}>
                        <p>プレビュー追従</p>
                        <div 
                            css={[utilSet.horizontalize,utilSet.verticalize___center,btnSet.toggle_btn_area]}
                            onClick={() => {methods.toggle()}}
                        >
                            <motion.div 
                                css={[prev_follow ? {backgroundColor:"#80ff00"}:{backgroundColor:"gray"},btnSet.toggle_btn]} 
                                initial={{x:0}}
                                animate={prev_follow ? {x:20} : {}}
                            />
                        </div>
                    </div>
                    <div className="header-up__edit-options" 
                        css={[headerSet.header_up_options___edit,utilSet.horizontalize]}>
                        {Object.keys(methods).filter(prop => prop !== "toggle").map(row => (
                            <motion.div className="btn"
                                key={methods[row][1]}
                                whileHover={{opacity:0.2,x:2}}
                            >
                                <button 
                                    css={[btnSet.btn,{background:"repeating-linear-gradient(0deg,#333333,white,#333333)"}]}
                                    onClick={methods[row][0]}
                                >
                                    {methods[row][1]}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                    <div className="header-up__when-smartphone"
                        onClick={() => toggleMenuOpen(!isMenuOpen)}
                        css={{display:"none"}}
                    >
                        <motion.svg 
                            css={{pointerEvents:"none"}}
                            initial={{opacity:1}}
                            whileHover={{opacity:0.4}}
                            width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                        </motion.svg>
                    
                        <AnimatePresence>
                            {
                            isMenuOpen && (
                                <motion.nav
                                    className="header-up__nav-wrapper"
                                    css={{height:"100vh",width:"50%",position:"absolute",backgroundColor:"rgba(97, 97, 97, 0.875)",top:0,right:0,display:"none"}}
                                    initial={{x:9000}}
                                    animate={{x:0}}
                                    transition={{duration:0.5}}
                                    exit={{x:9000}}
                                >
                                    <ul css={[
                                        utilSet.horizontalize,
                                        utilSet.verticalize,
                                        navSet.nav_list___dot
                                    ]}>
                                        <button
                                            css={{textAlign:"left"}}
                                        >
                                            <motion.svg
                                                onClick={() => {toggleMenuOpen(!isMenuOpen)}}
                                                whileHover={{scale:1.3,stroke:"red"}}
                                                width="50"
                                                height="50"
                                                viewBox="0 0 50 50"
                                                fill="none"
                                                strokeLinecap="round"
                                                stroke="black"
                                            >
                                                <path
                                                    css={{pointerEvents:"none"}}
                                                    d="M 10 10 L 30 30 M 30 10 L 10 30"></path>
                                            </motion.svg>
                                        </button>
                                        <div className="preview-following"
                                            css={[utilSet.verticalize,utilSet.verticalize___center,btnSet.toggle_btn_wrapper]}>
                                            <p>プレビュー追従</p>
                                            <div
                                                css={[utilSet.horizontalize,utilSet.verticalize___center,btnSet.toggle_btn_area]}
                                                onClick={() => {methods.toggle()}}
                                            >
                                                <motion.div
                                                    css={[prev_follow ? {backgroundColor:"#80ff00"}:{backgroundColor:"gray"},btnSet.toggle_btn]}
                                                    initial={{x:0}}
                                                    animate={prev_follow ? {x:20} : {}}
                                                />
                                            </div>
                                        </div>
                                        <div className="edit-options">
                                            <ul css={utilSet.list_reset}>
                                                {Object.keys(methods).filter(prop => prop !== "toggle").map(row => (
                                                    <motion.li
                                                        key={methods[row][1]}
                                                        whileHover={{backgroundColor:"#d3d3d3"}}
                                                        css={{borderTop:"1px solid black"}}
                                                    >
                                                        <button
                                                            css={{width:"100%",color:"white"}}
                                                            onClick={methods[row][0]}
                                                        >
                                                            {methods[row][1]}
                                                        </button>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </ul>
                                </motion.nav>
                            )
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </header>
        </>
    )
}

/**closure機能によって、memo化でsubmit methodを保持すると誤動作を起こす */
/*(prev,next) => {
let bools = []
if(prev.length !== next.length) return false
for(let i of Array(Object.keys(prev).length)){
        bools.push(Object.keys(prev)[i]===Object.keys(next)[i])
    }
    return !bools.includes(false) //不一致のプロパティを持つならfalseを返す
}*/