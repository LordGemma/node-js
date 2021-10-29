export interface User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export interface UserData {
    login: string;
    password: string;
    age: number;
}
