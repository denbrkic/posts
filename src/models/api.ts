interface IComment {
    postId: number;
    name: string;
    id: number;
    email: string;
    body: string;
}

interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
}

interface IUser {
    id: number;
    name: string;
    username: string;
    phone?: string;
    website?: string;
    email: string;
    address?: any;
    company?: any;
}

export interface IComments extends Array<IComment>{}
export interface IPosts extends Array<IPost>{}
export interface IUsers extends Array<IUser>{}
