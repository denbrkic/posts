import * as constants from '../constants/api';
import axios from 'axios';

export const fetchPosts = async () => {
    return await axios(`${constants.BASE_URL}${constants.POSTS}`);
}

export const fetchComments = async () => {
    return await axios(`${constants.BASE_URL}${constants.COMMENTS}`);
}

export const fetchUsers = async () => {
    return await axios(`${constants.BASE_URL}${constants.USERS}`);
}

export const fetchPost = async (postId: string) => {
    if (!postId) return;
    return await axios(`${constants.BASE_URL}${constants.POSTS}/${postId}`);
}

export const fetchUser = async (userId: number | string) => {
    if (!userId) return;
    return await axios(`${constants.BASE_URL}${constants.USERS}/${userId}`);
}

export const fetchPostComments = async (postId: string) => {
    if (!postId) return;
    return await axios(`${constants.BASE_URL}${constants.POST_COMMENTS}`.replace(':postId', postId));
}
