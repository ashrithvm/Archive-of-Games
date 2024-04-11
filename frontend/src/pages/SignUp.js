const SignUp = () => {
    const signup = (e) => {
        e.preventDefault();

        console.log("HERE")
        
        const username = e.target.form[0].value;
        const password = e.target.form[1].value;
        const repeatPassword = e.target.form[2].value;
        const firstname = e.target.form[3].value;
        const lastname = e.target.form[4].value;
        const email = e.target.form[5].value;

        if(password !== repeatPassword){
            alert("Passwords do not match");
        }

        //send username and password to backend
        
        const payload = {
            "username": username,
            "password": password,
            "email": email,
            "firstname": firstname,
            "lastname": lastname
        }

        const data = JSON.stringify(payload);

        fetch(`http://localhost:5050/api/signup`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: 'POST',
            body: data,
        }).then(res => {
            console.log(res);
        })
        // show errors if errors

        // redirect if no errors
    }

    return(
        <div id="signIn" className="user-forms">
            <form action="">
                <h1>Sign Up:</h1>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div>
                    <label htmlFor="repeatPassword">Repeat Password:</label>
                    <input type="password" name="repeatPassword" id="repeatPassword" />
                </div>
                <div>
                    <label htmlFor="firstname">First Name:</label>
                    <input type="firstname" name="firstname" id="firstname" />
                </div>
                <div>
                    <label htmlFor="lastname">Last Name:</label>
                    <input type="lastname" name="lastname" id="lastname" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" />
                </div>
                <button type="submit" className="btn-primary" onClick={(e) => {signup(e)}}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;