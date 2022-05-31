/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { utilSet } from "../others/util_css"
import { headerSet } from "../header/header_css"
import { useResource } from "../ResourceProvider"
import { AnimatePresence, motion } from "framer-motion"
import { navSet } from "../nav/nav_css"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"

const sidebar = {
    open: {
      transition: {
        type: "spring",
        stiffness: 10,
        restDelta: 2
      }
    },
    closed: {
      transition: {
        delay: 0.4,
        type: "spring",
        stiffness: 90,
        damping: 15
      }
    }
};

export default function Header() {
    const {headerInfo,headerHeight,tabs_json,onTabSelected,activeTab,article} = useResource()
    const [isNavOpen,setIsNavOpen] = useState(false)


    useEffect(() => {
        window.onresize = () => {
            console.log("resize")
            headerHeight(headerInfo.current.getBoundingClientRect().height)
        }
        //ヘッダー高さを取得し、マージン調整
        headerHeight(headerInfo.current.getBoundingClientRect().height)
    },[])

    //================callbacks==================//
    function tabClicked(e) {
        if(article) return
        onTabSelected({id:parseInt(e.target.dataset.id),name:e.target.dataset.name})
        if(!isNavOpen) return
        setIsNavOpen(!isNavOpen)
    }

    return (
        <header 
            css={[
                headerSet.header_all,
                utilSet.verticalize,
                utilSet.head_foot_opacity
            ]}
            ref={headerInfo}
        >
            {console.log("Header")}
            <AnimatePresence>
                {
                    isNavOpen && (
                        <motion.nav
                            css={{height:"100vh",width:"50%",position:"absolute",backgroundColor:"rgba(97, 97, 97, 0.875)",top:0,left:0}}
                            initial={{x:-1000}}
                            animate={{x:0}}
                            transition={{duration:0.5}}
                            exit={{x:-1000}}
                        >
                            <ul css={[
                                utilSet.horizontalize,
                                utilSet.verticalize,
                                navSet.nav_list___humberger
                            ]}>
                                {tabs_json.map((item,index) => (
                                    <motion.div 
                                        className="nav-tab__item" 
                                        key={index}
                                        onClick={tabClicked}
                                        style={item.id === activeTab.id ? {backgroundColor:"black",color:"white"} : {backgroundColor:"#f8f8ff"}}
                                        whileHover={{opacity:0.3,scaleY:1.1}}
                                    >
                                        <li
                                            data-id={item.id}
                                            data-name={item.name}
                                        >
                                            {!article ? 
                                                item.name 
                                                : 
                                                <Link 
                                                    css={
                                                        [
                                                        {textDecoration:"none",color:"black"},
                                                        item.id === activeTab.id ? {backgroundColor:"black",color:"white"} : {backgroundColor:"#f8f8ff"}
                                                        ]
                                                    }
                                                    to={`/tab/${item.id}`}
                                                >
                                                    {item.name}
                                                </Link>
                                            }
                                        </li>
                                    </motion.div>
                                ))}
                            </ul>
                        </motion.nav>
                    )
                }
            </AnimatePresence>
            <div className="header-up" css={headerSet.header_up_all}>
                <div className="header-up__nav" 
                    css={{display:"none",zIndex:3}}
                    onClick={() => setIsNavOpen(!isNavOpen)}
                >
                    <motion.svg 
                        whileHover={{stroke:"#ff0000"}}
                        width="31" 
                        height="31" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#ffffff" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        variants={sidebar}
                        animate={isNavOpen ? "open" : "closed"}
                    >
                        <motion.line 
                            variants={{
                                open:{x1:3, y1:6, x2:21, y2:18},
                                closed:{x1:3, y1:6, x2:21, y2:6}
                            }}
                        />
                        <motion.line 
                            x1="3" y1="12" x2="21" y2="12"
                            variants={{
                                open:{opacity:0},
                                closed:{opacity:1}
                            }}
                        />
                        <motion.line 
                            variants={{
                                open:{x1:3, y1:18, x2:21, y2:6},
                                closed:{x1:3, y1:18, x2:21, y2:18}
                            }}
                        />
                    </motion.svg>
                </div>
                <div className="header-up__logo">
                    <a href="/">
                        <svg width="200px" height="50px" viewBox="0 0 200 50" strokeLinecap="round" strokeLinejoin="round">
                            <motion.text
                                x="10"
                                y="45" 
                                fontSize="3.2rem"   
                                fill="white"
                                fontFamily="Varela Round, sans-serif"
                                initial={{filter:"drop-shadow(3px 3px 10px black)"}}
                                animate={{filter:"drop-shadow(4px 6px 5px white)"}}
                                transition={{duration:0.7,repeat:"Infinity",repeatType:"reverse"}}
                            >
                                NAG
                            </motion.text>
                            <motion.path
                                d="
                                M 140 25 L 150 35 L 160 25 M 150 50 V 35
                                M 170 25 V 40 A 5 5 0 0 0 185 40 V 25
                                M 10 48 H 400
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
                <div className="header-up__right"
                    css={[utilSet.horizontalize,utilSet.horizontalize___right,utilSet.verticalize___center]}    
                >
                    <div className="header-up__github">
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/nse-yu?tab=repositories">
                            <motion.svg
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{opacity:1}}
                                whileHover={{opacity:0.5}}
                            >
                                <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/>
                                <circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/>
                            </motion.svg>
                        </a>
                    </div>
                    <div className="header-up__edit">
                        <Link to={`/edit` + (article ? "/"+article.articleID : '')}>
                            <motion.svg
                                width="34"
                                height="34"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{opacity:1}}
                                whileHover={{opacity:0.6}}
                            >
                                <path
                                    d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"
                                />
                                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                            </motion.svg>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="header-down" css={headerSet.header_down}>
                <nav className="nav-tab" css={navSet.nav_all}>
                    <ul css={[utilSet.horizontalize]}>
                        {tabs_json.map((item,index) => (
                            <motion.div 
                                className="nav-tab__item" 
                                key={index}
                                onClick={tabClicked}
                                style={item.id === activeTab.id ? {backgroundColor:"black",color:"white"} : {backgroundColor:"#f8f8ff"}}
                                whileHover={{opacity:0.3}}
                            >
                                <li
                                    data-id={item.id}
                                    data-name={item.name}
                                >
                                    {!article ? 
                                        item.name 
                                        : 
                                        <Link 
                                            css={
                                                [
                                                {textDecoration:"none",color:"black"},
                                                item.id === activeTab.id ? {backgroundColor:"black",color:"white"} : {backgroundColor:"#f8f8ff"}
                                                ]
                                            }
                                            to={`/tab/${item.id}`}
                                        >
                                            {item.name}
                                        </Link>
                                    }
                                </li>
                            </motion.div>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}