import React from 'react';
import './Comment.scss';

interface Props {
    email: string;
    body: string;
}

const Comment = (props: Props) => {
    const {email, body} = props;

    return (
        <div className='comment'>
            <q>{body}</q>
            <div className='user-commented'>By {email}</div>
        </div>        
    );
}

export default Comment;