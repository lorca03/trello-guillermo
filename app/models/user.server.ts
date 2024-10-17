import { prisma } from "~/lib/db.server";
import argon2 from "argon2";

export async function registerUser(email: string, name: string, password: string) {
    const hashedPassword = await argon2.hash(password);
    const user = await prisma.user.create({
        data: { email, name, password: hashedPassword },
    });
    return user;
}

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await argon2.verify(user.password, password))) {
        throw new Error("Invalid email or password");
    }
    return user;
}

export async function getUserById(id: number) {
    return prisma.user.findUnique({ where: { id } });
}
