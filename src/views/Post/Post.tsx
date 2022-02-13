import React, {useEffect, useState} from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as api from '../../api/api';
import {
    IPost,
    IComments,
    IUser,
    ICompletePost,
    IErrors,
    IError
} from '../../models/api';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import SinglePost from '../../components/SinglePost/SinglePost';
import './Post.scss';

export interface IMatch {
    params: {postId: string};
    isExact: boolean;
    path: string;
    url: string;
}

interface IProps extends RouteComponentProps {
    greeting: string;
    match: IMatch;
}

const Post = (props: IProps) => {

    const {greeting} = props;

    const [completePost, setCompletePost] = useState<ICompletePost>({
        id: 0,
        user: undefined,
        title: '',
        body: '',
        comments: []
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<IErrors>([]);

    useEffect(() => {

        const postId: string = props?.match?.params?.postId;

        greeting && console.log(`${greeting} ${Post.displayName}`);

        (async () => {
            try {
                setIsLoading(true);

                const postAllData = await api.fetchPost(postId);
                const userAllData = await api.fetchUser(postAllData?.data?.userId);
                const postAllComments = await api.fetchPostComments(postId);

                const post: IPost = postAllData?.data;
                const user: IUser = userAllData?.data;
                const comments: IComments = postAllComments?.data;

                const completePostPlaceholder: ICompletePost = {
                    id: post.id,
                    user: user,
                    title: post.title,
                    body: post.body,
                    comments: comments
                }

                setCompletePost(completePostPlaceholder);
                setErrors([]);
            } catch {
                setErrors([{id: 1, errorMessage: 'An error occured.'}]);
            } finally {
                setIsLoading(false);
            }           
        })();

    }, [greeting, props?.match?.params?.postId]);

    return (
        <Container>
            <div className="post">
                <h1>Single Post Page:</h1>
                {isLoading && (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}
                {!isLoading && errors.length > 0 && errors.map((error: IError) => <p key={error.id}>{error.errorMessage}</p>)}
                {!isLoading && errors.length === 0 && <SinglePost
                    key={completePost.id}
                    id={completePost.id}
                    title={completePost.title}
                    user={completePost.user}
                    body={completePost.body}
                    comments={completePost.comments}
                    greeting={greeting}
                />}
            </div>
        </Container>         
    );
}
Post.displayName = 'Post';

export default withRouter(Post);
