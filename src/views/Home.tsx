/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import logo from '../assets/logo.svg';

type HomeProps = {
    pullData: () => void;
    onCreatePost: (e: any) => Promise<void>;
}

export const Home = ({ pullData, onCreatePost }: HomeProps) => {



    React.useEffect(() => {
        pullData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <header className="header">
                <img src={logo} alt="Binaryville logo" className="logo" />
                <div>
                    <button id="sign-out" className="hidden">Sign Out</button>
                </div>
                <div className="hidden logged-in">
                    <a href="/sign-in.html" id="sign-in" className="button">Sign In</a>
                    <a href="/sign-up.html" id="sign-up" className="button">Sign Up</a>
                </div>
            </header>
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
