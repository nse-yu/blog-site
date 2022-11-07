/** @jsxImportSource @emotion/react */
import Footer from "../footer/footer"
import Header from "../header/header"
import LightHeader from "../header/lightHeader"
import { topSet } from "../top/top_css"
import { useData, useDataDispatch } from "../ResourceProvider"
import { Outlet, useParams, useSearchParams } from "react-router-dom"
import { createBrowserHistory } from "history"
import { useEffect } from "react"


/**tabNameには、Linkからcategory/へのアクセス時に, articleIDには、Linkからarticle/へのアクセス時に値が入る*/
export default function Top() {

    //===================IMPORT====================//
    const {
        height,
        onTabSelected,
        tabs,
        article,
        onActiveTabChanged,
        findTagById,
        isLight,
    } = useData()

    const {
        dispatchArticle
    } = useDataDispatch()
    


    //==================DEFINITION==================//

    // article,categoryそれぞれのマッチング変数
    const {articleID, tabName}  = useParams(0) 

    // queryparams
    const [params,  ]           = useSearchParams()

    // history
    const history       = createBrowserHistory()

    const currentTab    = article ? findTagById(article.tagID) : ""


    //===============INITIALIZATION=================//

    // if access to root index(/), force a redirect to the category 0
    if(!tabName && !articleID && !params.get("q")){ 
        window.location = "/category/" + tabs[0].name 
    }

    
    //親コンポーネントの状態更新は、レンダリング後に行う必要があるため、副作用に実装
    useEffect(() => {

        // card選択（onclick） -> 現在active状態のtabをquery paramに追加 ##記事閲覧ページでactive状態のtabを判別するため
        if(article){ 
            onActiveTabChanged({id: currentTab[0], name:currentTab[1]}) 
        }

        // 記事閲覧ページ以外では、articleが未選択であることの保証
        if(!articleID) { 
            dispatchArticle(
                {type:"reset", data:{}}
            ) 
        }

        // get selected tab names from the url and set active tabs 
        tabs.forEach(row => {
            if(row.name === tabName){ //カテゴリ名からidを取得するため
                onTabSelected({id:row.id, name:tabName})
                return
            }
        })

    },[articleID, tabName, article])


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
