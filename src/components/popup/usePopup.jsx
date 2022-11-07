import { useRef, useState } from "react";

export default function usePopup(
    ok = f => f,
    cancel = f => f
){

    //================VARIABLES================//

    // pass to the root element showing the popup menu
    const rootRef   = useRef()
    const __ok      = ok
    const __cancel  = cancel
    const [isDisplayed, setIsDisplayed] = useState(false)


    // css attributes applied to elements
    const backAttr = {
        position: "fixed",
        zIndex: "9998",
        top: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)"
    }
    const popupAttr = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cacbe0",
        borderRadius: "2rem",
        gap: "3rem",
        padding: "2rem 3rem"
    }
    const messageAttr = {
        fontFamily: "'Zen Maru Gothic', sans-serif;"
    }
    const btnAreaAttr = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "2rem"
    }
    const btnAttr = {
        padding: "0.5rem 1rem",
        borderRadius: "2rem"
    }


    function display(message, onlyAlert = false){
        
        // create elements
        let back        = document.createElement("div")
        let popup       = document.createElement("div")
        let popMessage  = document.createElement("h2")
        let btnArea     = document.createElement("div")
        let okBtn       = createButtonFromTextAndListener("OK", __ok)
        let cancelBtn   = createButtonFromTextAndListener("CANCEL", __cancel)
        
        
        // apply css (and text)
        back.style.cssText              = makeCSSFromObject(backAttr)
        btnArea.style.cssText           = makeCSSFromObject(btnAreaAttr)
        popMessage.style.cssText        = makeCSSFromObject(messageAttr)
        okBtn.style.cssText             = makeCSSFromObject(Object.assign(btnAttr, {backgroundColor: "#1195d599"}))
        cancelBtn.style.cssText         = makeCSSFromObject(Object.assign(btnAttr, {backgroundColor: "#8080807a"}))
        popup.style.cssText             = makeCSSFromObject(popupAttr) 
        popMessage.innerText            = message

        
        // combine elements
        if(!onlyAlert)
            btnArea.appendChild(cancelBtn)
        btnArea.appendChild(okBtn)

        popup.appendChild(popMessage)
        popup.appendChild(btnArea)

        back.appendChild(popup)

        rootRef.current.appendChild(back)

        setIsDisplayed(true)
    }

    function destroy(){

        while(rootRef.current.firstChild){
            rootRef.current.removeChild(rootRef.current.firstChild)
        }

        setIsDisplayed(false)

    }

    function createButtonFromTextAndListener(message, f){

        let btn = document.createElement("button") 

        btn.textContent = message
        btn.addEventListener("click", f)

        btn.addEventListener("mouseover", () => {
            btn.style.opacity = 0.6
        })
        btn.addEventListener("mouseleave", () => {
            btn.style.opacity = 1
        })

        return btn
    }

    function makeCSSFromObject(o){
        
        let i = -1

        return Object.keys(o).reduce(
            (pre, cur) => pre + `${(i = containsUpper(cur)) > 0 ? cur.substring(0, i) + "-" + cur.charAt(i).toLowerCase() + cur.substring(i+1) : cur.toString()}: ${o[cur]};`, ""
            )

    }

    function containsUpper(text){
        
        return [...text].map((v, i) => v === v.toUpperCase() ? i : 0).reduce((p, c) => p + c, 0)

    }



    return [
        rootRef, 
        display,
        destroy,
        isDisplayed
    ]
}