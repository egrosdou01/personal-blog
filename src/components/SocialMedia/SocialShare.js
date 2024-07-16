import React from 'react';
import {
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  XIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import styles from './SocialShare.module.css';

const SocialShare = ({ title, url }) => {
  return (
    <div className="social-share">
      <p className={styles.shareText}>SHARE</p>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={25} round />
      </LinkedinShareButton>
      <TwitterShareButton url={url} title={title}>
        <XIcon size={25} round />
      </TwitterShareButton>
      <RedditShareButton url={url} title={title}>
        <RedditIcon size={25} round />
      </RedditShareButton>
      <EmailShareButton url={url} subject={title} body={`Check out this post: ${url}`}>
        <EmailIcon size={25} round />
      </EmailShareButton>
    </div>
  );
};

export default SocialShare;