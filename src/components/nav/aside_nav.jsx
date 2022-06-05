/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { topSet } from "../top/top_css";
import { utilSet } from "../others/util_css";
import { navSet } from "./nav_css";
import {motion} from "framer-motion"
import recommend from "../../recommend_site.json";
import { useResource } from "../ResourceProvider";
import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { btnSet } from "../others/btn_css";

export default function AsideNav({themes}) {
    //=================DEFINITION=================//
    //ref
    const ref_search = useRef()

    //==================IMPORT===================//
    const {distinctObjByTags,wordChanged} = useResource()
    

    return (
        <>
            {console.log("AsideNav")}
            <aside 
                css={[
                    topSet.top_side_all,
                ]}
            >
                <nav className="nav-content__sitelist"
                    css={[
                        navSet.nav_list,
                        utilSet.verticalize,
                        topSet.top_side_box__el,
                        utilSet.horizontalize___left,
                        themes
                    ]}
                >
                    <div className="nav-list__title" 
                        css={[
                            navSet.nav_list_title,
                            themes
                        ]}>
                        <h3>おすすめサイト</h3>
                    </div>
                    <ul>
                        {
                            distinctObjByTags(recommend,["classcode"]).map(obj => {
                                return (
                                    <li key={obj.classcode}>
                                        <ul className="nav-list__group" css={[navSet.nav_list_group]}>
                                            <li key={obj.class} className="group__title"><h2>{obj.class}</h2></li>
                                            {
                                                recommend.map(item => (
                                                    obj.classcode === item.classcode && (
                                                        <motion.li
                                                            key={item.id}
                                                            className="group__item"
                                                            whileHover={{scale:1.03,opacity:0.7}}
                                                        >
                                                            <motion.a target="_blank" rel="noopener noreferrer" href={item.url} whileHover={{color:"#ff0000"}}>{item.name}</motion.a>
                                                        </motion.li>
                                                    )
                                                ))
                                            }
                                        </ul>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <nav className="nav-content__media"
                    css={[
                        navSet.nav_list,
                        topSet.top_side_box,
                        utilSet.verticalize,
                        topSet.top_side_box__el,
                        themes
                    ]}
                >
                    <ul>
                        <li css={[utilSet.horizontalize,utilSet.horizontalize___left]}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="40" height="40" viewBox="0 0 24 24" 
                                css={themes}
                            >
                                <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm3.193 7c-1.586 0-2.872 1.243-2.872 2.777 0 .217.025.43.074.633a8.251 8.251 0 0 1-5.92-2.902c-.247.41-.389.887-.389 1.397 0 .963.507 1.813 1.278 2.311a2.94 2.94 0 0 1-1.301-.348v.036c0 1.345.99 2.467 2.304 2.723a2.98 2.98 0 0 1-1.298.047c.366 1.103 1.427 1.906 2.683 1.928a5.889 5.889 0 0 1-3.567 1.19c-.231 0-.46-.014-.685-.04A8.332 8.332 0 0 0 9.903 18c5.283 0 8.172-4.231 8.172-7.901 0-.12-.002-.24-.008-.36A5.714 5.714 0 0 0 19.5 8.302a5.869 5.869 0 0 1-1.65.437 2.8 2.8 0 0 0 1.263-1.536 5.87 5.87 0 0 1-1.824.674A2.915 2.915 0 0 0 15.193 7z"/>
                            </svg>
                            <a
                                className="twitter-timeline"
                                data-width="250"
                                data-height="400"
                                href="https://twitter.com/nagachon0000?ref_src=twsrc%5Etfw"
                            >
                                Tweets by nagachon0000</a>
                            <script src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                        </li>
                    </ul>
                </nav>
                <nav className="nav-content__search" 
                    css={[
                        navSet.nav_list,
                        utilSet.verticalize,
                        topSet.top_side_box__el,
                        utilSet.horizontalize___left,
                        themes
                    ]}
                >
                    <div css={utilSet.horizontalize}>
                        <Link 
                            css={[
                                btnSet.mini_btn
                            ]}
                            to="/search"
                            onClick={e => {
                                wordChanged(ref_search.current.value)
                            }}
                        >
                            <motion.svg 
                                //css={{pointerEvents:"none"}}
                                whileHover={{stroke:"#ff0000",scale:1.05}}
                                width="18" height="18" viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </motion.svg>
                        </Link>
                        <input 
                            type="search" 
                            ref={ref_search}
                            css={[
                                {borderBottom:"1px solid black",width:"80%"},
                                themes
                            ]}
                        />
                    </div>
                </nav>
            </aside>
        </>
    )
}