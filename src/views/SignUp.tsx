/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { Amplify } from 'aws-amplify';
import {
    signUp,

} from '@aws-amplify/auth'
import config from '../aws-exports'

Amplify.configure(config)

type SignUpProps = {
    setScreen: (screen: string) => void;
    setUserName: (userName: string) => void;
}

export const SignUp = ({ setScreen, setUserName }: SignUpProps) => {

    const [ emailInput, setEmailInput ] = React.useState('');
    const [ passwordInput, setPasswordInput ] = React.useState('');
    const [ phoneNumberInput, setPhoneNumberInput ] = React.useState('');
    /**
     * According to AWS Cognito, The phone number must be in E.164 format. eg. "+12065550100".
     * https://stackoverflow.com/a/70838820/13073026
     *  */
    const convertToE164 = (phoneNumber: string) => phoneNumber.replace(/\D/g, '').padStart(12, '+1');

    const onSignUp = async (e: any) => {
        e.preventDefault();
        try {
            // this is all just to have a dirty quick poc obvs in real react app this all wouldn't be cool.
            const userName = emailInput;
            const password = passwordInput;
            const phoneNumber = phoneNumberInput;
            if (!userName || !password || !phoneNumber) {
                throw new Error('Missing required fields');
            }
            await signUp({
                username: userName,
                password,
                options: {
                    userAttributes: {
                        // email: userName,
                        phone_number: convertToE164(phoneNumber)
                    }
                }
            });
            setUserName(userName);
            // window.location.href = '/confirm.html?username=' + userName;
            setScreen('confirm');
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Error signing up: ' + error);
        }
    }


    return (
        <div className="container">
            <div className="background-color:blue-dcf0fb padding:32px">
                <form id="sign-up" onSubmit={onSignUp}>
                    <h2>Sign Up</h2>
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
                    <br />
                    <label htmlFor="phone-number">Phone Number</label>
                    &nbsp;
                    <input id="phone-number" name="phone-number" required
                        value={phoneNumberInput}
                        onChange={(e) => setPhoneNumberInput(e.target.value)}
                    />
                    <input type="submit" defaultValue="Sign Up" />
                </form>
            </div>
            <div style={{ marginTop: '16px', marginLeft: '10rem', border: '1px solid' }}>
                <h4>Already have an account?</h4>
                <button onClick={() => setScreen('sign-in')}>Sign In</button>
            </div>
        </div>

    )
}
