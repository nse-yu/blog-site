/** @jsxImportSource @emotion/react */
import { jsx,css, ThemeProvider } from "@emotion/react"
import Footer from "../footer/footer"
import Header from "../header/header"
import LightHeader from "../header/lightHeader"
import { topSet } from "../top/top_css"
import ResourceProvider, { useResource } from "../ResourceProvider"
import { useEffect } from "react"
import { Outlet, useParams, useSearchParams } from "react-router-dom"
import { useLayoutEffect } from "react"
import { createBrowserHistory } from "history"

/**tabNameには、Linkからcategory/へのアクセス時に値が入る
 * articleIDには、Linkからarticle/へのアクセス時に値が入る
 */
export default function Top() {
    //===================IMPORT====================//
    const {
        height,
        resetCurrentArticle,
        onTabSelected,
        tabs_json,
        article,
        activeTab,
        activeTabChanged,
        isLight,
        searchWord
    } = useResource()
    const {articleID,tabName} = useParams(0) // article,categoryそれぞれのマッチング変数

    //==================DEFINITION==================//
    //queryparams
    const [params,setParams] = useSearchParams()
    //history
    const history = createBrowserHistory()

    //==================USE EFFECT=================//
    useLayoutEffect(() => { //card選択（onclick） -> 現在active状態のtabをquery paramに追加 ##記事閲覧ページでactive状態のtabを判別するため
        if(!article) return
        activeTabChanged(history.location.state.tag)
    },[article])

    useLayoutEffect(() => { //search文字列をパラメータに格納する
        if(!searchWord) return
        setParams({q:searchWord})
    },[searchWord])

    useEffect(() => { //記事閲覧ページ以外では、articleが未選択であることの保証
        if(articleID) return
        resetCurrentArticle()
    })
    
    useEffect(() => { //urlで指定されたcategoryと表示されているタブの状態を同期する
        if(params.get("q") || searchWord) return //searchWordがparamsに入っていることが確定的ではないため、searchWord

        if(!tabName && !articleID){ //index(/)へのアクセス時、リダイレクト制御
            window.location = "/category/"+tabs_json[0].name
        }
        tabs_json.forEach(row => {
            if(row.name === tabName){ //カテゴリ名からidを取得するため
                onTabSelected({id:row.id,name:tabName})
                return
            }
        })
    },[tabName,articleID,params])

    useEffect(() => { //画面をトップから始める
        document.scrollingElement.scrollTop = 0 //画面が途中から始まる問題に対処
    })
    //=========TEST=========//
    useEffect(() => {
        console.log("Top")
    })

    return (
        <>
            {!params.get("q") ? 
                (   
                <Header 
                    themes={theme => ({
                        background: isLight ? theme.headerBack.light : theme.headerBack.default,
                        fill : isLight ? theme.fill.light : theme.fill.default
                    })}
                    svgThemes={theme => ({
                        stroke: isLight ? theme.fill.light : theme.fill.default,
                    })}
                    tabThemesOn={theme => ({
                        color: isLight ? theme.background.default : theme.background.light,
                        backgroundColor: isLight ? theme.background.light : theme.background.default
                    })}
                    tabThemesOff={theme => ({
                        color: isLight ? theme.background.light : theme.background.default,
                        backgroundColor: isLight ? theme.background.default : theme.background.light
                    })}
                />)
                :
                (<LightHeader 
                    themes={theme => ({
                        background: isLight ? theme.headerBack.light : theme.headerBack.default,
                        fill : isLight ? theme.fill.light : theme.fill.default
                    })}
                    svgThemes={theme => ({
                        stroke: isLight ? theme.fill.light : theme.fill.default,
                    })}
                    tabThemesOn={theme => ({
                        color: isLight ? theme.background.default : theme.background.light,
                        backgroundColor: isLight ? theme.background.light : theme.background.default
                    })}
                    tabThemesOff={theme => ({
                        color: isLight ? theme.background.light : theme.background.default,
                        backgroundColor: isLight ? theme.background.default : theme.background.light
                    })}
                />)
            }
            <main 
                className="top-main__wrapper"
                css={[
                    topSet.top_all, 
                    {marginTop:height},
                    {padding:article ? 0 : "1rem"},
                    theme => ({
                        background: isLight ? theme.background.light : theme.background.default
                    })
                ]}
            >
                <Outlet />
            </main>
            <Footer themes={
                theme => ({
                    color: isLight ? theme.text.default : theme.text.light,
                    backgroundColor: isLight ? theme.background.light : theme.background.default,
                    fill: isLight ? theme.fill.light : theme.fill.default,
                    borderColor: isLight ? theme.border.light : theme.border.default,
                })
            }/>
        </>
    )
}
