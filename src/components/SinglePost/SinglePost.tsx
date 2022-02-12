import React, {useEffect} from 'react';
import './SinglePost.scss';
import {ICompletePost, IComment} from '../../models/api';
import Comment from '../Comment/Comment';

interface IProps extends ICompletePost {
    key: number | undefined;
    greeting: string;
}

const SinglePost = (props: IProps) => {
    const {title, body, user, comments, greeting} = props;

    useEffect(() => {
        greeting && console.log(`${greeting} ${SinglePost.displayName}`);
    }, [greeting]);

    return (
        <div className="single-post">
            <h2>{title}</h2>
            <p>{body}</p>
            <small>{user && `By ${user?.username}`}</small>
            <div className='comments'>
                <h3>Comments:</h3>
                {comments?.map((comment: IComment) => <Comment email={comment.email} body={comment.body} key={comment.id} greeting={greeting} />)}
            </div>
        </div>        
    );
}
SinglePost.displayName = 'SinglePost';

export default SinglePost;
