export interface IBlogs {
    id: string | number,
    postedBy: string,
    topic: string,
    date: Date,
    message: string,
    checkRights: boolean
}

export interface IUsers {
    id: string | number,
    username: string,
    email: string,
    password: string
}