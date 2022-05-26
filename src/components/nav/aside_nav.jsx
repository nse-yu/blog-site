/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { topSet } from "../top/top_css";
import { utilSet } from "../others/util_css";
import { useResource } from "../ResourceProvider";
import { navSet } from "./nav_css";


export default function AsideNav() {
    const {recommended} = useResource()

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
                            recommended.map((item,idx) => (
                                <li key={idx}><a target="_blank" rel="noopener noreferrer" href={item.url}>{item.name}</a></li>
                            ))
                        }
                    </ul>
                </nav>
                <nav
                    css={[topSet.top_side_box,utilSet.verticalize,topSet.top_side_box__el]}
                >
                    <ul>
                        <li><a className="twitter-timeline" href="https://twitter.com/nagachon0000?ref_src=twsrc%5Etfw">Tweets by nagachon0000</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script></li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}