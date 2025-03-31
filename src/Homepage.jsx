import React, { useState, useRef } from 'react';
import './Homepage.css';

function Homepage({ goToLogin }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [postContent, setPostContent] = useState(''); 
  const [mediaFile, setMediaFile] = useState(null); 
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
  const [goLive, setGoLive] = useState(false); 
  const videoRef = useRef(null); 

  const [stories, setStories] = useState([null, null, null]);
  const [storyFile, setStoryFile] = useState(null);

  const [followedFriends, setFollowedFriends] = useState({
    'Edmar Aplaon': false,
    'Juan Miguel Donor': false,
  });

  const [joinedGroups, setJoinedGroups] = useState({
    'Software Devs': false,
  });

  const [userPosts, setUserPosts] = useState([
    {
      id: Date.now() + 1,
      name: 'Edmar Aplaon',
      content: 'sakit mag aral ng ReactJS !!',
      media: null,
      time: '2 hours ago',
      likes: 12,
      comments: ['true si julian nga e mababaliw na ', 'omsm sinabi mo pa'],
    },
    {
      id: Date.now() + 2,
      name: 'Juan Miguel Donor',
      content: 'Kpagod mag code buong araw nasa computer ba',
      media: null,
      time: '1 hour ago',
      likes: 8,
      comments: ['buti nakakakain kapa? ', 'may tulog kapa ba?'],
    },
  ]);

  const emojiOptions = ['😊', '😂', '❤️', '🎉', '😎', '🤔', '😭', '😡', '👍'];

  const handleLogout = () => {
    alert('You have been logged out!');
    goToLogin();
  };

  const handleHomeClick = () => {
    setRefreshKey((prevKey) => prevKey + 1); 
  };

 
  const handleFollow = (friendName) => {
    setFollowedFriends((prevFriends) => ({
      ...prevFriends,
      [friendName]: !prevFriends[friendName], 
    }));
  };

  const handleJoinGroup = (groupName) => {
    setJoinedGroups((prevGroups) => ({
      ...prevGroups,
      [groupName]: !prevGroups[groupName], 
    }));
  };

  const handlePostSubmit = () => {
    if (postContent.trim() === '' && !mediaFile) {
      alert('Post content or media cannot be empty!');
      return;
    }

    const newPost = {
      id: Date.now(),
      name: 'You',
      content: postContent,
      media: mediaFile,
      time: 'Just now',
      likes: 0,
      comments: [],
    };

    setUserPosts((prevPosts) => [newPost, ...prevPosts]);
    setPostContent(''); 
    setMediaFile(null); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(URL.createObjectURL(file)); 
    }
  };

  const handleStoryUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setStories((prevStories) => {
        const updatedStories = [...prevStories];
        const emptyIndex = updatedStories.findIndex((story) => story === null);
        if (emptyIndex !== -1) {
          updatedStories[emptyIndex] = imageUrl;
        }
        return updatedStories;
      });
    }
  };

  const handleEmojiSelect = (emoji) => {
    setPostContent((prevContent) => prevContent + ' ' + emoji);
    setShowEmojiPicker(false);  }

  const handleLikePost = (postId) => {
    setUserPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleCommentSubmit = (postId, comment) => {
    if (comment.trim() === '') return;

    setUserPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, comment],
            }
          : post
      )
    );
  };

  const handleDeletePost = (postId) => {
    setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleGoLive = async () => {
    setGoLive(true); 

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play(); 
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
      alert('Unable to access webcam. Please check permissions.');
      setGoLive(false); 
    }
  };

  return (
    <div className="homepage-container" key={refreshKey}>
      {}
      <div className="sidebar">
        <ul>
          <li onClick={handleHomeClick} style={{ cursor: 'pointer' }} key="home">
            🏠
          </li>
          <li key="books">📚</li>
          <li key="cart">🛒</li>
        </ul>
      </div>

      {}
      <div className="main-content">
        {}
        <div className="stories">
          <h3>Daily Stories</h3>
          <div className="stories-container">
            <div
              className="story add-story"
              onClick={() => document.getElementById('storyInput').click()}
            >
              ➕ Add Story
            </div>
            <input
              type="file"
              id="storyInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleStoryUpload}
            />
            {}
            {stories.map((story, index) => (
              <div key={index} className="story">
                {story ? (
                  <img src={story} alt={`Story ${index + 1}`} className="story-image" />
                ) : (
                  `Story ${index + 1}`
                )}
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="create-post">
          <div className="post-input-container">
            <input
              type="text"
              placeholder="Create something...?"
              className="post-input"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <button className="post-button" onClick={handlePostSubmit}>
              📢 Post
            </button>
          </div>
          <div className="post-options">
            {}
            <button onClick={handleGoLive}>📹 Go live</button>

            {}
            <button onClick={() => document.getElementById('fileInput').click()}>
              📸 Add photos/videos
            </button>
            <input
              type="file"
              id="fileInput"
              accept="image/*, video/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            {}
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              😊 Add Feeling/Activity
            </button>
          </div>

          {}
          {showEmojiPicker && (
            <div className="emoji-picker">
              {emojiOptions.map((emoji, index) => (
                <span
                  key={index}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="emoji-option"
                >
                  {emoji}
                </span>
              ))}
            </div>
          )}

          {}
          {mediaFile && (
            <div className="media-preview">
              {mediaFile.includes('image') ? (
                <img src={mediaFile} alt="Uploaded preview" className="media-preview-img" />
              ) : (
                <video src={mediaFile} controls className="media-preview-video"></video>
              )}
            </div>
          )}
        </div>

        {}
        {goLive && (
          <div className="live-video-container">
            <h3>🎥 You're live!</h3>
            <video ref={videoRef} autoPlay muted className="live-video"></video>
          </div>
        )}

        {}
        <div className="feed">
          {}
          {userPosts.map((post) => (
            <div className="post" key={post.id}>
              <h4>{post.name}</h4>
              <p>{post.content}</p>
              {post.media && (
                <div className="post-media">
                  {post.media.includes('image') ? (
                    <img src={post.media} alt="Uploaded content" className="post-img" />
                  ) : (
                    <video src={post.media} controls className="post-video"></video>
                  )}
                </div>
              )}
              <p>{post.time}</p>
              <div className="post-actions">
                <button onClick={() => handleLikePost(post.id)}>👍 Like ({post.likes})</button>
                <button onClick={() => handleDeletePost(post.id)}>❌ Delete</button>
              </div>
              {}
              <div className="comments-section">
                {post.comments.map((comment, index) => (
                  <p key={index}>💬 {comment}</p>
                ))}
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCommentSubmit(post.id, e.target.value);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {}
      <div className="right-sidebar">
        {}
        <div className="friends-suggestions">
          <h3>Friends you may know</h3>
          {Object.keys(followedFriends).map((friendName) => (
            <div className="friend" key={friendName}>
              <p>{friendName}</p>
              <button onClick={() => handleFollow(friendName)}>
                {followedFriends[friendName] ? '✅ Following' : '➕ Follow'}
              </button>
            </div>
          ))}
        </div>

        {}
        <div className="suggested-groups">
          <h3>Suggested groups</h3>
          {Object.keys(joinedGroups).map((groupName) => (
            <div className="group" key={groupName}>
              <p>{groupName}</p>
              <button onClick={() => handleJoinGroup(groupName)}>
                {joinedGroups[groupName] ? '✅ Joined' : '➕ Join Group'}
              </button>
            </div>
          ))}
        </div>

        {}
        <div className="suggested-pages">
          <h3>Suggested Pages</h3>
          <div className="page">IT Support</div>
        </div>

        {}
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
