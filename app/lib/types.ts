export type User = {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    boards: Board[];
};

export type Board = {
    id: number;
    title: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    columns: Column[];
};

export type Column = {
    id: number;
    title: string;
    boardId: number;
    createdAt: Date;
    updatedAt: Date;
    board: Board;
    tasks: Task[];
};

export type Task = {
    id: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    priorityId: number;
    columnId: number;
    column: Column;
    orderIndex: number;
    priority: Priority;
};

export type Priority = {
    id: number;
    level: string;
    tasks: Task[];
};

export interface FormData {
    title: string;
    priority: string;
}
