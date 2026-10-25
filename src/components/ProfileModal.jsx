import '../styles/ProfileModal.css'

const ProfileModal = ({ setProfileModal, handleSignOut, user, items }) => {
    const totalCards = items?.length;
    const favoriteCards = items.filter(item => item.favorite).length;
    const memberSince = new Date(user.metadata.creationTime).toLocaleDateString();

    return (
        <div className='profile-container' onClick={() => setProfileModal(false)} role='dialog' aria-modal='true'>
            <div className='profile-modal' onClick={ (e) => e.stopPropagation() }>
                <h3 className='modal-head'>PROFILE</h3>
                {user.photoURL ? (
                    <img src={user.photoURL} referrerPolicy='no-referrer' className='profile-picture' alt={`${user.displayName}'s profile picture`} />
                ) : (
                    <div className='profile-picture'>
                        <p className='fallback-profile-text'>{user.displayName?.charAt(0) || user.email.charAt(0)}</p>
                    </div>
                )}
                <h2 className='profile-name'>{user.displayName}</h2>
                <p className='profile-email'>{user.email}</p>
                <p className='profile-time'>{memberSince}</p>
                <div className='stats-div'>
                    <p className='stats-card'>{totalCards} {totalCards === 1 ? 'card' : 'cards'}</p>
                    <p className='stats-card'>{favoriteCards} {favoriteCards === 1 ? 'favorite' : 'favorites'}</p>
                </div>
                <button onClick={() => handleSignOut()} className='sign-out-button'>Sign Out</button>
                <button onClick={() => setProfileModal(false)} className='close-button'>X  CLOSE</button>
            </div>
        </div>
    );
};

export default ProfileModal;