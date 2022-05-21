import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { createContext } from "react";
import tabs_json from "../tabs.json";

const context = createContext()
export const useResource = () => useContext(context)

export default function ResourceProvider({children}) {
    //==============state of selected tab's instance===============//
    const [activeTab,setActiveTab] = useState(tabs_json[0])
    //==============state of header's height===============//
    const headerInfo = useRef()
    const [height,setHeight] = useState()

    //===============properties(method)===============//
    const onTabSelected = tab => {
        setActiveTab(() => tab)
    }
    const headerHeight = current => {
        setHeight(() => current)
    }
    
    //=============provide to value=============//
    const values = {
        tabs_json, //すべてのタブ情報
        activeTab, //stateで管理された、選択中のタブ情報
        onTabSelected, //タブ選択時（クリック時）のコールバック
        headerInfo, //headerへの参照を保持するインスタンス
        height, //headerの高さを保持するstate
        headerHeight //headerの高さstateを変更するコールバック
    }

    return (
        <context.Provider 
            value={values}
        >
            {children}
        </context.Provider>
    )
}