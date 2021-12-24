import { useContext, useEffect, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import './Login.css';
import {
    createUserWithEmailAndPassword,
    getAuth, signInWithPopup, GoogleAuthProvider,
    signInWithEmailAndPassword, updateProfile
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { margin } from '@mui/system';
const app = initializeApp(firebaseConfig)
function Login() {
    const [information, setInformation] = useState({
        isSignIn: false,
        displayName: '',
        email: '',
        password: '',
        ConfirmPassWord: '',
        photo: '',
        error: '',
        success: false,

    });
    let navigate = useNavigate();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [data, setData] = useContext(UserContext);
    const [checkBox, setCheckBox] = useState(false);

    const googleProvider = new GoogleAuthProvider()
    const handleGoogle = () => {
        const auth = getAuth();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user.displayName);
                setData(user);
                navigate(from);
            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(credential);
            });
    };
    const onBlur = (e) => {
        let isFormValid = true
        if (e.target.name == 'email') {
            isFormValid = /^\S+@\S+\.\S+$/.test(e.target.value)
        }
        if (e.target.name == 'password' || e.target.name == 'ConfirmPassWord') {
            const sixUp = e.target.value.length > 6
            const oneDigit = /\d{1}/.test(e.target.value)
            isFormValid = sixUp && oneDigit
        }
        if (isFormValid || e.target.name === "name") {
            const userData = { ...information }
            userData[e.target.name] = e.target.value
            setInformation(userData);
        }
    };
    const currentUser = (name) => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: name,
        }).then((res) => {
            // Profile updated!
            console.log(res);
            // ...
        }).catch((error) => {
            // An error occurred
            console.log(error);
            // ...
        });
    }
    const fatalFunction = () => {
        setData(information);
    }
    const handleSubmite = (e) => {
        if (checkBox && information.email && information.password) {
            if (information.password === information.ConfirmPassWord) {
                const auth = getAuth()
                createUserWithEmailAndPassword(auth, information.email, information.password)
                    .then(success => {
                        const user = success.user;
                        const informationData = { ...information };
                        informationData.success = true;
                        informationData.error = '';
                        setInformation(informationData);
                        currentUser(information.displayName);
                        fatalFunction();
                        console.log(user);
                        navigate(from);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        const informationData = { ...information };
                        informationData.error = errorMessage;
                        informationData.success = '';
                        setInformation(informationData);
                        console.log(errorMessage);
                        // ..
                    })

            }
            else {
                alert("Confirm Password is'n match!!")
            }
        }
        if (!checkBox && information.email && information.password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, information.email, information.password)
                .then(success => {
                    console.log(success);
                    const data = success.user;
                    const informationData = { ...information };
                    informationData.success = true;
                    informationData.error = '';
                    setInformation(informationData);
                    setData(data);
                    navigate(from);
                    console.log(data);
                    // ...
                })
                .catch((error) => {
                    const data = error;
                    console.log(data);
                    const errorMessage = error.message;
                    const informationData = { ...information };
                    informationData.error = errorMessage;
                    informationData.success = '';
                    setInformation(informationData);
                });
        };
        e.preventDefault()
    }
    const style = {
        padding: "5px 10px",
        margin: "5px"
    };
    const style1 = {
        width: "180px",
        height: "30px",
        margin: "5px",
        color: "white",
        borderRadius: "5px",
        backgroundColor: "red",
        border: "none"
    };
    return (
        <div className="App">
            <br />
            <label htmlFor="checkBox">Create An New Account</label>
            <form action="" onSubmit={handleSubmite} className='form'>
                {
                    checkBox ? <p>Create an account</p> : <p>Login</p>
                }
                {
                    checkBox && <input type="text" style={style} name="displayName" onBlur={onBlur} placeholder="Your Name" required />
                }
                <br />
                <input style={style} type="text" name="email" onBlur={onBlur} placeholder="Your Email" required />
                <br />
                <input type="password" style={style} name="password" onBlur={onBlur} placeholder="Your Password" required />
                <br />
                {
                    checkBox && <input type="password" style={style} name="ConfirmPassWord" onBlur={onBlur} placeholder="Confirm PassWord" required />
                }
                <br />
                {
                    checkBox ? <input type="submit" style={style1} value="Create an account" /> : <input style={style1} type="submit" value="Login" />
                }
                <br />
                <div>
                    {
                        checkBox ? <p>have an account?<u onClick={() => setCheckBox(!checkBox)}>Log in</u></p> : <p>don't have an account?<u onClick={() => setCheckBox(!checkBox)}>Create an account</u></p>
                    }
                </div>
            </form>
            {/* ==================================================== */}
            <button onClick={handleGoogle} style={{borderRadius: "10px 10px 10px 10px", padding: "0px 20px", background: "white"}}><GoogleIcon style={{paddingRight: "30px", color: "blue"}}/> continue with google</button>
            {information.error && <p style={{backgroundColor:"black", color: "white", padding: "10px"}}>{information.error}</p>}
        </div>
    )
}

export default Login
