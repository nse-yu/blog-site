/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import Footer from "../footer/footer"
import Header from "../header/header"
import { topSet } from "../top/top_css"
import ResourceProvider, { useResource } from "../ResourceProvider"
import { useEffect } from "react"
import AsideNav from "../nav/aside_nav"
import Cards from "../cards/Cards"
import { useParams } from "react-router-dom"

export default function Top() {
    //===================IMPORT====================//
    const {height,resetCurrentArticle,onTabSelected,tabs_json} = useResource()
    const {tabID} = useParams(0)

    //==================USE EFFECT=================//
    //when mounted[reset]
    useEffect(() => {
        resetCurrentArticle()
    })
    //when first mounted and tabID changed
    useEffect(() => {
        if(!tabID) return 
        tabs_json.forEach(row => {
            if(row.id === parseInt(tabID)){
                onTabSelected({id:parseInt(tabID),name:row.name})
                return
            }
        })
    },[tabID])

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