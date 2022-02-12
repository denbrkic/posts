export interface IComment {
    postId: number;
    name: string;
    id: number;
    email: string;
    body: string;
}

export interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface IUser {
    id: number;
    name: string;
    username: string;
    phone?: string;
    website?: string;
    email: string;
    address?: any;
    company?: any;
}

export interface ICompletePost {
    id: number;
    user: IUser | undefined;
    title: string;
    body: string;
    comments: IComments
}

export interface IError {
    id: number;
    isError?: boolean;
    errorMessage: string;
}

export interface IComments extends Array<IComment>{}
export interface IPosts extends Array<IPost>{}
export interface IUsers extends Array<IUser>{}
export interface ICompletePosts extends Array<ICompletePost>{}
export interface IErrors extends Array<IError>{}
