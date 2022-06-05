import { useCycle } from "framer-motion";
import { useContext } from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
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
    const [activeTab,setActiveTab] = useState(0)
    const [height,setHeight] = useState()
    const [articles,setArticles] = useState(0)
    const [article,setArticle] = useState("") //falsy狙いで0にする
    const [isLight,turnLight] = useCycle(false,true)
    const [searchWord,setSearchWord] = useState("")

    //==================USE EFFECT=================//
    useLayoutEffect(() => { //ここをlayoutにすると、SearchResultの副作用よりも早く実行されるため、searchCharacterで上書きできる
        findAll()
    },[])

    useEffect(() => {
        console.log("provider: ",articles)
    },[articles])

    //=================SET STATES=================//
    //指定したカテゴリに属するArticleを取得
    const onTabSelected = tab => {
        let fetchString = "http://localhost:8080/" + (tab.id === 1 ? "article/all" : "tag/"+tab.id)
        
        fetch(fetchString)
            .then(res => res.json())
            .then(res_json => setArticles(() => res_json))
            .catch(console.error)
        setActiveTab(tab)
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
        setArticle("")
    }
    //delArticle
    const deleteArticle = id => {
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
    //tabオブジェクトを挿入し、フォーカスしているタブを特定する
    const activeTabChanged = active => {
        setActiveTab(active)
    }
    //ライト・ダークモード切替
    const toggleIsLight = () => {
        turnLight()
    }
    //search character
    const searchCharacter = target => {
        console.log("provider: ",target)
        setSearchWord(target)
        fetch("http://localhost:8080/article/search?q="+encodeURI(target))
            .then(res => res.json())
            .then(res_json => {
                if(!res_json[0].articleID){ //一致記事がない場合は、一番目の要素プロパティがnullになって返される
                    setArticles({})
                    return
                }
                setArticles(res_json)
            })
            .catch(err => {
                console.log("res_json: none")
                setArticles({}) //ここで返却値nullをcatchしてArticlesを設定しようとしたが、thenで設定するのとで動作に違いがでるため断念
            })
    }
    const wordChanged = target => {
        setSearchWord(target)
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
        console.log("findAll")
        fetch(`http://localhost:8080/article/all`,{
            mode:"cors"
        })
        .then(res => res.json())
        .then(res_json => setArticles(res_json))
        .catch(console.error)
    }
    /**指定されたtagIDからtagIDとtagNameの配列を返す */
    const findTagById = id => {
        let tag = []
        tabs_json.forEach(row => {
            if(row.id === parseInt(id)){
                tag.push(id,row.name)
            }
        })
        return tag
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
        activeTab,
        distinctObjByTags,
        findByArticleId,
        activeTabChanged,
        findAll,
        toggleIsLight,
        deleteArticle,
        findTagById,
        isLight,
        searchWord,
        searchCharacter,
        wordChanged
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