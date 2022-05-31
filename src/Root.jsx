import { useResource } from "./components/ResourceProvider"

export default function Root() {
    const {tabs_json} = useResource()
    window.location = "/category/"+tabs_json[0].name
    return <></>
}