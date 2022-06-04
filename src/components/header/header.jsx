/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { utilSet } from "../others/util_css"
import { btnSet } from "../others/btn_css"
import { headerSet } from "../header/header_css"
import { useResource } from "../ResourceProvider"
import { AnimatePresence, motion } from "framer-motion"
import { navSet } from "../nav/nav_css"
import { useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
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

export default function Header({themes,svgThemes,tabThemesOn,tabThemesOff}) {
    const {headerInfo,headerHeight,tabs_json,article,activeTab,toggleIsLight,isLight} = useResource()
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
        if(!isNavOpen) return
        setIsNavOpen(!isNavOpen)
        if(article) return
    }

    return (
        <header 
            css={[
                headerSet.header_all,
                utilSet.verticalize,
                utilSet.head_foot_opacity,
                themes
            ]}
            ref={headerInfo}
        >
            {console.log("Header")}
            <AnimatePresence>
                {
                    isNavOpen && (
                        <motion.nav
                            className="header-up__nav-wrapper"
                            css={{height:"100vh",width:"50%",position:"absolute",backgroundColor:"rgba(97, 97, 97, 0.875)",top:0,left:0,display:"none"}}
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
                                    <NavLink 
                                        className="nav-tab__item" 
                                        key={index}
                                        onClick={tabClicked}
                                        style={({isActive}) => { 
                                            return (isActive || parseInt(activeTab.id) === item.id) ? 
                                                {backgroundColor:"black",color:"white",textDecoration:"none"}
                                                :
                                                {backgroundColor:"#f8f8ff",color:"black",textDecoration:"none"}
                                        }}
                                        to={`/category/${item.name}`}
                                    >
                                        <motion.li
                                            whileHover={{opacity:0.3}}
                                            data-id={item.id}
                                            data-name={item.name}
                                        >
                                            {item.name}
                                        </motion.li>
                                    </NavLink>
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
                        css={svgThemes}
                        initial={{opacity:1}}
                        whileHover={{opacity:0.3}}
                        transition={{duration:0.4}}
                        width="31" 
                        height="31" 
                        viewBox="0 0 24 24" 
                        fill="none" 
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
                        <svg width="200px" height="35px" viewBox="0 0 200 50" strokeLinecap="round" strokeLinejoin="round">
                            <motion.text
                                css={themes}
                                x="10"
                                y="45" 
                                fontSize="3.2rem"   
                                fontFamily="Varela Round, sans-serif"
                                initial={{filter:"drop-shadow(3px 3px 10px black)"}}
                                animate={{filter:"drop-shadow(4px 6px 5px white)"}}
                                transition={{duration:0.7,repeat:"Infinity",repeatType:"reverse"}}
                            >
                                NAG
                            </motion.text>
                            <motion.path
                                css={svgThemes}
                                d="
                                M 140 25 L 150 35 L 160 25 M 150 50 V 35
                                M 170 25 V 40 A 5 5 0 0 0 185 40 V 25
                                M 15 48 H 197
                                "
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
                    <div className="header-up__theme" 
                        css={[
                            utilSet.horizontalize,
                            utilSet.verticalize___center,
                            btnSet.toggle_btn_area,
                            btnSet.toggle_btn_area___long,
                            {backgroundColor: isLight ? "#ffcc99" : "rgb(198, 168, 255)",}
                        ]}
                        onClick={() => {toggleIsLight()}}
                    >
                        <motion.div 
                            css={[{
                                border: isLight ?  "1.5px solid #ff8000" : "1.5px solid #5731fe",
                                padding:1,
                                borderRadius:"50%"
                                },utilSet.horizontalize
                            ]}
                            initial={{x:0}}
                            animate={isLight ? {x:35} : {}}
                        >
                            <svg 
                                width="20" height="20" 
                                viewBox="0 0 24 24" 
                                fill="white" 
                                stroke={isLight ? "#ff8000" : "#5731fe"}
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            >
                            {isLight ? 
                                (<>
                                    <circle cx="12" cy="12" r="5"/>
                                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
                                </>) 
                                : 
                                (<>
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </>)
                            }    
                            </svg>
                        </motion.div>
                    </div>
                    <div className="header-up__github">
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/nse-yu?tab=repositories">
                            <motion.svg
                                css={svgThemes}
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
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
                                css={svgThemes}
                                width="34"
                                height="34"
                                viewBox="0 0 24 24"
                                fill="none"
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
                    <ul css={[utilSet.horizontalize,utilSet.list_reset]}>
                        {tabs_json.map((item,index) => (
                            <NavLink 
                                className="nav-tab__item" 
                                key={index}
                                onClick={tabClicked}
                                css={({isActive}) => { 
                                    return (isActive || parseInt(activeTab.id) === item.id) ? 
                                    tabThemesOn
                                    :
                                    tabThemesOff
                                }}
                                to={`/category/${item.name}`}
                            >
                                <motion.li
                                    whileHover={{opacity:0.3}}
                                    data-id={item.id}
                                    data-name={item.name}
                                >
                                    {item.name}
                                </motion.li>
                            </NavLink>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}