export const edit_tools = [
    {
        id:1,
        tool:"text",
        markdown:<><polyline points='4 7 4 4 20 4 20 7'></polyline><line x1='9' y1='20' x2='15' y2='20'></line><line x1='12' y1='4' x2='12' y2='20'></line></>,
        desc:"キーボード入力"
    },
    {
        id:2,
        tool:"bold",
        markdown:<><path d='M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z'></path><path d='M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z'></path></>,
        desc:`**moji**（空白無し）`,
        helper:"****"
    },
    {
        id:3,
        tool:"link（外部リンク）",
        markdown:<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></>,
        desc:"[moji](url)（空白無し）",
        helper:"[link](http://)"
    },
    {
        id:4,
        tool:"italic（斜体）",
        markdown:<><path d='M19 4h-9M14 20H5M14.7 4.7L9.2 19.4'/></>,
        desc:`*moji*（空白無し）`,
        helper:"**"
    },
    {
        id:5,
        tool:"strikethrough（取り消し線）",
        markdown:<><path d="M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7 0-5.3.7-5.3 3.6 0 1.5 1.8 3.3 3.6 3.9h.2m8.2 3.7c.3.4.4.8.4 1.3 0 2.9-2.7 3.6-6.2 3.6-2.3 0-4.4-.3-6.2-.9M4 11.5h16"/></>,
        desc:"~~moji~~（空白無し）",
        helper:"~~~~"
    },
    {
        id:6,
        tool:"picture（画像）",
        markdown:<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/></>,
        desc:`![alt](url)（空白無し）`,
        helper:"![image](http://)"
    },
    {
        id:7,
        tool:"todo（TODOリスト）",
        markdown:<><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></>,
        desc:`未完了：* [ ] moji
        完了済：* [x] moji
        （* と [] と mojiの間に半角空白あり）`,
        helper:"* [ ] hoge"
    },
    {
        id:8,
        tool:"table（表）",
        markdown:<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M21 12H3M12 3v18"/></>,
        desc:`| a | b |
        | - | - |`,
        helper:`| / | a | b |\n| - | - | - |\n| row1 | val1 | val2 |
        `
    },
    {
        id:9,
        tool:"new line（改行）",
        markdown:<><path d="M14 9l6 6-6 6"/><path d="M4 4v7a4 4 0 0 0 4 4h11"/></>,
        desc:`半角スペース×２`,
        helper:"  \r\n"
    },
    {
        id:10,
        tool:"head（見出し）",
        markdown:<><path d="M9 3 V 25 M9 12 Q 16 11 16 19 V 23 Q 20 24 21 20"></path></>,
        desc:`h1：# moji
        h2：## moji
        h3：### moji
        h4：#### moji
        （# と mojiの間に半角スペースあり）`,
        helper:"# hoge"
    },
    {
        id:11,
        tool:"dot list（箇条書き）",
        markdown:<><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></>,
        desc:`* moji（* と mojiの間に半角スペースあり,複数の箇条書きは改行される）`,
        helper:"* hoge"
    },
    {
        id:12,
        tool:"horizon（水平線）",
        markdown:<><line x1="5" y1="12" x2="19" y2="12"></line></>,
        desc:`***
        ---
        ___（アンダーバー３つ）`,
        helper:"***"
    },
    {
        id:13,
        tool:"annotation（注釈）",
        markdown:<><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></>,
        desc:`moji[^注釈number]
        [^注釈number]: moji-annotated`,
        helper:`hoge[^1]  
        [^1]: hogehoge`
    },
    {
        id:14,
        tool:"blank line（空行）",
        markdown:<><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></>,
        desc:`  &#13;  （前後に半角スペース２つ、その後改行必須）`,
        helper:`  &#13;  
        `
    }
]