import React, {useEffect, useState} from 'react';
import * as api from '../../api/api';
import {
    IPosts,
    IPost,
    IComments,
    IComment,
    IUsers,
    IUser,
    ICompletePosts,
    ICompletePost
} from '../../models/api';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import './Posts.scss';
import SinglePost from '../../components/SinglePost/SinglePost';

const Posts = () => {

    const [completePosts, setCompletePosts] = useState<ICompletePosts>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let posts: IPosts = [];
        let comments: IComments = [];
        let users: IUsers = [];

        setIsLoading(true);

        (async () => {
            try {
                const postsAllData = await api.fetchPosts();
                const commentsAllData = await api.fetchComments();
                const usersAllData = await api.fetchUsers();

                posts = postsAllData?.data;
                comments = commentsAllData?.data;
                users = usersAllData?.data;

                const completePostsPlaceholder: ICompletePosts = posts.map((post: IPost) => {
                    return {
                        id: post.id,
                        user: users.find((user: IUser) => user.id === post.userId),
                        title: post.title,
                        body: post.body,
                        comments: comments.filter((comment: IComment) => comment.postId === post.id)
                    }
                });

                setCompletePosts(completePostsPlaceholder);
                localStorage.setItem('posts', JSON.stringify(completePostsPlaceholder));
                setIsLoading(false);
            } catch (error) {
                console.log('An error occured');
            }            
        })();
    }, []);

    return (
        <Container>
            <div className="posts">
                <h1>Posts:</h1>
                {isLoading && (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}
                {completePosts.map((completePost: ICompletePost) => <SinglePost
                    key={completePost.id}
                    id={completePost.id}
                    title={completePost.title}
                    user={completePost.user}
                    body={completePost.body}
                    comments={completePost.comments}
                />)}
            </div>
        </Container>        
    );
}

export default Posts;