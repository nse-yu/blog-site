import { useCycle } from "framer-motion";
import { useContext, useReducer } from "react";
import { useRef } from "react";
import { useState } from "react";
import { createContext } from "react";
import tabs from "../tabs.json";


const dataContext       = createContext(null)
const dispatchContext   = createContext(null)
export const useData            = () => useContext(dataContext)
export const useDataDispatch    = () => useContext(dispatchContext)

// initialization flags to update variables once
let initOnce = false


export default function ResourceProvider({children}) {

    //==================DEFINITION==================//
    //ref
    const headerInfo = useRef()

    //state
    const [activeTab,setActiveTab]      = useState(0)
    const [height,setHeight]            = useState()
    const [articles,setArticles]        = useState(0)
    const [isLight,turnLight]           = useCycle(false,true)
    const [searchWord,setSearchWord]    = useState("")
    const [article, dispatchArticle]    = useReducer(articleReducer, "")


    //===============INITIALIZATION=================//
    if(!initOnce){ 
        initOnce = true
        findAll() 
    }

    //=================SET STATES=================//
    //articles, activeTab
    const onTabSelected = tab => {

        let fetchString = "http://localhost:5000/" + (tab.id === 1 ? "article/all" : "tag/"+tab.id)
        
        fetch(fetchString)
            .then(res => res.json())
            .then(res_json => setArticles(() => res_json))
            .catch(console.error)
            
        setActiveTab(tab)
    }

    //activeTab
    const onActiveTabChanged = active => {
        setActiveTab(active)
    }

    //height
    const onHeightChanged = current => {

        if(current == height){ return }
        
        setHeight(() => current)
    }

    
    //articles
    const deleteArticle = id => {

        fetch(`http://localhost:5000/article/${id}/delete`,{
            method:"delete"
        })
            .then(res => {
                if(res.ok) {
                    findAll()
                }
            })
            .catch(err => console.log(err))
    } 

    //isLight
    const toggleIsLight = () => {
        turnLight()
    }

    //articles
    function findAll(){
        fetch(`http://localhost:5000/article/all`,{
            mode:"cors"
        })
        .then(res => res.json())
        .then(res_json => {
            setArticles(res_json)
        })
        .catch(console.error)
    }


    //articles
    const searchCharacter = target => {

        wordChanged(target)

        fetch("http://localhost:5000/article/search?q="+encodeURI(target))
            .then(res => res.json())
            .then(res_json => {
                if(!res_json[0].articleID){ //一致記事がない場合は、一番目の要素プロパティがnullになって返される
                    setArticles({})
                    return
                }
                setArticles(res_json)
            })
            .catch(err => {
                setArticles({}) //ここで返却値nullをcatchしてArticlesを設定しようとしたが、thenで設定するのとで動作に違いがでるため断念
            })
    }

    //searchWord
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


    /**指定されたtagIDからtagIDとtagNameの配列を返す */
    const findTagById = id => {
        let tag = []
        tabs.forEach(row => {
            if(row.id === parseInt(id)){
                tag.push(id,row.name)
            }
        })
        return tag
    }


    //==================REDUCER=================//
    //article
    function articleReducer(article, action){
        switch(action.type){
            case 'set':{
                return action.data
            }
            case 'reset':{
                return ""
            }
        }
    }

    
    //=================ALL TO PASS=================//
    const data = {
        tabs, //すべてのタブ情報
        onTabSelected, //タブ選択時（クリック時）のコールバック
        headerInfo, //headerへの参照を保持するインスタンス
        height, //headerの高さを保持するstate
        onHeightChanged, //headerの高さstateを変更するコールバック
        articles, //取得した記事すべて
        article,
        activeTab,
        distinctObjByTags,
        findByArticleId,
        onActiveTabChanged,
        findAll,
        toggleIsLight,
        deleteArticle,
        findTagById,
        isLight,
        searchWord,
        searchCharacter,
        wordChanged
    }

    const dispatch = {
        dispatchArticle
    }

    return (
        <dataContext.Provider 
            value={data}
        >
        
            <dispatchContext.Provider
                value={dispatch}
            >
                {children}
            </dispatchContext.Provider>
            
        </dataContext.Provider>
    )
}