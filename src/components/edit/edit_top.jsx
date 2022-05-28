/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { useResource } from "../ResourceProvider";
import { topSet } from "../top/top_css";
import { utilSet } from "../others/util_css";
import { editSet } from "./edit_css";
import { AnimatePresence, motion } from "framer-motion";
import EditHeader from "./edit_header";
import { edit_tools } from "../../edit_tools";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRef } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { markdownSet } from "./markdown_css";
import Cards from "../cards/Cards";
import { useLayoutEffect } from "react";
import DesignedSelect from "../select/DesignedSelect";
import ImgCards from "../cards/ImgCards";
import { cardSet } from "../card/card_css";
import { useParams } from "react-router-dom";

export default function EditTop() {
    const {
        headerInfo,
        height,
        headerHeight,
        article,
        resetCurrentArticle,
        tabs_json,
        findAll,
        articles,
        setCurrentArticle,
        findByArticleId
    } = useResource()
    
    //==================DEFINITION==================//
    //variable
    let unique_id = article ? article.articleID : "" //TODO:投稿済みの記事を読み込んだ際に保持される識別id

    //param
    const {articleID} = useParams("")

    //ref
    const ref = useRef() //toolの注釈文をinnetTextで改行もするために必要
    
    //state
    const [form,setForm] = useReducer(
        (form,latest) => ({...form,...latest}),{title:"",desc:"",img:{},tag:[]}
    )
    const [markdown,setMarkdown] = useState(article ? article.content : "") //HACK:state of markdown text
    const [isOpen,setIsOpen] = useState(false) //HACK:state of hidden list of articles
    const [isImgOpen,setIsImgOpen] = useState(false) //HACK:state of hidden list of Images
    const [imgs,setImgs] = useState([])
    const [ishover,setIshover] = useState(false) //HACK:state of icon hovering
    const [tool,setTool] = useState({}) //HACK:state of item clicked
    
    //==================USE EFFECT=================//
    //TODO:when reloading[confirm]
    useEffect(() => {
        window.onbeforeunload = e => {
            e.returnValue = "更新しますか"
            return "更新しますか"
        }
        console.log(form)
    })

    //TODO:when mounted, set articles
    useEffect(() => {
        findAll()
    },[])

    //TODO:when loaded, set article
    useEffect(() => {
        if(!articles) return
        setCurrentArticle(findByArticleId(articleID))
    })
    
    //TODO:before useeffect
    useLayoutEffect(() => {
        //articleが空の場合にデフォルトのフォーム値を使用する
        if(!article) return
        setForm({title:article.title,desc:article.desc,img:{},tag:findTagById(article.tagID)}) 
        setMarkdown(article.content)
    },[article])

    //TODO:article changed[set]
    useEffect(() => {
        if(!article) return
        setIsOpen(false)
    },[article])

    //FIXME:tool changed[set]
    useEffect(() => {
        if(!tool.desc) return
        ref.current.innerText = tool.desc
    },[tool])

    //==================SET STATES==================//
    //form 
    const formChanged = e => {
        if(e.target.name === "form_title") {
            setForm({title:e.target.value})
            return
        }
        if(e.target.name === "form_desc"){
            setForm({desc:e.target.value})
            return  
        } 
        setForm({img:e.target.files[0]})
    }

    //tag(form)
    const tagChanged = (id,name) => {
        setForm({tag:[id,name]})
    }
    const findTagById = id => {
        let tag = []
        tabs_json.forEach(row => {
            if(row.id === parseInt(id)){
                tag.push(id,row.name)
            }
        })
        return tag
    }

    //markdown
    const textareaChanged = e => {
        console.log("textarea changed")
        setMarkdown(() => e.target.value)
    }    

    //tool markdown ishover
    const appear = e => {
        if(parseInt(e.target.dataset.id) === 6){
            fetchImgUrls()
            setIsImgOpen(!isImgOpen)
        }
        setTool({tool:e.target.dataset.tool,desc:e.target.dataset.desc})
        setIshover(true) //FIXME
        setMarkdown(() => markdown + e.target.dataset.helper)
    }

    //ishover
    const cancel = () => {
        setIshover(false) //FIXME
    }

    //isopen
    const toggleHidden = () => {
        setIsOpen(!isOpen)
    }

    //isImgOpen
    const toggleImgHidden = () => {
        setIsImgOpen(!isImgOpen)
    }

    //imgs
    const fetchImgUrls = () => {
        fetch("http://localhost:8080/img/all")
            .then(res => res.json())
            .then(res_list => {
                setImgs(() => [...res_list])
            })
    }


    //================EVENTS TO PASS===============//
    //new file
    const onNewClicked = () => {
        onResetClicked()
        resetCurrentArticle()
        window.location = "/edit"
    }

    //clear text
    const onResetClicked = () => {
        if(!window.confirm("変更を破棄してもよろしいですか？")) return
        setMarkdown("")
        setForm({title:"",desc:"",img:{},tag:[]})
    }

    //submit article
    const onSubmitClicked = () => {
        if(!window.confirm("投稿しますか？")) return
        
        const data = new FormData()
        data.append("img",form.img)
        data.append("articleID",unique_id)
        data.append("title",form.title)
        data.append("desc",form.desc)
        data.append("tagID",form.tag[0])
        data.append("markdown",markdown)
        
        fetch("http://localhost:8080/article/post",{
            method:"POST",
            mode:"cors",  
            body:data
        })
        .then(res => {
            if(res.ok) {
                if(window.confirm("記事の投稿が完了しました。\nホームに戻りますか？")) window.location.href="/"
            }
            return res.text()
        })
        .catch(err => console.error(err))
    }

    //pan-scroll
    const panned = (e,i) => {
        console.log("panned in ",e.target)
        const off_x = i.offset.x
        e.target.scrollBy(off_x > 0 ? -(off_x+300) : -(off_x-300),0) //少量のスクロールで+-300px以上移動する
    }

    //set one img url
    const onImgClicked = e => {
        console.log(e.target)
        setMarkdown(() => markdown + e.target.dataset.url + ")")
        setIsImgOpen(!isImgOpen)
    }
    
    return (
        <>
            <EditHeader 
                info={headerInfo} 
                setheight={headerHeight} 
                methods={{
                    open:toggleHidden,
                    reset:onResetClicked,
                    submit:onSubmitClicked,
                    newfile:onNewClicked
                }}
            />
            <main css={{marginTop:height}}>
                <section className="top-all" css={[
                    utilSet.verticalize
                ]}> 
                    <AnimatePresence>
                        { isOpen &&
                            <motion.div
                                className="open__hidden"
                                css={[
                                    utilSet.verticalize,
                                    topSet.top_open_hidden
                                ]}
                                layout
                                initial={{x:-700,opacity:0}}
                                animate={{x:0,opacity:1}}
                                exit={{x:-2000,opacity:0}}
                                transition={{duration:0.6,delay:0.15}}
                            >
                                <button
                                    onClick={toggleHidden}
                                >
                                    <motion.svg
                                        whileHover={{scale:1.3,stroke:"red"}}
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        fill="none"
                                        strokeLinecap="round"
                                        stroke="white"
                                    >
                                        <path d="M 10 10 L 30 30 M 30 10 L 10 30"></path>
                                    </motion.svg>
                                </button>
                                <motion.div
                                    className="hidden_cards_list"
                                >
                                    <Cards grid={false} edit={true} pan={panned}/>
                                </motion.div>
                            </motion.div>
                        }
                    </AnimatePresence>

                    <AnimatePresence>
                        { isImgOpen &&
                            <motion.div
                                className="open__hidden"
                                css={[
                                    utilSet.verticalize,
                                    topSet.top_open_hidden___imgs
                                ]}
                                layout
                                initial={{x:-700,opacity:0}}
                                animate={{x:0,opacity:1}}
                                exit={{x:-2000,opacity:0}}
                                transition={{duration:0.6,delay:0.15}}
                            >
                                <button
                                    onClick={toggleImgHidden}
                                >
                                    <motion.svg
                                        whileHover={{scale:1.3,stroke:"red"}}
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        fill="none"
                                        strokeLinecap="round"
                                        stroke="white"
                                    >
                                        <path d="M 10 10 L 30 30 M 30 10 L 10 30"></path>
                                    </motion.svg>
                                </button>
                                <motion.div
                                    className="hidden_cards_list"
                                    css={[cardSet.cards_wrapper,editSet.scrollbar_style,editSet.scrollbar_style___verticalize]}
                                >
                                    <ImgCards imgs={imgs} pan={panned} grid={true} clicked={onImgClicked}/>
                                </motion.div>
                            </motion.div>
                        }
                    </AnimatePresence>
                    <div className="notes" css={[
                        utilSet.horizontalize,
                        topSet.top_all,
                        editSet.edit_top_all
                    ]}>
                        <div className="note-wrapper" css={[
                            utilSet.verticalize,
                            editSet.edit_note_wrapper
                        ]}>
                            <div className="note-title" css={[editSet.edit_note_title]}>
                                <h2>編集ノート</h2>
                            </div>
                            <div className="editable-note"
                                css={editSet.edit_note}
                            >
                                <motion.div
                                    className="editable-note-tools"
                                    css={[
                                        utilSet.horizontalize,
                                        editSet.edit_note_tools,
                                        editSet.scrollbar_style
                                    ]}
                                    onPan={panned}
                                    transition={{duration:0.5,type:"inertia"}}
                                >
                                    {
                                        edit_tools.map((item,index) => (
                                            <motion.div
                                                className="tools-element"
                                                data-tool={item.tool}
                                                data-desc={item.desc}
                                                data-helper={item.helper}
                                                data-id={item.id}
                                                key={index}
                                                style={editSet.edit_element}
                                                whileHover={{scale:1.15,opacity:0.3}}
                                                onClick={appear}
                                                onMouseLeave={cancel}
                                                onPan={e => {e.preventDefault()}}
                                                {...editSet.hover_props}
                                            >
                                                <motion.svg
                                                    pointerEvents="none"
                                                    width="27"
                                                    height="27"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    {item.dom}
                                                </motion.svg>
                                            </motion.div>
                                        ))
                                    }
                                    {
                                        ishover && tool && (
                                            <section className="tools-annotation"
                                                css={[editSet.tools_annotation,utilSet.verticalize]}
                                            >
                                                <strong>{tool.tool}</strong>
                                                <p ref={ref}></p>
                                            </section>
                                        )
                                    }
                                </motion.div>
                                <hr></hr>
                                <motion.div className="editable-note-canvas"
                                    css={[editSet.edit_note_canvas]}
                                >
                                    <textarea
                                        value={markdown}
                                        onChange={textareaChanged}
                                        autoFocus
                                        style={{resize:"none"}}
                                        css={[editSet.scrollbar_style,editSet.scrollbar_style___verticalize]}
                                    />
                                </motion.div>
                            </div>
                        </div>
                        <div className="note-wrapper" css={[
                            utilSet.verticalize,
                            editSet.edit_note_wrapper
                        ]}>
                            <div className="note-title" css={[editSet.edit_note_title]}>
                                <h2>プレビューノート</h2>
                            </div>
                            <div className="preview-note" css={editSet.edit_note}>
                                <div className="preview-note-canvas"
                                    css={[
                                        editSet.edit_note_canvas,
                                        editSet.preview_note,
                                        editSet.scrollbar_style,
                                        editSet.scrollbar_style___verticalize
                                    ]}
                                >
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        children={markdown}
                                        css={markdownSet.markdown_styles}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="note-info" css={[editSet.note_info___el]}>
                        <form css={[
                            editSet.note_info,
                            utilSet.verticalize
                        ]}>
                            <div className="note_input_up" css={[editSet.note_input_up,editSet.note_input_el,utilSet.horizontalize,utilSet.horizontalize___left]}>
                                <input name="form_title" placeholder="title" required type="text" value={form.title} onChange={formChanged} />
                                <DesignedSelect changed={tagChanged} tag={form.tag}/>
                            </div>
                            <div className="note_input_down" css={[utilSet.horizontalize,utilSet.horizontalize___center,editSet.note_input_down]}>
                                <textarea name="form_desc" placeholder="description" rows="7" value={form.desc} onChange={formChanged}/>
                                <div className="form-img-input" css={[editSet.note_input_img,utilSet.horizontalize,utilSet.horizontalize__align,utilSet.horizontalize___center]}>
                                    <div className="img-instruction" css={[editSet.img_instruction]}>
                                        <motion.div 
                                            className="img-instruction-up" 
                                            css={[utilSet.horizontalize,utilSet.horizontalize___center]}
                                            animate={{y:5,opacity:0.5}}
                                            transition={{duration:0.7,repeat:"Infinity",repeatType:"reverse"}}
                                        >
                                            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
                                        </motion.div>
                                        <div className="img-instruction-center" css={[utilSet.horizontalize,utilSet.verticalize___center]}>
                                            <motion.div 
                                                animate={{x:5,opacity:0.5}}
                                                transition={{duration:0.7,repeat:"Infinity",repeatType:"reverse"}}
                                            >
                                                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
                                            </motion.div>
                                            { form.img.name ? 
                                            <motion.div 
                                                className="img_instruction_preview" 
                                            >
                                                <img 
                                                    alt={form.img.filename} 
                                                    src={URL.createObjectURL(form.img)} 
                                                    css={[
                                                        editSet.img_instruction_preview
                                                    ]} 
                                                />
                                            </motion.div>
                                            :
                                            <motion.svg
                                                width="46"
                                                height="46"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#000000"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/>
                                            </motion.svg>
                                            }
                                            <motion.div 
                                                animate={{x:-5,opacity:0.5}}
                                                transition={{duration:0.7,repeat:"Infinity",repeatType:"reverse"}}
                                            >
                                                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>
                                            </motion.div>
                                        </div>
                                        <motion.div 
                                            className="img-instruction-down" 
                                            css={[utilSet.horizontalize,utilSet.horizontalize___center]}
                                            animate={{y:-5,opacity:0.5}}
                                            transition={{duration:0.7,repeat:"Infinity",repeatType:"reverse"}}
                                        >
                                            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 11l-5-5-5 5M17 18l-5-5-5 5"/></svg>
                                        </motion.div>
                                    </div>
                                    <input name="form_img" type="file" value={form.img.filename} onChange={formChanged}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}
