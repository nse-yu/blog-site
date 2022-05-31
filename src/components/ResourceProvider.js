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
    const [height,setHeight] = useState()
    const [articles,setArticles] = useState(0)
    const [article,setArticle] = useState(0) //falsy狙いで0にする

    //==================USE EFFECT=================//
    //TODO:only first mounted[fetch set]
    useEffect(() => {
        findAll()
    },[])

    //=================SET STATES=================//
    //active-tab
    const onTabSelected = tab => {
        let fetchString = "http://localhost:8080/" + (tab.id === 1 ? "article/all" : "tag/"+tab.id)
        
        fetch(fetchString)
            .then(res => res.json())
            .then(res_json => setArticles(() => res_json))
            .catch(console.error)
    }
    //height
    const headerHeight = current => {
        setHeight(() => current)
    }
    //article
    const setCurrentArticle = current => {
        setArticle(() => current)
    }
    //article
    const resetCurrentArticle = () => {
        setArticle(0)
    }
    //delArticle
    const deleteArticle = id => {
        console.log(id)
        if(!window.confirm("本当に削除してもよろしいですか？")) return
        fetch(`http://localhost:8080/article/${id}/delete`,{
            method:"delete"
        })
            .then(res => {
                if(res.ok) {
                    window.alert("削除が完了しました。")
                    findAll()
                }
            })
            .catch(err => console.log(err))
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
    function findByArticleId(ArticleID){
        return articles.filter(item => item.articleID === ArticleID)[0]
    }
    function findAll(){
        fetch(`http://localhost:8080/article/all`,{
            mode:"cors"
        })
            .then(res => res.json())
            .then(res_json => setArticles(res_json))
            .catch(console.error)
    }

    //=================ALL TO PASS=================//
    const values = {
        tabs_json, //すべてのタブ情報
        onTabSelected, //タブ選択時（クリック時）のコールバック
        headerInfo, //headerへの参照を保持するインスタンス
        height, //headerの高さを保持するstate
        headerHeight, //headerの高さstateを変更するコールバック
        articles, //取得した記事すべて
        setCurrentArticle,
        resetCurrentArticle,
        article,
        distinctObjByTags,
        findByArticleId,
        findAll,
        deleteArticle
    }

    return (
        <context.Provider 
            value={values}
        >
        {console.log("Provider")}
            {children}
        </context.Provider>
    )
}