import { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import tabs_json from "../tabs.json";

const context = createContext()
export const useResource = () => useContext(context)

export default function ResourceProvider({children}) {
    //==================DEFINITION==================//
    //ref
    const headerInfo = useRef()

    //state
    const [activeTab,setActiveTab] = useState(tabs_json[0])
    const [height,setHeight] = useState()
    const [articles,setArticles] = useState({})
    const [article,setArticle] = useState({})
    
    //==================USE EFFECT=================//
    //TODO:only first mounted[fetch set]
    useEffect(() => {
        setArticle({})
        fetch(`http://localhost:8080/article/all`,{
            mode:"cors"
        })
            .then(res => res.json())
            .then(res_json => setArticles(res_json))
            .then(console.log)
            .catch(console.error)
    },[])

    //=================SET STATES=================//
    //active-tab
    const onTabSelected = tab => {
        setActiveTab(() => tab)
        let fetchString = "http://localhost:8080/" + 
            (activeTab.id === 1 ? "article/all" : "tag/"+activeTab.id)
        fetch(fetchString)
            .then(res => res.json())
            .then(res_json => setArticles(res_json))
            .then(console.log)
            .catch(console.error)
    }

    //height
    const headerHeight = current => {
        setHeight(() => current)
    }

    //article
    const setCurrentArticle = current => {
        console.log("current selected article: changed",current)
        setArticle(() => current)
    }

    //================EVENTS TO PASS===============//
    //reset article
    const resetCurrentArticle = () => {
        console.log("current selected article: cleared")
        setArticle(() => {})
    }
    
    //==================UTILITY====================//
    function distinctObjByTags(objs,tags=[]){
        return Array(...objs).filter((entry,i) => {
            let bools = []
            Array(...objs).slice(i+1).forEach(obj => {
                tags.forEach(tag => {
                    bools.push(entry[tag] === obj[tag]) //entryが残りのentryと同じプロパティを持っているかどうか
                })
            })
            return !bools.includes(true)
        })
    }

    //=================ALL TO PASS=================//
    const values = {
        tabs_json, //すべてのタブ情報
        activeTab, //stateで管理された、選択中のタブ情報
        onTabSelected, //タブ選択時（クリック時）のコールバック
        headerInfo, //headerへの参照を保持するインスタンス
        height, //headerの高さを保持するstate
        headerHeight, //headerの高さstateを変更するコールバック
        articles, //取得した記事すべて
        setCurrentArticle,
        resetCurrentArticle,
        article,
        distinctObjByTags
    }

    return (
        <context.Provider 
            value={values}
        >
            {children}
        </context.Provider>
    )
}