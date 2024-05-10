/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { confirmSignUp } from '@aws-amplify/auth'


type ConfirmProps = {
    setScreen: (screen: string) => void;
    userName: string;

}



export const Confirm = ({ setScreen, userName }: ConfirmProps) => {
    const [ confirmationCodeInput, setConfirmationCodeInput ] = React.useState('');




    const onConfirm = async (e: any) => {
        e.preventDefault();
        try {
            const confirmationCode = confirmationCodeInput;
            if (!confirmationCode) {
                throw new Error('Missing required fields');
            }
            await confirmSignUp({
                username: userName,
                confirmationCode,
            });
            setScreen('sign-in');
        } catch (error) {
            console.error('Error confirming sign up:', error);
            alert('Error confirming sign up: ' + error);
        }
    }


    return (
        <div className="container">
            <div className="background-color:blue-dcf0fb padding:32px">
                <form id="confirm-form" onSubmit={onConfirm}>
                    <h3>Confirm Account</h3>
                    <label htmlFor="email">Confirmation Code</label>&nbsp;
                    <input id="confirm" name="confirm" required 
                        value={confirmationCodeInput}
                        onChange={(e) => setConfirmationCodeInput(e.target.value)}
                    /> <br />
                    <small><em>Check your email for the confirmation code</em></small>
                    <br /><input type="submit" defaultValue="Confirm" />
                </form>
            </div>
        </div>

    )
}