/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { articleSet } from "./article_css"
import { topSet } from "../top/top_css"
import { utilSet } from "../others/util_css"
import { markdownSet } from "../edit/markdown_css" 
import LoadedImg from "../img/Img"
import AsideNav from "../nav/aside_nav"
import { useResource } from "../ResourceProvider"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { useLayoutEffect } from "react"

/**articleはこのページに来てから読み込む */
export default function Article() {
    //====================IMPORT====================//
    const {
        article,
        articles,
        setCurrentArticle,
        findByArticleId,
        findTagById
    } = useResource()
    
    //==================DEFINITION==================//
    //param
    const {articleID} = useParams("")

    //variable
    const tagName = findTagById(article.tagID)[1]

    //==================USE EFFECT=================//
    //paramの情報を使用し、articlesからarticleを読み込む（articlesに依存させないと、順序的にarticlesの取得が後になってしまう）
    useLayoutEffect(() => {
        if(!articles) return
        setCurrentArticle(findByArticleId(articleID))
    },[articles])
    //画面をトップから始める
    useEffect(() => {
        document.scrollingElement.scrollTop = 0 //画面が途中から始まる問題に対処
    },[])

    return (
        <>
            {console.log("Article")}
            <article css={{width:"100%"}}>
                <section className="article_info" 
                    css={[topSet.top_all,articleSet.article_info,utilSet.verticalize]}
                >
                    <div className="breadcrumb" css={[articleSet.breadcrumb_wrapper,utilSet.horizontalize,utilSet.horizontalize___right]}>
                        <span className="breadcrumb-link" css={[articleSet.breadcrumb_link]}>
                            <Link to="/">top</Link>
                        </span>
                        <span className="breadcrumb-link" css={[articleSet.breadcrumb_link]}>
                            <Link to={`/category/${tagName}`}>{tagName}</Link>
                        </span>
                        <span className="breadcrumb-end" css={[articleSet.breadcrumb_link___end]}>
                            {article.title}
                        </span>
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
                    <div css={articleSet.article_page__line}></div>
                    <AsideNav />
                </div>
            </article>
        </>
    )
}