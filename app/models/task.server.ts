import {prisma} from "~/lib/db.server";

export async function createTask(data: {title: string; columnId: number; priorityId: number; orderIndex: number}) {
    return await prisma.task.create({
        data,
    });
}

export async function updateTask(id: number, data: {title: string; priorityId: number}) {
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

export async function reorderTasksInColumn(columnId: number, taskIds: number[]) {
    for (let i = 0; i < taskIds.length; i++) {
        await prisma.task.update({
            where: {id: taskIds[i]},
            data: {orderIndex: i},
        });
    }
}

export async function moveTaskToColumn(taskId: number, targetColumnId: number, targetIndex: number) {
    await prisma.task.update({
        where: {id: taskId},
        data: {columnId: targetColumnId, orderIndex: targetIndex},
    });

    const tasksInTargetColumn = await prisma.task.findMany({
        where: {columnId: targetColumnId},
        orderBy: {orderIndex: "asc"},
    });

    tasksInTargetColumn.forEach(async (task, index) => {
        await prisma.task.update({
            where: {id: task.id},
            data: {orderIndex: index},
        });
    });
}
