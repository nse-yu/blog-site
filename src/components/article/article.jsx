/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { articleSet } from "./article_css"
import { topSet } from "../top/top_css"
import { utilSet } from "../others/util_css"
import { markdownSet } from "../edit/markdown_css" 
import Header from "../header/header"
import LoadedImg from "../img/Img"
import Footer from "../footer/footer"
import AsideNav from "../nav/aside_nav"
import { useResource } from "../ResourceProvider"

export default function Article() {
    const {article} = useResource()
    const {height} = useResource()

    return (
        <>
            <Header />
            <main
                css={[
                    {marginTop:height}
                ]}
            >
                <article>
                    <section className="article_info" 
                        css={[topSet.top_all,articleSet.article_info,utilSet.verticalize]}
                    >
                        <div className="breadcrumb">

                        </div>
                        <div className="article_title">
                            <h1>{article.title}</h1>
                        </div>
                        <div className="article_img_wrapper"
                            css={[
                                articleSet.article_bigimg_wrapper,
                                articleSet.article_bigimg_wrapper__el,
                                utilSet.horizontalize
                            ]}
                        >
                            <LoadedImg
                                url={article.imgURL}
                                style_css={[
                                    {width:"100%",height:200,objectFit:"cover",borderRadius:10}
                                ]}
                            />
                        </div>
                        <div className="article_description"
                            css={[
                                articleSet.article_desc
                            ]}
                        >
                            {article.desc}
                        </div>
                    </section>
                    <hr></hr>
                    <div css={[utilSet.horizontalize,articleSet.article_all]}>
                        <section className="article_content" css={[articleSet.article_content]}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                children={article.content}
                                css={markdownSet.markdown_styles}
                            />
                        </section>
                        <div css={{borderRight:"1px solid black"}}></div>
                        <AsideNav />
                    </div>
                </article>
            </main>
            <Footer />
        </>
    )
}