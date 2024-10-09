import {prisma} from "~/lib/db.server";

export async function getAllPriorities() {
    return await prisma.priority.findMany();
}
