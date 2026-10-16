import '../styles/ProfileModal.css'

const ProfileModal = ({ setProfileModal, handleSignOut, user }) => {
    return (
        <div className='profile-container' onClick={() => setProfileModal(false)}>
            <div className='profile-modal' onClick={ (e) => e.stopPropagation() }>
                <img src={user.photoURL} referrerPolicy='no-referrer' className='profile-picture' alt={`${user.displayName}'s profile picture`} />
                <h2>{user.displayName}</h2>
                <p>{user.email}</p>
                <button onClick={() => handleSignOut()}>Sign Out</button>
            </div>
        </div>
    );
};

export default ProfileModal;