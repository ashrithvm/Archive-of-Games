import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();

        console.log("HERE")
        
        const username = e.target.form[0].value;
        const password = e.target.form[1].value;

        //send username and password to backend
        
        const payload = {
            "username": username,
            "password": password,
        }

        const data = JSON.stringify(payload);

        fetch(`http://localhost:5050/api/login`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'POST',
            body: data,
        }).then(res => {
            if(res.status === 200){
                //login valid
                navigate("/")
            }else if(res.status === 201){
                //invalid login
                alert("Incorrect username or password");
            }
        })
    }

    return(
        <div id="login" className="user-forms">
            <form action="">
                <h1>Login:</h1>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </div>
                <button type="submit" className="btn-primary" onClick={(e) => {login(e)}}>Login</button>
            </form>
        </div>
    );
}

export default Login;