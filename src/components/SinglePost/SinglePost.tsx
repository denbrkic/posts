import React from 'react';
import './SinglePost.scss';
import {ICompletePost, IComment} from '../../models/api';
import Comment from '../Comment/Comment';

const SinglePost = (props: ICompletePost) => {
    const {title, body, user, comments} = props;

    return (
        <div className="single-post">
            <h2>{title}</h2>
            <p>{body}</p>
            <small>{user && `By ${user?.username}`}</small>
            <div className='comments'>
                <h3>Comments:</h3>
                {comments.map((comment: IComment) => <Comment email={comment.email} body={comment.body} />)}
            </div>
        </div>        
    );
}

export default SinglePost;