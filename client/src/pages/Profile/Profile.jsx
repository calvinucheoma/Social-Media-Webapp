import axios from 'axios';
import { useEffect, useState } from 'react';
import Feed from '../../components/Feed/Feed';
import Leftbar from '../../components/Leftbar/Leftbar';
import Rightbar from '../../components/Rightbar/Rightbar';
import Topbar from '../../components/Topbar/Topbar';
import './Profile.css';
import { useParams } from 'react-router';

const Profile = () => {
  const [user, setUser] = useState({});

  const params = useParams();

  // console.log(params);

  const username = params.username;

  const baseURL = process.env.REACT_APP_URL;

  const url = `users/${username}`;
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(url, { baseURL });
      // console.log(response); ALWAYS CHECK WHAT YOU'RE GETTING BACK FROM YOUR RESPONSE!!!
      setUser(response.data);
    };
    fetchUser();
  }, [url, baseURL]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileRightCover">
              <img
                className="profileRightCoverImg"
                // src={`${publicFolder}posts/10.jpeg`}
                src={
                  user?.user?.coverPicture ||
                  publicFolder + 'person/noCover.jpg'
                }
                alt="post img"
              />
              <img
                className="profileRightUserImg"
                // src={`${publicFolder}person/main.jpg`}
                src={
                  user?.user?.profilePicture ||
                  publicFolder + 'person/noAvatar.png'
                }
                alt="user img"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.user?.username}</h4>
              <span className="profileInfoDesc">{user?.user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
