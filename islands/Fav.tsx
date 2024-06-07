import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";


type Props = { 
    id: string,
    fav: boolean,
    userid: string
}

const Fav:FunctionComponent<Props> = ({id, fav, userid}) => {
    const [favourite, setfavourite] = useState<boolean>(fav)

    const tofav = async (userid: string, id: string) => {
        const response = await fetch (`${Deno.env.get("API_URL")}/fav/${userid}/${id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        })

        if (response.status == 200) {
            setfavourite(!fav)
        }
        else {
            throw new Error("Ha ocurrido un error")
        }
    }

    return(
        <button onClick={()=>tofav(userid,id)} class="fav-button">
            {favourite? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
        </button>
    )
}

export default Fav