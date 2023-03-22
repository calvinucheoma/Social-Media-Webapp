import { MoreVert } from '@mui/icons-material';
import './Post.css';
// import { Users } from '../../dummyData';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link, useLocation } from 'react-router-dom';
import { likePost } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Post = ({ post }) => {
  // const [like, setLike] = useState(post.like);
  const [like, setLike] = useState(post.likes.length);

  const [isLiked, setIsLiked] = useState(false);

  const [user, setUser] = useState({});

  const location = useLocation();
  // console.log(location);

  const baseURL = process.env.REACT_APP_URL;

  const url = `users/${post.username}`;

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser?.username));
  }, [currentUser?.username, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(url, { baseURL });
      // console.log(response);
      setUser(response.data);
    };
    fetchUser();
  }, [url, baseURL]);

  const likeHandler = () => {
    likePost(post._id, { username: currentUser.username });
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {location.pathname.startsWith('/profile') ? (
              <img
                src={
                  user?.user?.profilePicture ||
                  publicFolder + 'person/noAvatar.png'
                }
                alt="profileImg"
                className="postProfileImg"
              />
            ) : (
              <Link to={`profile/${user?.user?.username}`}>
                <img
                  // src={
                  //   publicFolder +
                  //   Users.filter((user) => user.id === post.userId)[0]
                  //     .profilePicture
                  // }
                  src={
                    user?.user?.profilePicture ||
                    publicFolder + 'person/noAvatar.png'
                  }
                  alt="profileImg"
                  className="postProfileImg"
                />
              </Link>
            )}

            <span className="postUsername">
              {/* {Users.filter((user) => user.id === post.userId)[0].username} */}
              {user?.user?.username}
            </span>
            <span className="postDate">{format(post?.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            // src={publicFolder + post?.photo}
            // src={publicFolder + 'posts/' + post?.image}
            src={post?.image || publicFolder + 'posts/' + post?.image}
            alt="post img"
            className="postImg"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${publicFolder}like.png`}
              alt="like icon"
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src={`${publicFolder}heart.png`}
              alt="heart icon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post?.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
