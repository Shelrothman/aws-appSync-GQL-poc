import React from 'react';
import './App.css';
import { Amplify } from "aws-amplify";
import { DataStore } from 'aws-amplify/datastore';
import { Post } from './models';
import amplifyconfig from "./aws-exports.js";
import { Home } from './views/Home.js';
import { SignUp } from './views/SignUp.js';
import { SignIn } from './views/SignIn.js';

import { Confirm } from './views/Confirm.js';

Amplify.configure(amplifyconfig);


function App() {
    const [ screen, setScreen ] = React.useState("home");
    const [ userName, setUserName ] = React.useState("");

    React.useEffect(() => {
        pullData()
    }, []);

    // React.useEffect(() => {
    //     if (userName.length > 1) {
    //         setScreen("home")
    //     }
    // }, [ userName ]);

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

    return (
        <>
            {(screen === "home" && userName.length < 1) && <>
                <button onClick={() => setScreen("sign-in")}>Sign In</button>
                <br />
                <br />
                <button onClick={() => setScreen("sign-up")}>Sign Up</button>
            </>}
            {(screen === "home" && userName.length > 1) && <Home pullData={pullData} onCreatePost={onCreatePost} />}
            {screen === "sign-up" && <SignUp setScreen={setScreen} setUserName={setUserName} />}
            {screen === "confirm" && <Confirm setScreen={setScreen} userName={userName} />}
            {screen === "sign-in" && <SignIn setScreen={setScreen} setUserName={setUserName} />}
        </>
    )
}

export default App
