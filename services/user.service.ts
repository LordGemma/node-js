import { v4 as uuidv4 } from 'uuid';
import { User, UserData } from '../models/users.interface';

const users: User[] = [];

export const getAllUsers = async (): Promise<User[]> => users;

export const getUser = async (id: string): Promise<User | undefined> =>
    users.find((user: User) => user.id === id);

export const getUserIndex = async (id: string): Promise<number> => users.findIndex((user: User) => user.id === id);

export const addUser = async (userData: UserData): Promise<User> => {
    const id = uuidv4();
    const newUser = {
        id,
        ...userData,
        isDeleted: false
    };

    users.push(newUser);

    return newUser;
};

export const updateUser = async (
    id: string,
    newData: UserData
): Promise<User | null> => {
    const userIndex = await getUserIndex(id);

    if (userIndex === -1) {
        return null;
    }

    const updatedUser = {
        ...users[userIndex],
        ...newData
    };

    users[userIndex] = updatedUser;

    return updatedUser;
};

export const deleteUser = async (id: string): Promise<null | void> => {
    const userIndex = await getUserIndex(id);

    if (userIndex === -1) {
        return null;
    }

    users[userIndex].isDeleted = true;
};
