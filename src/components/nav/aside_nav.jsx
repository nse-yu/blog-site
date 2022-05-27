/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { topSet } from "../top/top_css";
import { utilSet } from "../others/util_css";
import { navSet } from "./nav_css";
import {motion} from "framer-motion"
import recommend from "../../recommend_site.json";
import { useResource } from "../ResourceProvider";

export default function AsideNav() {
    const {distinctObjByTags} = useResource()

    return (
        <>
            <aside css={topSet.top_side_all}>
                <nav
                    css={[navSet.nav_list,utilSet.verticalize,topSet.top_side_box__el,utilSet.horizontalize___left]}
                >
                    <div className="nav-list__title" css={navSet.nav_list_title}>
                        <h3>おすすめサイト</h3>
                    </div>
                    <ul>
                        {
                            distinctObjByTags(recommend,["classcode"]).map(obj => {
                                return ( 
                                    <ul key={obj.classcode} className="nav-list__group" css={[navSet.nav_list_group]}>
                                        <li className="group__title" key={obj.class}><h2>{obj.class}</h2></li>
                                        {
                                            recommend.map(item => (
                                                obj.classcode === item.classcode ? 
                                                    <motion.li 
                                                        className="group__item"
                                                        key={item.id}
                                                        whileHover={{scale:1.03,opacity:0.7}}
                                                    >
                                                        <a target="_blank" rel="noopener noreferrer" href={item.url}>{item.name}</a>
                                                    </motion.li>    
                                                    : 
                                                    (<></>)
                                            ))
                                        }
                                    </ul>
                                )
                            })
                        }
                    </ul>
                </nav>
                <nav
                    css={[navSet.nav_list,topSet.top_side_box,utilSet.verticalize,topSet.top_side_box__el]}
                >
                    <ul>
                        <li><a className="twitter-timeline" href="https://twitter.com/nagachon0000?ref_src=twsrc%5Etfw">Tweets by nagachon0000</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script></li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}