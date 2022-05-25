import { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import tabs_json from "../tabs.json";
import recommended from "../recommend_site.json";

const context = createContext()
export const useResource = () => useContext(context)

export default function ResourceProvider({children}) {
    //==============state of selected tab's instance===============//
    const [activeTab,setActiveTab] = useState(tabs_json[0])

    //==============state of header's height===============//
    const headerInfo = useRef()
    const [height,setHeight] = useState()
    
    //==============state of selected article=============//
    const [articles,setArticles] = useState({})
    const [article,setArticle] = useState({})

    //マウント時に記事取得//
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

    //===============properties(method)===============//
    const onTabSelected = tab => {
        setActiveTab(() => tab)
    }
    const headerHeight = current => {
        setHeight(() => current)
    }
    const setCurrentArticle = current => {
        console.log("current selected article: changed",current)
        setArticle(() => current)
    }
    const resetCurrentArticle = () => {
        console.log("current selected article: cleared")
        setArticle(() => {})
    }
    
    //=============provide to value=============//
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
        recommended
    }

    return (
        <context.Provider 
            value={values}
        >
            {children}
        </context.Provider>
    )
}