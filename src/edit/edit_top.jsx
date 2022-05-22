/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import { useResource } from "../../src/components/ResourceProvider";
import { topSet } from "../css/top/top_css";
import { utilSet } from "../css/util_css";
import { editSet } from "./edit_css";
import { motion } from "framer-motion";
import EditHeader from "./edit_header";
import { useState } from "react";

export default function EditTop() {
    const {headerInfo,height,headerHeight} = useResource()

    //TODO:test --drag states
    const [tool,setTool] = useState("")
    let substate

    //TODO:pan events
    const panStarted = e => {
        console.log(e.target.dataset.tool)
        setTool(() => e.target.dataset.tool)
    }
    const dragStarted = e => {
        console.log(e.target)
        substate = e.target.dataset.tool
    }
    const dragEnded = e => {
        console.log(e.target)
        setTool(() => substate)
    }

    return (
        <>
            <EditHeader info={headerInfo} setheight={headerHeight} />
            <main css={{marginTop:height}}>
                <div className="top-all" css={[
                    utilSet.horizontalize,
                    topSet.top_all
                ]}>
                    <div className="note-wrapper" css={[
                        utilSet.verticalize,
                        editSet.edit_note_wrapper,
                        {width:"60%"}
                    ]}>
                        <h2>編集ノート</h2>
                        <div className="editable-note" 
                            css={editSet.edit_note}
                        >
                            <div className="editable-note-tools" css={[
                                utilSet.horizontalize,
                                editSet.edit_note_tools
                            ]}>
                                <motion.div 
                                    className="tools-element"
                                    data-tool={"t"}
                                    style={editSet.edit_element}
                                    onDragEnd={dragEnded}
                                    onDragStart={dragStarted}
                                    {...editSet.drag_props}
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
                                        <polyline points="4 7 4 4 20 4 20 7"></polyline>
                                        <line x1="9" y1="20" x2="15" y2="20"></line>
                                        <line x1="12" y1="4" x2="12" y2="20"></line>
                                    </motion.svg>
                                </motion.div>
                            </div>
                            <hr></hr>
                            <motion.div className="editable-note-canvas"
                                css={[editSet.edit_note_canvas]}
                            >
                                {tool}
                            </motion.div>
                        </div>
                    </div>
                    <div className="note-wrapper" css={[
                        utilSet.verticalize,
                        editSet.edit_note_wrapper,
                        {width:"40%"}
                    ]}>
                        <h2>プレビューノート</h2>
                        <div className="preview-note" css={editSet.edit_note}>
                            <div className="preview-note-canvas"
                                    css={[editSet.edit_note_canvas]}
                            >

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
