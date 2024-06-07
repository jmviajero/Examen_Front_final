import { FunctionComponent } from "preact";



const Register: FunctionComponent<{message: string}> = ({message}) => {

    return(
        <div class="register-container">
            <h2>Register</h2>
            {message && <p class="error-message">{message}</p>}
            <form action="/register" method="POST">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required/>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required/>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required></input>
                <button type="submit">Register</button>
                <p class="register-link">Already have an account? 
                    <a href="/login">Login</a>
                </p>
            </form>
        </div>
    )
}

export default Register