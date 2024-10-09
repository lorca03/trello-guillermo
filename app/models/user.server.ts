import {prisma} from "~/lib/db.server";

export async function createUser(data: {email: string; password: string; name: string}) {
    return await prisma.user.create({
        data,
    });
}

export async function updateUser(id: number, data: {email: string; password: string; name: string}) {
    return await prisma.user.update({
        where: {id},
        data,
    });
}

export async function deleteUser(id: number) {
    return await prisma.user.delete({
        where: {id},
    });
}
