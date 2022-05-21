/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { useResource } from "../../../components/ResourceProvider";
import EditHeader from "../header/header";

export default function EditTop() {
    const {headerInfo,height,headerHeight} = useResource()

    return (
        <>
            <EditHeader info={headerInfo} setheight={headerHeight} />
            <main css={{marginTop:height}}>
                hoge
            </main>
        </>
    )
}