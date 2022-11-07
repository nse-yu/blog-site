/** @jsxImportSource @emotion/react */
import { useData, useDataDispatch } from "../ResourceProvider";
import { topSet } from "../top/top_css";
import { utilSet } from "../others/util_css";
import { editSet } from "./edit_css";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import EditHeader from "./edit_header";
import { edit_tools } from "../../edit_tools";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { useRef } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { markdownSet } from "./markdown_css";
import Cards from "../cards/Cards";
import DesignedSelect from "../select/DesignedSelect";
import ImgCards from "../cards/ImgCards";
import { cardSet } from "../card/card_css";
import { useParams } from "react-router-dom";
import usePopup from "../popup/usePopup";


let initOnce    = false
let popMessage  = ""
let action      = ""
let onlyAlert   = false
let deleteId    = ""


export default function EditTop() {

    const {
        height,
        article,
        articles,
        findTagById,
        findAll,
        findByArticleId,
        deleteArticle
    } = useData()

    const {
        dispatchArticle
    } = useDataDispatch()
    
    //==================DEFINITION==================//

    //variable
    let unique_id   = article ? article.articleID : "" //TODO:投稿済みの記事を読み込んだ際に保持される識別id

    let tempHelper  = "![image](http://localhost:5000/img/"


    //param
    const {articleID} = useParams("")

    //ref
    const ref_note      = useRef()
    const ref_preview   = useRef()
    const ref_tools     = useRef()
    const ref_markdown  = useRef() //stateのmarkdownは、テキストのみだが、refなら要素自体にアクセスできる
    
    //state
    const [form,setForm]                = useReducer((form,latest) => ({...form,...latest}),{title:"",desc:"",img:{},tag:[]})
    const [markdown,setMarkdown]        = useState(article ? article.content : "") //HACK:state of markdown text
    const [isOpen,setIsOpen]            = useState(false) //HACK:state of hidden list of articles
    const [isImgOpen,setIsImgOpen]      = useState(false) //HACK:state of hidden list of Images
    const [imgs,setImgs]                = useState([])
    const [noteRect,setNoteRect]        = useState({width:0,height:0})
    const [isPrevFollow,toggleFollow]   = useCycle(false,true)
    const [popUp, setPopUp]             = useState(false)


    const ok = () => {

        switch(action){
            case "reset":{
                setMarkdown("")
                setForm({title:"",desc:"",img:{},tag:[]})
                dispatchArticle({
                    type:"reset", data:{}
                })
                break
            }
            case "submit":{

                const data = new FormData()
                data.append("img",form.img)
                data.append("articleID",unique_id)
                data.append("title",form.title)
                data.append("desc",form.desc)
                data.append("tagID",form.tag[0])
                data.append("markdown",markdown)
                
                fetch("http://localhost:5000/article/post",{
                    method:"POST",
                    mode:"cors",  
                    body:data
                })
                .then(res => {
                    if(res.ok) {

                        cancel()

                        popMessage  = "投稿が完了しました"
                        action      = "completed"
                        onlyAlert   = true
                        setPopUp(true)

                    }
                    return res.text()
                })
                .finally(() => findAll())
                .catch(err => console.error(err))
                break
            }
            case "new":{

                dispatchArticle({
                    type:"reset", data:{}
                })
        
                window.location = "/edit" //urlを変更するためにやむを得ず
                break
            }
            case "failed":{
                onlyAlert = false
                break
            }
            case "completed":{
                onlyAlert = false
                break
            }
            case "del":{
                deleteArticle(deleteId)
            }
            default:{
                break
            }
        }

        cancel()
    }

    const cancel = () => {
        destroy()
        setPopUp(false)
    }
    const [popupRef, display, destroy, isDisplayed] = usePopup(ok, cancel)


    //===============INITIALIZATION=================//
    if(!initOnce){

        findAll()

        if(article) {
            reloadArticle()
            setIsOpen(false) //articleがarticle-boxから選択されたらboxをcloseする(選択状態でのcloseを保証する)
        }
        
        initOnce = true

    }

    if(popUp && !isDisplayed){ 
        display(popMessage, onlyAlert) 
    }

    //==================USE EFFECT=================//
    //TODO:メモサイズ処理
    useEffect(() => {

        window.onbeforeunload = e => {

            e.returnValue = ""

        }

        setNoteRect({
            width:ref_note.current.getBoundingClientRect().width - 20,
            height:ref_note.current.getBoundingClientRect().height * 0.1
        })

        window.onresize = () => {
            setNoteRect({
                width:ref_note.current.getBoundingClientRect().width - 20,
                height:ref_note.current.getBoundingClientRect().height * 0.1
            })   
        }  

    },[])

    //TODO:追従処理
    useEffect(() => {

        if(!isPrevFollow) return

        let max_scroll = ref_preview.current.scrollHeight
        ref_preview.current.scrollTo(0,max_scroll * ref_markdown.current.selectionStart / ref_markdown.current.value.length -100) //字数比をスクロール幅にかけ、ある程度マージンを追加
    
    },[markdown])


    //FIXME[dependency]:paramで指定されたarticleをarticlesから読み込む
    useEffect(() => {

        if(!articleID) return
        
        if(!articles) return

        dispatchArticle({
            type:"set", data:findByArticleId(articleID)
        })
        
        initOnce = false

    },[articleID, articles])
    

    //==================ON CHANGE==================//
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

    //tag
    const tagChanged = (id,name) => {
        setForm({tag:[id,name]})
    }

    //markdown
    const textareaChanged = e => {
        setMarkdown(() => e.target.value)
    }    

    //=================ON CLICK====================//
    //tool-helperをカーソル位置に挿入するための処理とimg-helperに関する処理
    const appear = e => {
        
        if(parseInt(e.target.dataset.id) === 6){

            tempHelper = e.target.dataset.helper

            fetchImgUrls()
            setIsImgOpen(!isImgOpen)
            return
        }

        //cursor位置へのhelper挿入
        let cursor = ref_markdown.current.selectionStart
        setMarkdown(() => markdown.slice(0,cursor) + e.target.dataset.helper + markdown.slice(cursor))

    }

    //img-box表示切替
    const toggleImgHidden = () => {
        setIsImgOpen(!isImgOpen)
    }

    //================FOR EDIT HEADER===============//
    //new file
    const onNewClicked = () => {

        popMessage  = "変更を破棄してもよろしいですか？"
        action = "new"
        setPopUp(true)

    }

    const onDeleteClicked = id => {

        deleteId    = id
        popMessage  = "本当に削除してもよろしいですか？"
        action      = "del"
        setPopUp(true)

    }

    //clear text
    const onResetClicked = () => {

        popMessage  = "変更を破棄してもよろしいですか？"
        action      = "reset"
        setPopUp(true)

    }

    //open articles
    const onOpenClicked = () => {
        setIsOpen(!isOpen)
    }

    //submit article
    const onSubmitClicked = () => {

        if(!form.img || !form.title || !form.desc || !form.tag[0]){

            popMessage  = "入力内容に不備があります。"
            action      = "failed"
            onlyAlert   = true
            setPopUp(true)

        }else{

            popMessage  = "投稿しますか？"
            action      = "submit"
            setPopUp(true)

        }

    }

    //toggle isPrevFollow callback
    const togglePrevFollowing = () => {
        toggleFollow()
    }

    //================FOR CARDS TO SCROLL===============//
    //panスクロール対応
    const panned = (e,i) => {
        const off_x = i.offset.x
        e.target.scrollBy(off_x > 0 ? -(off_x+300) : -(off_x-300),0) //少量のスクロールで+-300px以上移動する
    }

    //img-helper挿入時の後処理
    const onImgClicked = e => {

        //cursor位置へのhelper挿入
        let cursor = ref_markdown.current.selectionStart
        setMarkdown(() => markdown.slice(0,cursor) + tempHelper + e.target.dataset.url + ")" + markdown.slice(cursor))
        setIsImgOpen(!isImgOpen)
    }

    const onImgUploaded = fileName => {

        //cursor位置へのhelper挿入
        let cursor = ref_markdown.current.selectionStart
        setMarkdown(() => markdown.slice(0,cursor) + tempHelper + fileName + ")" + markdown.slice(cursor))

        setIsImgOpen(!isImgOpen)
    }

    function reloadArticle() {
        
        fetch("http://localhost:5000/img/" + article.imgURL)
            .then(res => {
                const reader = res.body.getReader();
                return new ReadableStream({
                    start(controller) {
                        return pump();

                        function pump() {
                            return reader.read().then(({ done, value }) => {
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                controller.enqueue(value);
                                return pump();
                            });
                        }
                    }
                });
            })
            .then(stream => new Response(stream))
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], article.imgURL);
                return file;
            })
            .then(file => {
                setForm({ title: article.title, desc: article.desc, img: file, tag: findTagById(article.tagID) });
            })
            .catch(err => console.error(err));

        setMarkdown(article.content);
    }

    //==================UTILITY====================//
    //アップロード済みimgsを取得
    const fetchImgUrls = () => {

        fetch("http://localhost:5000/img/all")
            .then(res => res.json())
            .then(res_list => {
                setImgs(() => [...res_list])
            })

    }


    return (
        <>
            <div ref={popupRef} />
            <EditHeader 
                methods={{
                    newfile :[onNewClicked,"新規"],
                    open    :[onOpenClicked,"開く"],
                    reset   :[onResetClicked,"破棄"],
                    submit  :[onSubmitClicked,"投稿"],
                    toggle  :togglePrevFollowing
                }}
                prev_follow={isPrevFollow}
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
                                    topSet.top_open_hidden,
                                    {
                                        top:window.pageYOffset + 20
                                    }
                                ]}
                                layout
                                initial={{x:-700,opacity:0}}
                                animate={{x:0,opacity:1}}
                                exit={{opacity:0}}
                                transition={{duration:0.6,delay:0.15}}
                            >
                                <button
                                    onClick={onOpenClicked}
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
                                    css={[topSet.top_open_hidden___list,editSet.scrollbar_style,editSet.scrollbar_style___verticalize]}
                                >
                                    <Cards grid={true} edit={true} pan={panned} del={true} delMethod={onDeleteClicked}/>
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
                                    topSet.top_open_hidden___imgs,
                                    {
                                        alignItems:"flex-start",
                                        top:ref_tools.current.getBoundingClientRect().top + window.pageYOffset - 20
                                    }
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
                                    <ImgCards imgs={imgs} pan={panned} preUpload={true} grid={true} clicked={onImgClicked} uploaded={onImgUploaded}/>
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
                                ref={ref_note}
                                css={[editSet.edit_note,editSet.edit_note___left]}
                            >
                                <motion.div
                                    className="editable-note-tools"
                                    css={[
                                        utilSet.horizontalize,
                                        editSet.edit_note_tools,
                                        editSet.scrollbar_style,
                                        {width:noteRect.width,height:noteRect.height}
                                    ]}
                                    onPan={panned}
                                    ref={ref_tools}
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
                                </motion.div>
                                <motion.div className="editable-note-canvas"
                                    css={[
                                        editSet.edit_note_canvas,
                                        {marginTop:noteRect.height}
                                    ]}
                                >
                                    <textarea
                                        value={markdown}
                                        onChange={textareaChanged}
                                        autoFocus
                                        ref={ref_markdown}
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
                                    ref={ref_preview}
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
                                        components={{
                                            code({node, inline, className, children, ...props}) {
                                                const match = /language-(\w+)/.exec(className || '')
                                                return !inline && match ? (
                                                <SyntaxHighlighter
                                                    children={String(children).replace(/\n$/, '')}
                                                    style={dark}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    {...props}
                                                />
                                                ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                                )
                                            }
                                        }}
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
