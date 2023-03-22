import {
  Bookmark,
  Chat,
  Event,
  Group,
  HelpOutline,
  RssFeed,
  School,
  VideoLibrary,
  WorkOutline,
} from '@mui/icons-material';
import { Users } from '../../dummyData';
import CloseFriends from '../CloseFriends/CloseFriends';
import './Leftbar.css';

const Leftbar = () => {
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <li className="leftbarListItem">
            <RssFeed htmlColor="orange" className="leftbarIcon" />
            <span className="leftbarListItemText">Feed</span>
          </li>
          <li className="leftbarListItem">
            <Chat htmlColor="skyblue" className="leftbarIcon" />
            <span className="leftbarListItemText">Chats</span>
          </li>
          <li className="leftbarListItem">
            <VideoLibrary htmlColor="blueviolet" className="leftbarIcon" />
            <span className="leftbarListItemText">Videos</span>
          </li>
          <li className="leftbarListItem">
            <Group htmlColor="gray" className="leftbarIcon" />
            <span className="leftbarListItemText">Groups</span>
          </li>
          <li className="leftbarListItem">
            <Bookmark htmlColor="blue" className="leftbarIcon" />
            <span className="leftbarListItemText">Bookmarks</span>
          </li>
          <li className="leftbarListItem">
            <HelpOutline htmlColor="red" className="leftbarIcon" />
            <span className="leftbarListItemText">Questions</span>
          </li>
          <li className="leftbarListItem">
            <WorkOutline htmlColor="slateblue" className="leftbarIcon" />
            <span className="leftbarListItemText">Jobs</span>
          </li>
          <li className="leftbarListItem">
            <Event htmlColor="pink" className="leftbarIcon" />
            <span className="leftbarListItemText">Events</span>
          </li>
          <li className="leftbarListItem">
            <School htmlColor="green" className="leftbarIcon" />
            <span className="leftbarListItemText">Courses</span>
          </li>
        </ul>

        <button className="leftbarButton">Show more</button>

        <hr className="leftbarHr" />

        <ul className="leftbarFriendList">
          {Users.map((user) => (
            <CloseFriends key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leftbar;
