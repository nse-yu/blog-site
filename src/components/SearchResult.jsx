/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Cards from "../components/cards/Cards"
import { resultSet } from "./others/result_css"
import {utilSet} from "./others/util_css"
import { useResource } from "./ResourceProvider"

export default function SearchResult() {
    const [param,] = useSearchParams()
    const {searchCharacter,isLight,articles} = useResource()

    useEffect(() => {
        console.log("resultParam: ",param.get("q"))
        console.log("resultArticles: ",articles)
        if(!param.get("q")) return
        searchCharacter(param.get("q"))
    },[param])

    return (
        <>
        {console.log("SearchResult")}
            <main className="result-wrapper"
                css={[
                    utilSet.verticalize,
                    {gap:"1rem",width:"100%"},
                    theme => ({
                        color: isLight ? theme.text.default : theme.text.light
                    })
                ]}
            >
                <div className="result-info">
                    <h2 className="result-info_matchText">{param.get("q")} で検索した結果</h2>
                </div>
                {
                    Object.keys(articles).length ? (
                        <Cards grid/>
                    )
                    :
                    (
                        <h1 className="result-notfound"
                            css={[resultSet.result_notfound]}
                        >
                            NOT FOUND
                        </h1>
                    )
                }
            </main>
        </>
    )
}