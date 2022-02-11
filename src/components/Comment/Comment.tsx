import React from 'react';
import './Comment.scss';

interface IProps {
    email: string;
    body: string;
    key: number;
}

const Comment = (props: IProps) => {
    const {email, body} = props;

    return (
        <div className='comment'>
            <q>{body}</q>
            <div className='by-user'>By {email}</div>
        </div>        
    );
}

export default Comment;