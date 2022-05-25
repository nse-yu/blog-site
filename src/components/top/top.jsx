/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import Footer from "../footer/footer"
import Header from "../header/header"
import { topSet } from "../../css/top/top_css"
import ResourceProvider, { useResource } from "../ResourceProvider"
import Card from "../card/card"
import { utilSet } from "../../css/util_css"
import { useEffect } from "react"

export default function Top() {
    //=============imported props============//
    const {height,articles,side,resetCurrentArticle} = useResource()

    //==========マウント時の初期化==========//
    useEffect(() => {
        resetCurrentArticle()
    })

    return (
        <>
            <Header />
            <main css={[
                topSet.top_all,
                {marginTop:height}
            ]}>
                <section
                    className="top_cards"
                    css={[
                        topSet.top_cards
                    ]}
                >
                {
                    Object.keys(articles).map(key => (
                        <Card key={key} article={articles[key]} />
                    ))
                }
                </section>
                <aside css={topSet.top_side_all}>
                    <nav
                        css={[topSet.top_side_box,utilSet.verticalize,topSet.top_side_box__el,utilSet.horizontalize___left]}
                    >
                        <div>
                            <h3>おすすめサイト</h3>
                        </div>
                        <ul>
                            {
                                side.map((item,idx) => (
                                    <li key={idx}>{item}</li>
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
            </main>
            <Footer />
        </>
    )
}