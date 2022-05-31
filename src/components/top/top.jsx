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

export default function Top({defaultTab}) {
    //==================DEFINITION==================//
    //variable
    const page_id = "top"

    //===================IMPORT====================//
    const {height,resetCurrentArticle,onTabSelected,tabs_json} = useResource()
    const {tabName} = useParams(0)

    //==================USE EFFECT=================//
    //when every mounted[reset]
    useEffect(() => {
        resetCurrentArticle()
    })
    //when first mounted and tabID changed
    useEffect(() => { 
        let activeName = tabName ? tabName : defaultTab
        tabs_json.forEach(row => {
            if(row.name === activeName){
                onTabSelected({id:row.id,name:activeName})
                return
            }
        })
    },[tabName])

    return (
        <>
            {console.log("Top")}
            <Header />
            <main 
                className="top-main__wrapper"
                css={[
                    topSet.top_all,
                    {marginTop:height}
                ]}
            >
                <Cards grid={true} edit={false}/>
                <AsideNav />
            </main>
            <Footer />
        </>
    )
}