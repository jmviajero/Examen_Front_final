import { FunctionComponent } from "preact";
import Logout from "../islands/Logout.tsx";



type Props= {
    username: string
}

const Header: FunctionComponent<Props> = ({username}) => {
    return(
        <header class="header-container">
            <div class="header-content">
                <span class="user-name">{username}</span>
                <Logout/>
            </div>
        </header>
    )
}

export default Header