const express = require('express');
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  getUserFollowings,
} = require('../controllers/userController');
const router = express.Router();

//get a user
router.get('/:username', getUser);

//update user
router.put('/:username', updateUser);

//delete user
router.delete('/:username', deleteUser);

//get user's friends/followings
router.get('/friends/:username', getUserFollowings);

//follow a user
router.put('/:username/follow', followUser);

//unfollow a user
router.put('/:username/unfollow', unfollowUser);

module.exports = router;
