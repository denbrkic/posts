import React, {useEffect} from 'react';
import './Comment.scss';

interface IProps {
    email: string;
    body: string;
    key: number;
    greeting: string;
}

const Comment = (props: IProps) => {
    const {email, body, greeting} = props;

    useEffect(() => {
        greeting && console.log(`${greeting} ${Comment.displayName}`);
    }, [greeting]);

    return (
        <div className='comment'>
            <q>{body}</q>
            <div className='by-user'>By {email}</div>
        </div>        
    );
}
Comment.displayName = 'Comment';

export default Comment;
