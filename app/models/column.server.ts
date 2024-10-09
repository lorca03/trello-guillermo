import {prisma} from "~/lib/db.server";

export async function createColumn(data: {title: string; boardId: number}) {
    return await prisma.column.create({
        data,
    });
}

export async function getColumnsByBoardId(boardId: number) {
    return await prisma.column.findMany({
        where: {boardId},
        include: {tasks: true},
    });
}

export async function updateColumn(id: number, data: {title: string}) {
    return await prisma.column.update({
        where: {id},
        data,
    });
}

export async function deleteColumn(id: number) {
    return await prisma.column.delete({
        where: {id},
    });
}
