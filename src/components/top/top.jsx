/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import Footer from "../footer/footer"
import Header from "../header/header"
import { topSet } from "../top/top_css"
import ResourceProvider, { useResource } from "../ResourceProvider"
import { useEffect } from "react"
import AsideNav from "../nav/aside_nav"
import Cards from "../cards/Cards"

export default function Top() {
    //===================IMPORT====================//
    const {height,resetCurrentArticle} = useResource()

    //==================USE EFFECT=================//
    //when mounted[reset]
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
                <Cards grid={true} edit={false}/>
                <AsideNav />
            </main>
            <Footer />
        </>
    )
}