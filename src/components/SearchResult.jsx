/** @jsxImportSource @emotion/react */
import { useSearchParams } from "react-router-dom"
import Cards from "../components/cards/Cards"
import { resultSet } from "./others/result_css"
import {utilSet} from "./others/util_css"
import { useData } from "./ResourceProvider"
import { useEffect } from "react"



export default function SearchResult() {

    //=================DEFINITION==================//
    const [param, ] = useSearchParams()


    //===================IMPORT====================//
    const { searchCharacter, isLight, articles } = useData()


    //===============INITIALIZATION================//
    useEffect(() => {

        document.scrollingElement.scrollTop = 0 //画面が途中から始まる問題に対処
        
        if(param.get("q")){ 
            searchCharacter(param.get("q")) 
        }
    },[])
    

    return (
        <>
            <main className="result-wrapper"
                css={[
                    utilSet.verticalize,
                    {gap:"1rem",width:"100%",marginBottom:"100px"},
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
                        <Cards 
                            grid 
                            themes={
                                theme => ({
                                    boxShadow: isLight ? theme.shadow.light : theme.shadow.default
                                })
                            }
                        />
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