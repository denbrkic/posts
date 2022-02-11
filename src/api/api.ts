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
