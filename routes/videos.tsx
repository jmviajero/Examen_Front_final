import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import VideoList from "../components/VideoList.tsx";
import { Video } from "../types.ts";



type State = {
    id: string,
    email: string,
    name: string
}

type Data = {
    videos: Video[],
    userid: string
}

export const handler: Handlers<Data,State> = {
    GET: async(_req:Request, ctx: FreshContext<State,Data>)=> {
        const userid = ctx.state.id

        const API_URL = Deno.env.get("API_URL")
        if (!API_URL) {
            throw new Error("No hay API_URL")
        }

        const response = await fetch (`${API_URL}/videos/${userid}`)

        if (response.status === 500) {
            return new Response("error inesperado",{
                status: 307,
                headers: {location: "/videos"}
            })
        }

        if (response.status === 404) {
            return new Response("usuario con id no encontrado",{
                status: 307,
                headers: {location: "/videos"}
            })
        }

        if (response.status !== 200) {
            return ctx.render({videos: [], userid: ""})
        }

        const videos: Video[] = await response.json()

        return ctx.render({videos:videos, userid:userid})
    }
}

const Page= (props: PageProps<Data>) => {
    return(
        <VideoList userid={props.data?.userid} videos={props.data?.videos}/>
    )
}


export default Page