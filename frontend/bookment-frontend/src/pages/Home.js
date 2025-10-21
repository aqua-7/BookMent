import React from 'react';

function Home() {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#f5f6fa',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1 style={{ color: '#2d3436', fontSize: '3rem', marginBottom: '1rem' }}>
                Welcome to BookMent
            </h1>
            <p style={{ color: '#636e72', fontSize: '1.25rem', maxWidth: '500px', textAlign: 'center' }}>
                Your personal book management platform. Organize, track, and discover your favorite books with ease.
            </p>
            <div style={{ marginTop: '2rem' }}>
                <a
                    href="/login"
                    style={{
                        padding: '0.75rem 2rem',
                        background: '#0984e3',
                        color: '#fff',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        marginRight: '1rem'
                    }}
                >
                    Login
                </a>
                <a
                    href="/register"
                    style={{
                        padding: '0.75rem 2rem',
                        background: '#00b894',
                        color: '#fff',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}
                >
                    Register
                </a>
            </div>
        </div>
    );
}

export default Home;