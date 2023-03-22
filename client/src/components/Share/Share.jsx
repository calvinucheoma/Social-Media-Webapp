import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from '@mui/icons-material';
import { useContext, useRef, useState } from 'react';
import { createPost, uploadImage } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { Roller } from 'react-awesome-spinners';
import './Share.css';

const Share = () => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  const desc = useRef();

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const createNewPost = async (e) => {
    e.preventDefault();

    if (!desc.current.value && !file) {
      return; // if the desc input is empty and no image file, return without doing anything
    }

    setLoading(true);

    const postDetails = {
      username: user?.username,
      desc: desc.current.value,
    };

    if (file) {
      // setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      const image = await uploadImage(formData);
      postDetails.image = image;
      // setLoading(false);
    }

    createPost(postDetails);
    desc.current.value = '';
    setFile(null);
    setLoading(false);
    // console.log(postDetails);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user?.profilePicture
                ? user.profilePicture
                : publicFolder + 'person/noAvatar.png'
            }
            alt="profileimg"
            className="shareProfileImg"
          />
          <input
            placeholder={`What's on your mind ${user?.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>

        <hr className="shareHr" />

        {file && (
          <div className="sharedImageContainer">
            <img
              src={URL.createObjectURL(file)}
              alt="sharedImage"
              className="sharedImage"
            />
            <Cancel
              className="sharedImageCancel"
              onClick={() => setFile(null)}
              htmlColor="red"
            />
          </div>
        )}

        <form className="shareBottom" onSubmit={createNewPost}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                key={file ? file.name : ''} //to prevent a file from not being able to be selected again immediately after it is cancelled, but rather other image files can be selected
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: 'none' }}
              />

              {/*This issue could be related to the fact that when you cancel the file selection, 
                the file state still holds the value of the previous selected file, which is now invalid.
                When you try to select the same file again, it doesn't trigger the onChange event of the
                input because the value of the file input has not changed.
                To fix this issue, you can add a key property to the input element with a value that 
                changes whenever the file state changes. This will force React to re-render the 
                input element and reset the value of the input element to an empty string, 
                even if the same file is selected again. Here's an example of how you can do this:
                <input
                  type="file"
                  key={file ? file.name : ''}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                In this example, the key property is set to the name of the file if it exists,
                and an empty string if it doesn't exist. This way, when the file state changes,
                the key property will also change and force the input element to re-render. 
              */}
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>

          <button type="submit" className="shareButton" disabled={loading}>
            Share
          </button>
        </form>

        {file && (
          <p style={{ marginTop: '8px', marginLeft: '20px' }}>{file.name}</p>
        )}
      </div>
      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Roller color="#3f51b5" />
        </div>
      )}
    </div>
  );
};

export default Share;
