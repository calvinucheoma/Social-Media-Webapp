const path = require('path'); //always place the path first
const Post = require('../models/Post');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

//CREATE A NEW POST
const createNewPost = async (req, res) => {
  const newPost = await new Post(req.body);

  try {
    const savedPost = await newPost.save();

    res.status(StatusCodes.OK).json(savedPost);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

//UPDATE A POST
const updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });

  if (!post) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No post with id : ${req.params.id}` });
  }

  if (post.username === req.body.username) {
    await post.updateOne({ $set: req.body });
    res.status(StatusCodes.OK).json({ msg: 'Post has been updated' });
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'You can update only your post' });
  }
};

//DELETE A POST
const deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });

  if (!post) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No post with id : ${req.params.id}` });
  }

  if (post.username === req.body.username) {
    await post.deleteOne();
    res.status(StatusCodes.OK).json({ msg: 'Post has been deleted' });
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'You can delete only your post' });
  }
};

//LIKE AND DISLIKE A POST
const likeAPost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });

  if (!post) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No post with id : ${req.params.id}` });
  }

  if (!req.body.username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please specify the user interacting with the post' });
  }

  if (!post.likes.includes(req.body.username)) {
    await post.updateOne({ $push: { likes: req.body.username } });
    res
      .status(StatusCodes.OK)
      .json({ msg: `Post has been liked by ${req.body.username} ` });
  } else {
    await post.updateOne({ $pull: { likes: req.body.username } });
    res
      .status(StatusCodes.OK)
      .json({ msg: `Post has been disliked by ${req.body.username}` });
  }
};

//GET A POST
const getAPost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });

  if (!post) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No post with id : ${req.params.id}` });
  }

  res.status(StatusCodes.OK).json(post);
};

//GET ALL POSTS ON USER TIMELINE
const getTimelinePosts = async (req, res) => {
  const currentUser = await User.findOne({ username: req.params.username });

  if (!currentUser) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No user with username: ${req.params.username}` });
  }

  const userPosts = await Post.find({ username: currentUser.username });

  const friendsPosts = await Promise.all(
    currentUser.followings?.map((friendUsername) => {
      return Post.find({ username: friendUsername });
    })
  );

  //if we do not use Promise.all(), we would not get all the friends posts so we use it when we are using a loop

  //   console.log(usersFollowing);

  //   const friendPosts = await Promise.all(
  //     currentUser.followings.map((friendId) => {
  //       return Post.find({ userId: friendId });
  //     })
  //   );

  res.status(StatusCodes.OK).json(userPosts.concat(...friendsPosts));
};

//GET ALL USERS POSTS ON PROFILE PAGE
const getAllUserPosts = async (req, res) => {
  const currentUser = await User.findOne({ username: req.params.username });

  if (!currentUser) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No user with username: ${req.params.username}` });
  }

  const userPosts = await Post.find({ username: currentUser.username });

  res.status(StatusCodes.OK).json(userPosts);
};

//UPLOAD A POST IMAGE
const uploadPostImage = async (req, res) => {
  if (!req.files || !req.files.image) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'No image file provided' });
  }

  const file = req.files.image;

  const fileType = file.mimetype.split('/')[1];

  if (!['png', 'jpg', 'jpeg'].includes(fileType)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Invalid file type' });
  }

  if (file.size > 12 * 1024 * 1024) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'File size exceeds the limit of 12MB' });
  }

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    use_filename: true,
    folder: 'Chuks Social Media Webapp',
    format: fileType,
  });
  console.log(result);
  fs.unlinkSync(req.files.image.tempFilePath); //to remove the image from our tmp folder after upload
  return res.status(StatusCodes.OK).json({
    msg: 'Image uploaded successfully',
    image: { src: result.secure_url },
  });
};

module.exports = {
  createNewPost,
  updatePost,
  deletePost,
  getAPost,
  getTimelinePosts,
  likeAPost,
  getAllUserPosts,
  uploadPostImage,
};
