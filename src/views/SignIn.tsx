/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { signIn } from "aws-amplify/auth"


type SignInProps = {
    setScreen: (screen: string) => void;
    setUserName: (userName: string) => void;
}


export const SignIn = ({ setScreen, setUserName }: SignInProps) => {

    const [ emailInput, setEmailInput ] = React.useState('');
    const [ passwordInput, setPasswordInput ] = React.useState('');

    const onSignIn = async (e: any) => {
        e.preventDefault();
        try {
            const userName = emailInput;
            const password = passwordInput;
            if (userName.length < 1 || password.length < 1) {
                throw new Error('Missing required fields');
            }
            await signIn({ username: userName, password });
            setUserName(userName);
            setScreen('home');
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Error signing in: ' + error);
        }
    }


    return (
        <div className="container">
            <div>
                <form id="sign-in" onSubmit={onSignIn}>
                    <h2>Sign In</h2>
                    <label htmlFor="email">Email</label>
                    &nbsp;
                    <input id="email" name="email" required type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                    />
                    &nbsp;
                    <label htmlFor="password">Password</label>
                    &nbsp;
                    <input id="password" name="password" required type="password" autoComplete="current-password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    &nbsp;
                    <input type="submit" defaultValue="Sign In" />
                </form>
            </div>
            <div style={{ marginTop: '16px', marginLeft: '10rem', border: '1px solid' }}>
                <h4>Don't have an account?</h4>
                <button onClick={() => setScreen('sign-up')}>Sign Up</button>
            </div>
        </div>

    )
}
