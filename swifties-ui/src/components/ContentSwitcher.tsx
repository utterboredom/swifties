import { useState } from "react"
import Welcome from "./Welcome"
import VideoView from "./Video/VideoView"

/* 
    This is mainly here because I didn't want to have to fiddle 
    with react router in the interest of time since there would likely only be three
    components so this is a quick and dirty hack to get some kind of content switching. 
    Normally I would spend more time planning out the flow of the app.
*/
const ContentSwitcher = ({}) => {
    const [page, setPage] = useState<"welcome" | "video"  | "browse">("welcome")

    const getPage = () => {
        switch (page) {
            case "video":
                return <VideoView/>
            default:
                return <Welcome onStart={() => setPage('video')}/>
        }
    }

    return (
        <>
        { getPage() }
        </>
    )
}

export default ContentSwitcher