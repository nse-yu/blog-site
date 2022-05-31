/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import Footer from "../footer/footer"
import Header from "../header/header"
import { topSet } from "../top/top_css"
import ResourceProvider, { useResource } from "../ResourceProvider"
import { useEffect } from "react"
import { Outlet, useParams, useSearchParams } from "react-router-dom"
import { useLayoutEffect } from "react"

export default function Top() {
    //===================IMPORT====================//
    const {height,resetCurrentArticle,onTabSelected,tabs_json,article,activeTab,activeTabChanged} = useResource()
    const {tabName,articleID} = useParams(0)

    //==================DEFINITION==================//
    //variable
    const page_id = "top"
    //queryparams
    const [params,setParams] = useSearchParams()

    
    //==================USE EFFECT=================//
    //cardの選択に反応し、activeTabをパラメータに格納
    useLayoutEffect(() => {
        if(!article) return
        setParams(activeTab)
    },[article])

    useEffect(() => {
        if(!params) return 
        activeTabChanged({id:params.get("id"),name:params.get("name")})
    },[params])
    //when every mounted[reset]
    useEffect(() => {
        if(articleID) return
        resetCurrentArticle()
    })
    //when first mounted and tabID changed
    useEffect(() => { 
        if(!tabName && !articleID){ //初期のみ有効
            window.location = "/category/"+tabs_json[0].name
        }
        tabs_json.forEach(row => {
            if(row.name === tabName){
                onTabSelected({id:row.id,name:tabName})
                return
            }
        })
    },[tabName])
    //reset param
    useEffect(() => {
        if(articleID) return
        setParams(0)
    },[tabName])

    return (
        <>
            {console.log("Top")}
            <Header />
            <main 
                className="top-main__wrapper"
                css={[
                    topSet.top_all,
                    {marginTop:height},
                    {padding:article ? 0 : "1rem"}
                ]}
            >
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
