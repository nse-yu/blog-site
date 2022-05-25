/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import Footer from "../footer/footer"
import Header from "../header/header"
import { topSet } from "../top/top_css"
import ResourceProvider, { useResource } from "../ResourceProvider"
import Card from "../card/card"
import { useEffect } from "react"
import AsideNav from "../nav/aside_nav"

export default function Top() {
    //=============imported props============//
    const {height,articles,resetCurrentArticle} = useResource()

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
                <AsideNav />
            </main>
            <Footer />
        </>
    )
}