/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import {footerSet} from "./footer_css"
import { utilSet } from "../others/util_css"
import { motion } from "framer-motion"
import { useResource } from "../ResourceProvider"
import { Link } from "react-router-dom"

export default function Footer({themes}) {
    const {tabs_json,activeTab,activeTabChanged,wordChanged} = useResource()

    return (
        <>
            <footer css={[
                footerSet.footer_all,
                utilSet.horizontalize,
                themes
            ]}>
                <section className="footer__category-list" css={[utilSet.verticalize,{gap:"1rem"}]}>
                    <h1>Category</h1>
                    <ul css={[utilSet.verticalize,utilSet.list_reset,{gap:"0.3rem"}]}>
                        {tabs_json.map((item,index) => (
                            <Link
                                className="nav-tab__item"
                                key={index}
                                to={`/category/${item.name}`}
                                onClick={() => {
                                    wordChanged("")
                                    if(activeTab.id && activeTab.name) return 
                                    activeTabChanged({id:item.id,name:item.name})
                                }}
                            >
                                <motion.li
                                    whileHover={{opacity:0.3,scale:1.13}}
                                    data-id={item.id}
                                    data-name={item.name}
                                    css={themes}
                                >
                                    {item.name}
                                </motion.li>
                            </Link>
                        ))}
                    </ul>
                </section>
                <section className="footer__myInfo" css={[utilSet.verticalize,utilSet.horizontalize___right]}>
                    <div>宮本武蔵</div>
                    <div>日本</div>
                    <div>020-3810-6341</div>
                </section>
                <section className="footer__media" css={[utilSet.horizontalize]}>
                    <div className="footer__media-logo">
                        <motion.a 
                            href="https://twitter.com/nagachon0000"
                            whileHover={{opacity:0.3}}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                                css={themes}
                            >
                                <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm3.193 7c-1.586 0-2.872 1.243-2.872 2.777 0 .217.025.43.074.633a8.251 8.251 0 0 1-5.92-2.902c-.247.41-.389.887-.389 1.397 0 .963.507 1.813 1.278 2.311a2.94 2.94 0 0 1-1.301-.348v.036c0 1.345.99 2.467 2.304 2.723a2.98 2.98 0 0 1-1.298.047c.366 1.103 1.427 1.906 2.683 1.928a5.889 5.889 0 0 1-3.567 1.19c-.231 0-.46-.014-.685-.04A8.332 8.332 0 0 0 9.903 18c5.283 0 8.172-4.231 8.172-7.901 0-.12-.002-.24-.008-.36A5.714 5.714 0 0 0 19.5 8.302a5.869 5.869 0 0 1-1.65.437 2.8 2.8 0 0 0 1.263-1.536 5.87 5.87 0 0 1-1.824.674A2.915 2.915 0 0 0 15.193 7z"/>
                            </svg>
                        </motion.a>
                    </div>
                    <div className="footer__media-logo">
                        <motion.a 
                            href="https://www.facebook.com/profile.php?id=100051614810790"
                            whileHover={{opacity:0.3}}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                                css={themes}
                            >
                                <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm4 7.278V4.5h-2.286c-2.1 0-3.428 1.6-3.428 3.889v1.667H8v2.777h2.286V19.5h2.857v-6.667h2.286L16 10.056h-2.857V8.944c0-1.11.572-1.666 1.714-1.666H16z"/>
                            </svg>
                        </motion.a>
                    </div>
                    <div className="footer__media-logo">
                        <motion.a 
                            href="" 
                            whileHover={{opacity:0.3}}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                                css={themes}
                            >
                                <path d="M12 0c6.6274 0 12 5.3726 12 12s-5.3726 12-12 12S0 18.6274 0 12 5.3726 0 12 0zm3.115 4.5h-6.23c-2.5536 0-4.281 1.6524-4.3805 4.1552L4.5 8.8851v6.1996c0 1.3004.4234 2.4193 1.2702 3.2359.7582.73 1.751 1.1212 2.8818 1.1734l.2633.006h6.1694c1.3004 0 2.389-.4234 3.1754-1.1794.762-.734 1.1817-1.7576 1.2343-2.948l.0056-.2577V8.8851c0-1.2702-.4234-2.3589-1.2097-3.1452-.7338-.762-1.7575-1.1817-2.9234-1.2343l-.252-.0056zM8.9152 5.8911h6.2299c.9072 0 1.6633.2722 2.2076.8166.4713.499.7647 1.1758.8103 1.9607l.0063.2167v6.2298c0 .9375-.3327 1.6936-.877 2.2077-.499.4713-1.176.7392-1.984.7806l-.2237.0057H8.9153c-.9072 0-1.6633-.2722-2.2076-.7863-.499-.499-.7693-1.1759-.8109-2.0073l-.0057-.2306V8.885c0-.9073.2722-1.6633.8166-2.2077.4712-.4713 1.1712-.7392 1.9834-.7806l.2242-.0057h6.2299-6.2299zM12 8.0988c-2.117 0-3.871 1.7238-3.871 3.871A3.8591 3.8591 0 0 0 12 15.8408c2.1472 0 3.871-1.7541 3.871-3.871 0-2.117-1.754-3.871-3.871-3.871zm0 1.3911c1.3609 0 2.4798 1.119 2.4798 2.4799 0 1.3608-1.119 2.4798-2.4798 2.4798-1.3609 0-2.4798-1.119-2.4798-2.4798 0-1.361 1.119-2.4799 2.4798-2.4799zm4.0222-2.3589a.877.877 0 1 0 0 1.754.877.877 0 0 0 0-1.754z"/>
                            </svg>
                        </motion.a>
                    </div>
                </section>
            </footer>
        </>
    )
}