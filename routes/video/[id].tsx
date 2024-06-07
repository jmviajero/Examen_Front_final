import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Vide from "../../components/Vide.tsx";
import { Video } from "../../types.ts";



type State = {
    id: string,
    email: string,
    name: string
}

type Data = {
    video: Video,
    userid: string
}

export const handler:Handlers<Data,State> =  {
    GET: async(_req:Request, ctx: FreshContext<State,Data>) => {
        const userid = ctx.state.id

        const idvideo = ctx.params.id

        const API_URL = Deno.env.get("API_URL")
        if (!API_URL) {
            throw new Error("No hay API_URL")
        }

        const response = await fetch (`${API_URL}/video/${userid}/${idvideo}`)

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
            return new Response("error no controlado",{
                status: 307,
                headers: {location: "/videos"}
            })
        }
        
        const video:Video = await response.json()
        return ctx.render({video: video, userid:userid })

    }
}

const Page = (props: PageProps<Data>) => {
    return(
        <Vide userid={props.data.userid} video={props.data.video}/>
    )
}

export default Page