import React, {useEffect, useState} from 'react';
import * as api from '../../api/api';
import {
    IPosts,
    IPost,
    IComments,
    IComment,
    IUsers,
    IUser,
    ICompletePosts
} from '../../models/api';

const Posts = () => {

    const [completePosts, setCompletePosts] = useState<ICompletePosts>([]);

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

                const combinedPostsPlaceholder: ICompletePosts = posts.map((post: IPost) => {
                    return {
                        id: post.id,
                        user: users.find((user: IUser) => user.id === post.userId),
                        title: post.title,
                        body: post.body,
                        comments: comments.filter((comment: IComment) => comment.postId === post.id)
                    }
                });

                setCompletePosts(combinedPostsPlaceholder);
            } catch (error) {
                console.log('An error occured');
            }            
        })();
    }, []);

    return (
        <>
            <h1>Posts</h1>
        </>        
    );
}

export default Posts;