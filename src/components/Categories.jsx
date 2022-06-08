import Cards from "./cards/Cards"
import { useResource } from "./ResourceProvider"
import  AsideNav  from "../components/nav/aside_nav"
import { useEffect } from "react"

export default function Categories() {
    const {isLight} = useResource()

    //=========TEST=========//
    useEffect(() => {
        console.log("Categories")
    })

    return (
        <>
            <Cards 
                grid={true} 
                edit={false} 
                themes={
                    theme => ({
                        boxShadow: isLight ? theme.shadow.light : theme.shadow.default
                    })
                }
            />
            <AsideNav 
                themes={
                    theme => ({
                        color: isLight ? theme.text.light : theme.text.default,
                        backgroundColor: isLight ? theme.background.default : theme.background.light,
                        borderColor: isLight ? theme.border.default : theme.border.light,
                        fill: isLight ? theme.fill.default : theme.fill.light
                    })
                }
            />
        </>
    )
}