import './CloseFriends.css';

const CloseFriends = ({ user }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="leftbarFriend">
      <img
        src={publicFolder + user.profilePicture}
        alt="friend profile dp"
        className="leftbarFriendImage"
      />
      <span className="leftbarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriends;
