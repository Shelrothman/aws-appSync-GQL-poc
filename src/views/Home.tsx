/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { signOut } from '@aws-amplify/auth';

type HomeProps = {
    pullData: () => void;
    onCreatePost: (e: any) => Promise<void>;
    userName: string;
    setScreen: (screen: string) => void;
}

export const Home = ({ pullData, onCreatePost, userName, setScreen }: HomeProps) => {

    // console.log('userName:', userName)

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

    React.useEffect(() => {
        pullData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="container">
                <button id="create-post" onClick={onCreatePost}>
                    Create Post
                </button>
                <div className="posts" />
                <form id="create-post" className="form hidden background-color:blue-dcf0fb padding:32px">
                    <h2>Create New Post</h2>
                    <div>
                        <label htmlFor="description">
                            Photo Description
                        </label>
                        <input id="description" type="text" style={{
                            backgroundColor: '#ffffff',
                            borderColor: '#4c5b5c',
                            borderRadius: '0',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            color: '#483e40',
                            minHeight: 'form-input',
                            padding: '12px',
                            width: '100%',
                        }} />

                    </div>
                    <div>
                        <label htmlFor="img">
                            Photo Upload
                        </label>
                        <input type="file" id="img" accept=".jpg,.png" />
                    </div>
                    <input type="submit" defaultValue="Create Post" />
                </form>
            </div>
        </div>
    )
}
