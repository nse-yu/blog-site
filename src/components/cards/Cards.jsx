/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { topSet } from "../top/top_css"
import Card from "../card/card"
import { useResource } from "../ResourceProvider"

export default function Cards({grid=true,edit=false}) {
    const {articles} = useResource()
    return (
        <>
            <section
                className="top_cards"
                css={[
                    grid ? topSet.top_cards : topSet.top_cards___horizontalize                   
                ]}
            >
                {
                    Object.keys(articles).map(key => (
                        <Card key={key} edittable={edit} article={articles[key]} />
                    ))
                }
                </section>
        </>
    )
}