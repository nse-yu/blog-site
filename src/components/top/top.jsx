/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import Footer from "../footer/footer"
import Header from "../header/header"
import { topSet } from "../../css/top/top_css"
import ResourceProvider, { useResource } from "../ResourceProvider"
import { useState } from "react"
import { useEffect } from "react"
import Card from "../card/card"
import { utilSet } from "../../css/util_css"

export default function Top() {
    //=============imported props============//
    const {headerInfo,height,headerHeight} = useResource()

    //================tab state===============//
    const [articles,setArticles] = useState({})
    const side = ["side1","side2","side3","side4","side5"]

    //=============マウント時に記事取得==============//
    useEffect(() => {
        fetch(`http://localhost:8080/article/all`,{
            mode:"cors"
        })
            .then(res => res.json())
            .then(res_json => setArticles(res_json))
            .catch(console.error)
    },[])

    return (
        <>
            <Header info={headerInfo} setheight={headerHeight}/>
            <main css={[
                topSet.top_all,
                {marginTop:height}
            ]}>
                <section
                    className="top_cards"
                    css={[
                        topSet.top_grid_article
                    ]}
                >
                {
                    Object.keys(articles).map(key => (
                        <Card key={key} title={articles[key].title} imgURL={articles[key].imgURL}/>
                    ))
                }
                </section>
                <aside css={topSet.top_side_all}>
                    <nav
                        css={[topSet.top_side_box,utilSet.verticalize,topSet.top_side_box__el]}
                    >
                        <ul>
                            {
                                side.map((item,idx) => (
                                    <li>{item}</li>
                                ))
                            }
                        </ul>
                    </nav>
                    <nav
                        css={[topSet.top_side_box,utilSet.verticalize,topSet.top_side_box__el]}
                    >
                        <ul>
                            
                        </ul>
                    </nav>
                </aside>
            </main>
            <Footer />
        </>
    )
}