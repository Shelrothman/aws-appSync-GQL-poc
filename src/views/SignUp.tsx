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
                    <h3 className="font-size:28px font-weight:500 line-height:1.142 color:blue-265f8e margin-bottom:16px">
                        Sign Up
                    </h3>
                    <label className="color:blue-265f8e display:block padding-bottom:8px font-size:14px font-weight:500" htmlFor="email">
                        Email
                    </label>
                    <input id="email" name="email" required type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                    />
                    <label className="color:blue-265f8e display:block padding-bottom:8px font-size:14px font-weight:500" htmlFor="password">
                        Password
                    </label>
                    <input id="password" name="password" required type="password" autoComplete="current-password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    <br />
                    <label className="color:blue-265f8e display:block padding-bottom:8px font-size:14px font-weight:500" htmlFor="phone-number">
                        Phone Number
                    </label>
                    <input id="phone-number" name="phone-number" required
                        value={phoneNumberInput}
                        onChange={(e) => setPhoneNumberInput(e.target.value)}
                    />
                    <input type="submit" defaultValue="Sign Up" />
                </form>
            </div>
        </div>

    )
}
