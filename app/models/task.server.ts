import {prisma} from "~/lib/db.server";

export async function createTask(data: {title: string; columnId: number; priorityId: number}) {
    return await prisma.task.create({
        data,
    });
}

export async function updateTask(id: number, data: {title: string; columnId: number; priorityId: number}) {
    return await prisma.task.update({
        where: {id},
        data,
    });
}

export async function deleteTask(id: number) {
    return await prisma.task.delete({
        where: {id},
    });
}
