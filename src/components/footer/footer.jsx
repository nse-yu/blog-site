/** @jsxImportSource @emotion/react */
import { jsx,css } from "@emotion/react"
import {footerSet} from "./footer_css"
import { utilSet } from "../others/util_css"

export default function Footer() {
    return (
        <>
            <footer css={[
                footerSet.footer_all,
                footerSet.footer__test,
                utilSet.verticalize
            ]}>
                footer
            </footer>
        </>
    )
}