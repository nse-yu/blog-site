/** @jsxImportSource @emotion/react */
import { jsx,css, ClassNames } from "@emotion/react"
import { useResource } from "../../src/components/ResourceProvider";
import { topSet } from "../css/top/top_css";
import { utilSet } from "../css/util_css";
import { editSet } from "./edit_css";
import { motion } from "framer-motion";
import EditHeader from "./edit_header";
import { edit_tools } from "../edit_tools";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRef } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { markdownSet } from "./markdown_css";

export default function EditTop() {
    const {headerInfo,height,headerHeight} = useResource()
    const ref = useRef() //innerTextで挿入するのに必要

    //TODO:when window are reloading
    useEffect(() => {
        window.onbeforeunload = e => {
            e.returnValue = "更新しますか"
            return "更新しますか"
        }
    })

    //TODO:admin form values
    const [form,setForm] = useReducer((form,latest) => ({...form,...latest}),{title:"",desc:"",img:{}})
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
    

    //TODO:markdown states
    const [markdown,setMarkdown] = useState("") //HACK:state of markdown text
    const textareaChanged = e => {
        setMarkdown(() => e.target.value)
    }

    //FIXME:hover state
    const [ishover,setIshover] = useState(false) //HACK:state of icon hovering
    
    //TODO:click events
    const [tool,setTool] = useState({}) //HACK:state of item clicked
    const appear = e => {
        setTool({tool:e.target.dataset.tool,desc:e.target.dataset.desc})
        setIshover(true) //FIXME
    }
    const cancel = () => {
        setIshover(false) //FIXME
    }
    useEffect(() => {
        if(!tool.desc) return
        ref.current.innerText = tool.desc
    },[tool])

    //TODO:pan events
    const panned = (e,i) => {
        const off_x = i.offset.x
        e.target.scrollBy(off_x > 0 ? -(off_x+300) : -(off_x-300),0) //少量のスクロールで+-300px以上移動する
    }

    //TODO:callbacks for the edit_header
    const onResetClicked = () => {
        if(!window.confirm("変更を破棄しますか？")) return
        setMarkdown("")
    }
    const onSubmitClicked = () => {
        if(!window.confirm("投稿しますか？")) return

        const data = new FormData()
        data.append("img",form.img)
        data.append("title",form.title)
        data.append("desc",form.desc)
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

    return (
        <>
            <EditHeader info={headerInfo} setheight={headerHeight} reset={onResetClicked} submit={onSubmitClicked}/>
            <main css={{marginTop:height}}>
                <section className="top-all" css={[
                    utilSet.verticalize
                ]}>
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
                                    whileDrag={{scale:2.5}}
                                    transition={{duration:0.5,type:"inertia"}}
                                >
                                    {
                                        edit_tools.map((item,index) => (
                                            <motion.div
                                                className="tools-element"
                                                data-tool={item.tool}
                                                data-desc={item.desc}
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
                                                    {item.markdown}
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
                                    css={[editSet.edit_note_canvas,editSet.preview_note,editSet.scrollbar_style]}
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
                            <div className="note_input_up" css={[editSet.note_input_up,editSet.note_input_el]}>
                                <input name="form_title" placeholder="title" required type="text" value={form.title} onChange={formChanged} />
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
