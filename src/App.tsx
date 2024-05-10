import React from 'react';
import './App.css';
import { Amplify } from "aws-amplify";
import { getCurrentUser, AuthUser, signOut } from '@aws-amplify/auth';
import { DataStore } from 'aws-amplify/datastore';
import { Post } from './models';
import amplifyconfig from "./aws-exports.js";
import { Home } from './views/Home.js';
import { SignUp } from './views/SignUp.js';
import { SignIn } from './views/SignIn.js';
import logo from './assets/logo.svg';
import { Confirm } from './views/Confirm.js';

Amplify.configure(amplifyconfig); // potentially be better in main.tsx


function App() {
    const [ screen, setScreen ] = React.useState("home");
    const [ userName, setUserName ] = React.useState("");
    const [ currentUser, setCurrentUser ] = React.useState<AuthUser | null>(null);

    React.useEffect(() => {
        pullData();
        handleAuthentication();
    }, []);

    React.useEffect(() => {
        if (currentUser && currentUser.signInDetails?.loginId) {
            console.log('currentUser:', currentUser);
            setUserName(currentUser.signInDetails.loginId);
            setScreen("home");
        } else {
            console.log('No current user');
            setScreen("sign-in");
        }
    }, [ currentUser ]);

    const handleAuthentication = async () => {
        try {
            const userResponse = await getCurrentUser();
            if (!userResponse) {
                return;
            }
            setCurrentUser(userResponse);
        } catch (error) {
            console.error('Error:', error)
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onCreatePost = async (e: any) => {
        e.preventDefault()
        try {
            const newPost = await DataStore.save(new Post({
                description: "Felt cute, might delete later",
                image: "https://binaryville.com/images/characters/dolores-disc.png"
            }))
            console.log('Post created:', newPost)
        } catch (error) {
            console.error('Error creating post:', error)
        }
    }

    const pullData = async () => {
        try {
            const posts = await DataStore.query(Post);
            console.log('Posts:', posts)
        } catch (error) {
            console.error('Error pulling data:', error)
        }
    }

    const onSignOut = async () => {
        try {
            const confirm = window.confirm(`Are you sure you want to sign out from ${userName}`);
            if (!confirm) return;
            await signOut();
            setScreen('sign-in');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    return (
        <>
            <header>
                {(screen === "home" && userName.length < 1) && <>
                    <button onClick={() => setScreen("sign-in")}>Sign In</button>
                    <br />
                    <br />
                    <button onClick={() => setScreen("sign-up")}>Sign Up</button>
                </>}
                <img src={logo} alt="Binaryville logo" className="logo" />
                {userName.length > 1 && <button id="sign-out" onClick={onSignOut}>
                    Sign Out
                </button>}
            </header>
            <div className="container" style={{ marginTop: '5rem' }}>
                {(screen === "home" && userName.length > 1) && <Home
                    pullData={pullData}
                    onCreatePost={onCreatePost}
                    userName={userName}
                    setScreen={setScreen}
                />}
                {screen === "sign-up" && <SignUp
                    setScreen={setScreen} setUserName={setUserName}
                />}
                {screen === "confirm" && <Confirm
                    setScreen={setScreen} userName={userName}
                />}
                {screen === "sign-in" && <SignIn
                    setScreen={setScreen} setUserName={setUserName}
                />}
            </div>
        </>
    )
}

export default App;
