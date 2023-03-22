import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Post from '../Post/Post';
import Share from '../Share/Share';
import './Feed.css';
import { Ring } from 'react-awesome-spinners';
// import { Posts } from '../../dummyData';

const Feed = ({ username }) => {
  const { user } = useContext(AuthContext);

  const baseURL = process.env.REACT_APP_URL;

  const url = username
    ? `posts/profile/${username}`
    : `posts/timeline/${user.username}`;

  const [loading, setLoading] = useState(true);

  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(async () => {
    const response = await axios.get(url, { baseURL });
    setPosts(
      response.data.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      })
    );
    setLoading(false);
  }, [url, baseURL, posts]);

  //useCallback was used to prevent unnecessary re-rendering of the component.
  //By memoizing the 'fetchPosts' function so that it is only recreated
  //if one of its dependencies changes, which in this case is the url and baseURL variables
  //This can potentially improve performance by preventing unnecessary re-renders of the component.
  //when using useEffect and seeting 'posts' as part of the dependency array,
  //I noticed that the posts kept on re-rendering in the network section of the console when
  //the user was on his/her profile section which reduced the site performance
  //and if i decided to remove 'posts' from the dependency array, the function would not be called
  //each time the post changed and as such you would have to refresh the site each time you make a post to be able to see it

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await axios.get(url, { baseURL });
  //     // console.log(response);
  //     setPosts(
  //       response.data.sort((post1, post2) => {
  //         return new Date(post2.createdAt) - new Date(post1.createdAt); //compares the dates of the posts in our database using the createdAt property they have
  //       })
  //     );
  //     setLoading(false);
  //   };
  //   fetchPosts();
  // }, [url, baseURL]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user?.username) && <Share />}
        {/* {Posts.map((post) => (
          <Post key={post.id} post={post} />
        ))} */}
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
            }}
          >
            <Ring />
          </div>
        ) : (
          posts.map((post) => <Post key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Feed;
