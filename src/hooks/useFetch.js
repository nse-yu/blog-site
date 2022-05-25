import { useEffect } from "react"
import { useState } from "react"

export function useFetch(){
    const [articles,setArticles] = useState({})

    useEffect(() => {
        fetch("http://localhost:8080/article/all")
            .then(res => res.json())
            .then(setArticles)
            .catch(err => {console.error(err)})
    },[])

    return {articles}
}