import { FunctionComponent } from "preact";


const Logout: FunctionComponent = () => {
    const onLogout = () => {
        document.cookie = "auth=; path=/;"
        document.location.href = "/login"
    }

    return(<a  onClick={()=>onLogout()} class="logout-button">Logout</a>)
}

export default Logout