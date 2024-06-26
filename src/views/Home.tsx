/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

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
            <div className="container">
                {/*                 <button id="create-post" onClick={onCreatePost}>
                    Create Post
                </button> */}
                <div className="posts" />
                <form id="create-post" onSubmit={onCreatePost}>
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
                    <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
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
