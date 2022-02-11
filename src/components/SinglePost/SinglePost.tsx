import React from 'react';
import './SinglePost.scss';
import {ICompletePost} from '../../models/api';

const SinglePost = (props: ICompletePost) => {
    const {title, body, user, comments} = props;

    return (
        <div className="single-post">
            <h2>{title}</h2>
            <p>{body}</p>
            <small>{user && `By ${user?.username}`}</small>
        </div>        
    );
}

export default SinglePost;