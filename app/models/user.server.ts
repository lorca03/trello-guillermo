import {prisma} from "~/lib/db.server";
import bcrypt from "bcrypt";

export async function registerUser(email: string, name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {email, name, password: hashedPassword},
    });
    return user;
}

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({where: {email}});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid email or password");
    }
    return user;
}

export async function getUserById(id: number) {
    return prisma.user.findUnique({where: {id}});
}
