import { useState } from 'react';
import '../styles/AuthForm.css'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { getAuthErrorMessage } from '../utils/authErrors';

const AuthForm = ({ signIn, onProfileUpdated }) => {
    const [mode, setMode] = useState('login');
    const [authError, setAuthError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthError('');
        setSubmitting(true);
        try {
            if (mode === 'signup') {
                const cred = await createUserWithEmailAndPassword(auth, email, password);
                try {
                    await updateProfile(cred.user, { displayName: username.trim() });
                    onProfileUpdated();
                } catch (profileError) {
                    console.error('Could not save username: ', profileError)
                }
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            setAuthError(getAuthErrorMessage(err.code));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='auth-form-container'>
            <div className='page-1'>
                <img src='/src/assets/tucked-away-icon.png' className='app-icon' />
                <img src='/src/assets/tucked-away-logo.png' className='app-title' />
                <p className='app-tagline'>Tuck it away. Find it again. </p>
            </div>
            <div className='page-2'>
                <h2 className="login-title">{mode === 'signup' ? 'Sign Up' : 'Login'}</h2>
                {authError && <p className="error" role='alert'>{authError}</p>}
                <form onSubmit={handleSubmit} className="login-form">
                    {mode === 'signup' && (
                        <div className="form-group">
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            autoComplete='email'
                            id="email"
                            required
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="Password"
                            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={submitting}>
                        {mode === 'signup' ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                <button className="toggle-button" type='button' onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setAuthError(''); }}>{mode === 'login' ? 'Don\'t have an account? Signup.' : 'Already have an account? Login.'}</button>
                <button onClick={() => signIn()} className="google-button">Continue with Google</button>
            </div>
        </div>
    );
};

export default AuthForm;