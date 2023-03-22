import './Rightbar.css';
import { Users } from '../../dummyData';
import Online from '../Online/Online';
import { useContext, useEffect, useState } from 'react';
import { followOrUnfollowUser, getFriends } from '../../apiCalls';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { Add, Remove } from '@mui/icons-material';

const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

const Rightbar = ({ user }) => {
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);

  const [loading, setLoading] = useState(false);

  const params = useParams();

  // console.log(params);

  const [username, setUsername] = useState(params.username);

  const [isFollowed, setIsFollowed] = useState(
    currentUser?.followings.includes(username)
  );

  // console.log(username);

  useEffect(() => {
    setUsername(params.username);
    // console.log(username);
  }, [params]);

  // useEffect(() => {
  //   setIsFollowed(currentUser?.followings.includes(username));
  // }, [currentUser, username]);

  useEffect(() => {
    getFriends(username, setFriends);
  }, [username]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            src={`${publicFolder}gift.png`}
            alt="birthday img"
            className="birthdayImg"
          />

          <span className="birthdayText">
            <b>Dave</b> and <b>3 other friends</b> have birthdays today.
          </span>
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {username !== currentUser?.username && (
          <button
            className="rightbarFollowButton"
            onClick={() =>
              followOrUnfollowUser(
                isFollowed,
                username,
                currentUser,
                setIsFollowed,
                setLoading,
                dispatch
              )
            }
            disabled={loading}
          >
            {isFollowed ? 'Unfollow' : 'Follow'}
            {isFollowed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue"> {user?.user?.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue"> {user?.user?.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user?.user?.relationship === 1
                ? 'Single'
                : user?.user?.relationship === 2
                ? 'Married'
                : '-'}
            </span>
          </div>
        </div>

        <h4 className="rightbarTitle">User's Friends</h4>
        <div className="rightbarFollowings">
          {friends?.map((friend) => (
            <Link
              to={`/profile/${friend?.username}`} //omitting '/' in front of the 'profile' caused it to navigate to http://localhost:3000/profile/chioma/profile/wesley instead of http://localhost:3000/profile/wesley
              style={{ textDecoration: 'none' }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend?.profilePicture ||
                    publicFolder + 'person/noAvatar.png'
                  }
                  alt="friend img"
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">
                  {friend?.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}

        <img
          src={`${publicFolder}ads.jpg`}
          alt="ad img"
          className="rightbarAd"
        />

        <h4 className="rightbarTitle">Online Friends</h4>

        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rightbar;
