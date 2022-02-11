import React, {useEffect} from 'react';
import * as api from '../../api/api';
import {
    IPosts,
    IComments,
    IUsers
} from '../../models/api';

const Posts = () => {

    useEffect(() => {
        let posts: IPosts = [];
        let comments: IComments = [];
        let users: IUsers = [];

        (async () => {
            try {
                const postsAllData = await api.fetchPosts();
                const commentsAllData = await api.fetchComments();
                const usersAllData = await api.fetchUsers();

                posts = postsAllData?.data;
                comments = commentsAllData?.data;
                users = usersAllData?.data;

                console.log(posts, comments, users);
            } catch (error) {
                console.log('An error occured');
            }            
        })()

    }, []);

    return (
        <>
            <h1>Posts</h1>
        </>        
    );
}

export default Posts;