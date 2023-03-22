const express = require('express');
const {
  createNewPost,
  getTimelinePosts,
  updatePost,
  deletePost,
  likeAPost,
  getAPost,
  getAllUserPosts,
  uploadPostImage,
} = require('../controllers/postsController');
const router = express.Router();

//create a post
router.post('/', createNewPost);

//upload an image
router.post('/uploads', uploadPostImage);

//get timeline posts
router.get('/timeline/:username', getTimelinePosts);

//get all user's posts on user profile page
router.get('/profile/:username', getAllUserPosts);

//get a post
router.get('/:id', getAPost);

//update a post
router.put('/:id', updatePost);

//delete a post
router.delete('/:id', deletePost);

//like a post
router.put('/:id/like', likeAPost);

module.exports = router;
