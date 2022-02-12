import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import * as api from '../../api/api';
import {
    IPost,
    IComments,
    IUser,
    ICompletePost
} from '../../models/api';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import SinglePost from '../../components/SinglePost/SinglePost';
import './Post.scss';

const Post = (props: any) => {

    const {greeting} = props;

    const [completePost, setCompletePost] = useState<ICompletePost>({
        id: 0,
        user: undefined,
        title: '',
        body: '',
        comments: []
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let post: IPost;
        let comments: IComments = [];
        let user: IUser;
        const postId: string = props?.match?.params?.postId;

        greeting && console.log(`${greeting} ${Post.displayName}`);

        (async () => {
            try {
                setIsLoading(true);

                const postAllData = await api.fetchPost(postId);
                const userAllData = await api.fetchUser(postAllData?.data?.userId);
                const postAllComments = await api.fetchPostComments(postId);

                post = postAllData?.data;
                user = userAllData?.data;
                comments = postAllComments?.data;

                const completePostPlaceholder: ICompletePost = {
                    id: post.id,
                    user: user,
                    title: post.title,
                    body: post.body,
                    comments: comments
                }

                setCompletePost(completePostPlaceholder);
                
            } catch {
                console.log('An error occured');
            } finally {
                setIsLoading(false);
            }           
        })();

    }, [greeting, props?.match?.params?.postId]);

    return (
        <Container>
            <div className="post">
                <h1>Single Post Page:</h1>
                {isLoading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : <SinglePost
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
