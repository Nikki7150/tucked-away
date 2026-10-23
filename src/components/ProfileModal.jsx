import '../styles/ProfileModal.css'

const ProfileModal = ({ setProfileModal, handleSignOut, user }) => {
    return (
        <div className='profile-container' onClick={() => setProfileModal(false)}>
            <div className='profile-modal' onClick={ (e) => e.stopPropagation() }>
                {user.photoURL ? (
                    <img src={user.photoURL} referrerPolicy='no-referrer' className='profile-picture' alt={`${user.displayName}'s profile picture`} />
                ) : (
                    <div className='profile-picture'>
                        <p className='fallback-profile-text'>{user.displayName.charAt(0) || email.charAt(0)}</p>
                    </div>
                )}
                <h2>{user.displayName}</h2>
                <p>{user.email}</p>
                <button onClick={() => handleSignOut()}>Sign Out</button>
            </div>
        </div>
    );
};

export default ProfileModal;