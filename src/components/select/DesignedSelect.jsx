/** @jsxImportSource @emotion/react */
import {AnimatePresence, motion} from "framer-motion"
import { useState } from "react"
import { utilSet } from "../others/util_css"
import { designedSet } from "./designed_css"
import { useData } from "../ResourceProvider"


export default function DesignedSelect({changed,tag}) {
    //==================DEFINITION==================//
    //state
    const [toggle,setToggle] = useState(false)

    //====================IMPORT====================//
    const {tabs} = useData()

    //=================SET STATES=================//
    const clicked = e => {

        setToggle(!toggle)
        
        if(e.target.classList.contains("select__item")){
            tabs.forEach(item => {
                if(item.id === Number(e.target.dataset.value)){
                    changed(item.id,item.name)
                }
            })
        }
    }

    return (
        <>
            { !toggle &&
                <motion.div
                    className="select_wrapper"
                    layout
                    css={[
                        designedSet.select_wrapper,
                        utilSet.horizontalize,
                        utilSet.verticalize___center
                    ]}
                    whileHover={{
                        scale:0.9,
                        opacity:0.6
                    }}
                    transition={{
                        duration:0.4
                    }}
                    onClick={clicked}
                >
                    {!tag[0] &&
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="4" y1="9" x2="20" y2="9"></line>
                            <line x1="4" y1="15" x2="20" y2="15"></line>
                            <line x1="10" y1="3" x2="8" y2="21"></line>
                            <line x1="16" y1="3" x2="14" y2="21"></line>
                        </svg>
                    }
                    {
                        tag[0] &&
                            <span>#{tag[1]}</span>
                    }
                </motion.div>
            }

            <AnimatePresence>
                {
                    toggle &&
                    <motion.div
                        className="select_wrapper___hidden"
                        css={[
                            designedSet.select_wrapper,
                            designedSet.select_wrapper___hidden
                        ]}
                        initial={{
                            x:-8,
                            opacity:0
                        }}
                        animate={{
                            x:8,
                            opacity:1
                        }}
                        transition={{
                            duration:0.6
                        }}
                        exit={{x:-8,opacity:0}}
                    >
                        <div
                            css={[utilSet.horizontalize]}
                        >
                            {
                                tabs.map((item,idx) => (
                                    <motion.span
                                        className="select__item"
                                        key={idx}
                                        data-value={item.id}
                                        onClick={clicked}
                                        css={[designedSet.select_item]}
                                        whileHover={{opacity:0.5}}
                                        whileTap={{backgroundColor: "#000"}}
                                        transition={{duration:0.4}}
                                    >
                                        {item.name}
                                    </motion.span>
                                ))
                            }
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}