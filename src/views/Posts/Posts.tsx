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
    ICompletePost,
    IErrors,
    IError
} from '../../models/api';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import './Posts.scss';
import SinglePost from '../../components/SinglePost/SinglePost';
import {Link} from 'react-router-dom';

interface Props {
    greeting: string;
}

const Posts = (props: Props) => {

    const {greeting} = props;

    const [completePosts, setCompletePosts] = useState<ICompletePosts>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<IErrors>([]);

    useEffect(() => {
        let posts: IPosts = [];
        let comments: IComments = [];
        let users: IUsers = [];

        greeting && console.log(`${greeting} ${Posts.displayName}`);
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
                setErrors([]);
            } catch {
                setErrors([{id: 1, errorMessage: 'An error occured. Please try again later.'}]);
            } finally {
                setIsLoading(false);
            }           
        })();

    }, [greeting]);

    return (
        <Container>
            <div className="posts">
                <h1>Posts Page:</h1>
                {isLoading && (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )} 
                {!isLoading && errors.length > 0 && errors.map((error: IError) => <p key={error.id}>{error.errorMessage}</p>)}
                {!isLoading && errors.length === 0 && completePosts.map((completePost: ICompletePost) => {
                    return (
                        <Link to={`/post/${completePost.id}`} key={completePost.id}>
                            <SinglePost
                                key={completePost.id}
                                id={completePost.id}
                                title={completePost.title}
                                user={completePost.user}
                                body={completePost.body}
                                comments={completePost.comments}
                                greeting={greeting}
                            />
                        </Link>
                    )
                })}
            </div>
        </Container>        
    );
}
Posts.displayName = 'Posts';

export default Posts;
