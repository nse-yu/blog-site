/** @jsxImportSource @emotion/react */
import { topSet } from "../top/top_css";
import { utilSet } from "../others/util_css";
import { navSet } from "./nav_css";
import {motion} from "framer-motion"
import site from "../../site.json";
import { useData } from "../ResourceProvider";
import { useEffect, useRef } from "react";
import { Form } from "react-router-dom";


export default function AsideNav({themes}) {

    //==================IMPORT===================//
    const {
        distinctObjByTags, 
    } = useData()


    //=================DEFINITION=================//
    //ref
    const ref_search = useRef()


    useEffect(()=>{

        // scriptを読み込み
        const script = document.createElement('script');
        script.src = "https://platform.twitter.com/widgets.js";
        document.body.appendChild(script);
        

        // アンマウント時に一応scriptタグを消しておく
        return () => {
          document.body.removeChild(script);
        }

     }, [])


    return (
        <>
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
                            distinctObjByTags(site,["classcode"]).map(obj => {
                                return (
                                    <li key={obj.classcode}>
                                        <ul className="nav-list__group" css={[navSet.nav_list_group]}>
                                            <li key={obj.class} className="group__title"><h2>{obj.class}</h2></li>
                                            {
                                                site.map(item => (
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
                            <div css={[navSet.twitter_timeline__wrapper]}>
                                <h2 className="group__title">Twitter</h2>
                                <a 
                                    className="twitter-timeline" 
                                    href="https://twitter.com/nagachon0000?ref_src=twsrc%5Etfw"
                                    data-width="220" 
                                    data-height="400" 
                                    data-chrome="noscrollbar noheader transparent noborders"
                                >
                                    Tweets by nagachon0000
                                </a> 
                            </div>                
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
                    <div css={[utilSet.horizontalize, utilSet.verticalize___center]}>
                        <motion.svg 
                            width="18" height="18" viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </motion.svg>
                        <Form id="search-form" role="search" action="/search">
                            <input 
                                type="search" 
                                ref={ref_search}
                                css={[
                                    {borderBottom:"1px solid black",width:"100%"},
                                    themes
                                ]}
                                name="q"
                            />
                        </Form>
                    </div>
                </nav>
            </aside>
        </>
    )
}