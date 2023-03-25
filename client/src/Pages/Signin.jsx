import React, { useEffect, useState } from 'react';
import { AiOutlineGoogle, AiOutlineTwitter, AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { backend_url } from './BackendURL';
import { Box, Heading, Input } from '@chakra-ui/react';
import jwt_decode from "jwt-decode";



const init = {
    email: '',
    password: ''
};

const Signin = () => {
    const [formData, setFormData] = useState(init);
    const navigate = useNavigate();
    const [first, setFirst] = useState({});


    /*google login*/
    const handleCallbackResponse = (response) => {
        var userObject = jwt_decode(response.credential);
        setFirst(userObject);
        document.getElementById("signInDiv").hidden = true;
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id:
                "514340861987-f7tbdfd063bbb72d0452dm5je7onj1vj.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });
        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
            theme: "outline",
            size: "large",
        });
    }, []);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let { email, password } = formData;
        if (email == '' || password == '') {
            alert('Please Fill * required Field')
            return;
        };
        if (email.includes('@') === false && email !== '') {
            alert('Email not Correct Formate');
            return;
        };

        try {
            let res = await fetch(`${backend_url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    mode: 'no-cors'
                },
                body: JSON.stringify(formData)
            });
            res = await res.json();
            if (res) {
                if (res.msg === "Invalid Credentials") {
                    alert(`${res.msg}`);
                } else if (res.msg === "Login Successful") {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('email', formData.email);
                    alert(`${res.msg}`);
                    navigate('/');
                }
            }

            setFormData({
                email: '',
                password: ''
            });
        } catch (err) {
            console.log(err);
        }
    };

    if (first.email_verified) {
        alert(`Login Successful with ${first.name}`);
        localStorage.setItem('username', first.name);
        localStorage.setItem('src', first.picture);
        navigate('/');
    };

    const { email, password } = formData;
    return (
        <Box style={{ textAlign: 'center' }}>
            <Heading mb="10px" style={{ textAlign: "center" }}>Login For Existing Users</Heading>
            <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
                <Box className='input-icons'>
                    <i className="fa fa-envelope icon"></i>
                    <Input className='input-field' w="300px" type={"email"} placeholder="Email" value={email} name="email" onChange={handleChange} />
                    {email.includes('@') === false ? <p style={{color: "red"}}>Not valid email*</p> : null}
                </Box>
                <Box className='input-icons'>
                    <i className="fa fa-key icon"></i>
                    <Input className='input-field' w="300px" type={"password"} value={password} name="password" placeholder='Password' onChange={handleChange} />
                </Box>
                <Input w="300px" style={{ backgroundColor: "blue", color: "white", border: "none", borderRadius: "10px", padding: "10px" }} type={"submit"} value="Login" />
            </form>
            <p style={{ marginTop: "14px" }}>or continue with these social profile</p>

            <Box mt="10px" display={"flex"} justifyContent="center" alignItems={"center"} id="signInDiv"></Box>

            <Box m="0px 0 8px 0" display={"flex"} justifyContent="center" alignItems={"center"} gap="5px">
                <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiOutlineGoogle /></a>
                <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiFillFacebook /> </a>
                <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiOutlineTwitter /> </a>
                <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiFillGithub /></a>
            </Box>
            <p>Cerate an account? <Link style={{ textDecoration: "none", color: "green" }} to={'/signup'}>Register</Link>  </p>
        </Box>
    );
}

export default Signin;