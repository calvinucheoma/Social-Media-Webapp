require('dotenv').config();
require('express-async-errors');

//express
const express = require('express');
const app = express();

//rest of the packages
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//database
const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');

//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('common'));
app.use(
  fileUpload({ useTempFiles: true, limits: { fileSize: 12 * 1024 * 1024 } }) //12MB
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8800;

const start = async () => {
  try {
    await connectDB(process.env.MONGOOSE_URL);
    app.listen(port, (url) => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
