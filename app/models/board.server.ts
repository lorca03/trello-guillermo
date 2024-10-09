import {prisma} from "~/lib/db.server";

export async function createBoard(data: {title: string; description: string; userId: number}) {
    return await prisma.board.create({
        data,
    });
}

export async function getAllBoards() {
    return await prisma.board.findMany({
        include: {
            columns: true,
            user: true,
        },
    });
}

export async function getBoardsByUserId(userId: number) {
  return await prisma.board.findMany({
    where: { userId },
    include: { columns: true },
  });
}

export async function deleteTask(id: number) {
    return await prisma.board.delete({
        where: {id},
    });
}
