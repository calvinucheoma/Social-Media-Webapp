const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

//GET USER
const getUser = async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select(
    '-password'
  ); //means ignore the password from the objects being fetched.
  //const {password,updatedAt,...other} = user._doc
  //res.status(StatusCodes.OK).json(other) //Another way of getting the user without including the password and updatedAt value

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No user with username : ${req.params.username}` });
  }

  res.status(StatusCodes.OK).json({ user });
};

//UPDATE USER
const updateUser = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No user with username : ${req.params.username}` });
  }

  if (req.body.username === req.params.username || req.body.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    await User.findOneAndUpdate(
      { username: req.body.username },
      { $set: req.body },
      { new: true, runValidators: true }
    ); //$set:req.body automatically sets all inputs inside this body

    res.status(StatusCodes.OK).json({ msg: 'Account has been updated' });
  } else {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: 'You can update only your account' });
  }
};

//DELETE USER
const deleteUser = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No user with username : ${req.params.username}` });
  }

  if (req.body.username === req.params.username || req.body.isAdmin) {
    await User.deleteOne({ username: req.params.username });

    return res
      .status(StatusCodes.OK)
      .json({ msg: 'Account has been deleted successfully' });
  } else {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: 'You can delete only your account' });
  }
};

// FOLLOW A USER
const followUser = async (req, res) => {
  const currentUser = await User.findOne({ username: req.body.username });
  const userToFollow = await User.findOne({ username: req.params.username });

  if (!userToFollow) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No params user with username : ${req.params.username}` });
  }

  if (!currentUser) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No current user with username : ${req.body.username}` });
  }

  // if (currentUser._id.toString() !== userToFollow._id.toString())
  if (currentUser.username !== userToFollow.username) {
    if (!userToFollow.followers.includes(currentUser.username)) {
      await userToFollow.updateOne({
        // $push: { followers: currentUser._id.toString() },
        $push: { followers: currentUser.username },
      });
      await currentUser.updateOne({
        // $push: { followings: userToFollow._id.toString() },
        $push: { followings: userToFollow.username },
      });
      res
        .status(StatusCodes.OK)
        .json({ msg: `Followed ${userToFollow.username}` });
    } else {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: 'You already follow this user!' });
    }
  } else {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: 'You cannot follow yourself' });
  }
};

// const followUser = async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       const currentUser = await User.findById(req.body.userId);
//       if (!user.followers.includes(req.body.userId)) {
//         await user.updateOne({ $push: { followers: req.body.userId } });
//         await currentUser.updateOne({ $push: { followings: req.params.id } });
//         res.status(200).json('user has been followed');
//       } else {
//         res.status(403).json('you allready follow this user');
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json('you cant follow yourself');
//   }
// };

//UNFOLLOW A USER
const unfollowUser = async (req, res) => {
  const currentUser = await User.findOne({ username: req.body.username });
  const userToUnfollow = await User.findOne({ username: req.params.username });

  if (!userToUnfollow) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No params user with username : ${req.params.username}` });
  }

  if (!currentUser) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No current user with username : ${req.body.username}` });
  }

  if (currentUser.username !== userToUnfollow.username) {
    if (userToUnfollow.followers.includes(currentUser.username)) {
      await userToUnfollow.updateOne({
        // $push: { followers: currentUser._id.toString() },
        $pull: { followers: currentUser.username },
      });
      await currentUser.updateOne({
        // $push: { followings: userToUnfollow._id.toString() },
        $pull: { followings: userToUnfollow.username },
      });
      res
        .status(StatusCodes.OK)
        .json({ msg: `Unfollowed ${userToUnfollow.username}` });
    } else {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: 'You do not follow this user' });
    }
  } else {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: 'You cannot unfollow yourself' });
  }
};

const getUserFollowings = async (req, res) => {
  const currentUser = await User.findOne({ username: req.params.username });

  if (!currentUser) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No user with username : ${req.params.username}` });
  }

  const friends = await Promise.all(
    currentUser.followings?.map((friendUsername) => {
      return User.findOne({ username: friendUsername }); //using find instead of findOne returns an array of the object found which makes the the _id,username and profilePicture return undefined when trying to destructure as it tries to destructure from an array of an object and not just an object
    })
  );

  // console.log(friends);

  let friendsList = [];

  friends.map((friend) => {
    console.log(friend);
    const { username, profilePicture } = friend;
    friendsList.push({ username, profilePicture });
  });

  // console.log(friendsList);

  res.status(StatusCodes.OK).json(friendsList);
};

module.exports = {
  updateUser,
  getUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUserFollowings,
};
