import { FunctionComponent } from "preact";
import { Video } from "../types.ts";
import Fav from "../islands/Fav.tsx";




type Data = {
    videos: Video[],
    userid: string
}

const VideoList: FunctionComponent<Data>= ({videos, userid}) => {

    return(
        <div class="video-page-container">
            <h1 class="video-list-title">Curso Deno Fresh</h1>
            <div class="video-list-container">
                {videos.map((video)=>(
                    <div class="video-item" data-fresh-key={video.id}>
                        <a href={"/video/"+video.id} class="video-link">
                            <img src={video.thumbnail} alt={video.title} class="video-thumbnail"/>
                            <div class="video-info">
                                <h3 class="video-title">{video.title}</h3>
                                <p class="video-description">{video.description}</p>
                                <p class="video-release-date">Release date: {new Date(video.date).toLocaleDateString()}</p>
                            </div>
                        </a>
                        <Fav id={video.id} fav={video.fav} userid={userid}/>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default VideoList
