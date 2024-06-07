import { FreshContext, Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import Register from "../components/Register.tsx";
import { User } from "../types.ts";
import jwt from "npm:jsonwebtoken"


export const config: RouteConfig = {
    skipInheritedLayouts: true
}

export type Data = {
    message: string
}

export const handler: Handlers = {
    POST: async (req:Request, ctx: FreshContext<unknown, Data>) => {
        const url = new URL(req.url)
        const form = await req.formData()
        const email = form.get("email")?.toString() || ""
        const password = form.get("password")?.toString() || ""
        const name = form.get("name")?.toString() || ""

        const JWT_SECRET = Deno.env.get("JWT_SECRET")
        if (!JWT_SECRET) {
            throw new Error("no hay palabra secreta")
        }

        const response = await fetch (`${Deno.env.get("API_URL")}/register`,{
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({email,password, name})
        })

        if (response.status == 400) {
            return ctx.render({message: "Hay un usuario con el mismo correo"})
        }

        if (response.status == 200) {
            const Data : Omit<User, "password"| "favs"> = await response.json()
            
            const token = jwt.sign({
                email,
                id: Data.id,
                name: Data.name
            },
            JWT_SECRET,
            {
                expiresIn: "24h"
            })

            const headers = new Headers()
            setCookie(headers,{
                name: "auth",
                value: token,
                sameSite: "Lax",
                domain: url.hostname,
                path: "/",
                secure: true
            })

            headers.set("location", "/videos")

            return new Response (null, {
                status: 303,
                headers
            })
        }

        else{
            return ctx.render()
        }
    }
}

const Page = (props: PageProps<{message: string}>) => {
    return(<Register message={props.data?.message}/>)
}
export default Page