/** @jsxImportSource @emotion/react */
import { jsx,css, ThemeProvider } from "@emotion/react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { articleSet } from "./article_css"
import { topSet } from "../top/top_css"
import { utilSet } from "../others/util_css"
import { markdownSet } from "../edit/markdown_css" 
import LoadedImg from "../img/Img"
import AsideNav from "../nav/aside_nav"
import { baseThemes } from "../../theme"
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
        findTagById,
        isLight,
        wordChanged
    } = useResource()
    
    //==================DEFINITION==================//
    //param
    const {articleID} = useParams("")

    //variable
    const tagName = findTagById(article.tagID)[1]

    //==================USE EFFECT=================//
    useLayoutEffect(() => { //paramの情報を使用し、articlesからarticleを読み込む（articlesに依存させないと、順序的にarticlesの取得が後になってしまう）
        if(!articles) return
        setCurrentArticle(findByArticleId(articleID))
        wordChanged("") //searchWordはもう使わないので、破棄する
    },[articles])

    useEffect(() => {//画面をトップから始める
        document.scrollingElement.scrollTop = 0 //画面が途中から始まる問題に対処
    },[])
    
    //=========TEST=========//
    useEffect(() => {
        console.log("Article")
    })

    return (
        <ThemeProvider theme={baseThemes}>
            <article css={{width:"100%"}}>
                <section className="article_info" 
                    css={[
                        topSet.top_all,
                        articleSet.article_info,
                        utilSet.verticalize,
                        theme => ({
                            background: isLight ? theme.linear.light : theme.linear.default
                        })
                    ]}
                >
                    <div className="breadcrumb" 
                        css={[
                            articleSet.breadcrumb_wrapper,
                            utilSet.horizontalize,
                            utilSet.horizontalize___right,
                        ]}>
                        <span className="breadcrumb-link" 
                            css={[
                                articleSet.breadcrumb_link,
                                theme => ({
                                    color: isLight ? theme.text.default : theme.text.light
                                })
                            ]}>
                            <a
                                href="/" 
                                css={[
                                    theme => ({
                                    color: isLight ? theme.text.default : theme.text.light
                                    })
                                ]}
                            >
                                top
                            </a>
                        </span>
                        <span className="breadcrumb-link" 
                            css={[
                                articleSet.breadcrumb_link,
                                theme => ({
                                    color: isLight ? theme.text.default : theme.text.light
                                })
                            ]}>
                            <Link to={`/category/${tagName}`} 
                                css={[
                                    theme => ({
                                    color: isLight ? theme.text.default : theme.text.light
                                    })
                                ]}
                            >{tagName}</Link>
                        </span>
                        <span className="breadcrumb-end" 
                            css={[
                                articleSet.breadcrumb_link___end,
                                theme => ({
                                    color: isLight ? theme.text.default : theme.text.light
                                })
                            ]}>
                            {article.title}
                        </span>
                    </div>
                    <div className="article_title">
                        <h1 css={[
                            theme => ({
                                color: isLight ? theme.text.default : theme.text.light
                            })
                        ]}>{article.title}</h1>
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
                            articleSet.article_desc,
                            theme => ({
                                color: isLight ? theme.text.light : theme.text.defualt
                            })
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
                </div>
            </article>
        </ThemeProvider>
    )
}