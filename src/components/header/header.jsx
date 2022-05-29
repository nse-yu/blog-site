/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { utilSet } from "../others/util_css"
import { headerSet } from "../header/header_css"
import { useResource } from "../ResourceProvider"
import { motion } from "framer-motion"
import { navSet } from "../nav/nav_css"
import { useEffect } from "react"
import { Link } from "react-router-dom"


export default function Header() {
    const {headerInfo,headerHeight,tabs_json,onTabSelected,activeTab,article} = useResource()

    useEffect(() => {
        //ヘッダー高さを取得し、マージン調整
        headerHeight(headerInfo.current.getBoundingClientRect().height)
    },[])

    //================callbacks==================//
    function tabClicked(e) {
        if(article) return
        onTabSelected({id:parseInt(e.target.dataset.id),name:e.target.dataset.name})
    }

    return (
        <header 
        css={[
            headerSet.header_all,
            utilSet.verticalize,
            utilSet.head_foot_opacity
        ]}
        ref={headerInfo}>
            <div className="header-up" css={headerSet.header_up_all}>
                <div className="header-up__nav" css={{display:"none"}}>
                    <svg 
                        width="31" 
                        height="31" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#ffffff" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </div>
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
            <div className="header-down" css={headerSet.header_down}>
                <nav className="nav-tab" css={navSet.nav_all}>
                    <ul css={[navSet.nav_tab]}>
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