import { useState } from "react"
import Welcome from "./Welcome"
import VideoView from "./Video/VideoView"
import ProfileViewer from "./Video/ProfileViewer"

/* 
    This is mainly here because I didn't want to have to fiddle 
    with react router in the interest of time since there would likely only be three
    components so this is a quick and dirty hack to get some kind of content switching. 
    Normally I would spend more time planning out the flow of the app.
*/
const ContentSwitcher = ({}) => {
    const [page, setPage] = useState<"welcome" | "video"  | "browse">("welcome")
    const [userId, setUserId] = useState<number>()
    const getPage = () => {
        switch (page) {
            case "video":
                return <VideoView onSave= {() => setPage('browse')} userId={userId}/>
            case "browse" :
                return <ProfileViewer />
            default:
                return <Welcome onStart={(userId) => {
                    setUserId(userId);
                    setPage('video');
                }}/>
        }
    }

    return (
        <>
        { getPage() }
        </>
    )
}

export default ContentSwitcher