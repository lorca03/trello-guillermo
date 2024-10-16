import {Avatar} from "../components/ui/avatar";
import {User as UserIcon, LogOut} from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {ActionFunction, json, LoaderFunction} from "@remix-run/node";
import {getBoardsByUserId} from "~/models/board.server";
import {redirect, useLoaderData} from "@remix-run/react";
import NewBoard from "~/components/Board/NewBoard";
import {handleBoardActions} from "~/lib/boardActions";
import BoardCard from "~/components/Board/Board";
import type {Board} from "~/lib/types";
import {requireAuthCookie} from "~/lib/auth";
import {Button} from "~/components/ui/button";
import {getUserById} from "~/models/user.server";
import type {User} from "~/lib/types";

export const loader: LoaderFunction = async ({request}) => {
    try {
        let userId = await requireAuthCookie(request);
        const boards = await getBoardsByUserId(parseInt(userId));
        const user = await getUserById(parseInt(userId));
        return json({boards: boards, user: user});
    } catch (error) {
        console.error("Error in loader:", error);
        return error;
    }
};

export const action: ActionFunction = async ({request}) => {
    const formData = await request.formData();
    const actionType = formData.get("actionType") as string;
    await handleBoardActions(actionType, formData);
    return "";
};

export default function Home() {
    const {boards, user}: {boards: Board[]; user: User} = useLoaderData<typeof loader>();

    return (
        <div className="min-h-screen bg-gradient-to-br from-foreground to-primary dark:bg-gradient-to-br dark:from-background dark:to-accent p-8 text-text">
            <header className="mb-8 flex items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 ring-2 ring-accent shadow-lg flex items-center justify-center">
                        <UserIcon className="w-8 h-8 text-accent" />
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold text-text">My Workspace</h1>
                        <p className="text-sm text-text/30">{user.name}</p>
                    </div>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="text-text flex flex-col justify-center items-center gap-x-2">
                            <LogOut className="h-8 w-8" />
                            <span>Log out</span>
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className=" bg-accent text-background border-background dark:bg-secondary dark:border-text dark:text-text">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-background font-bold">Log Out</AlertDialogTitle>
                            <AlertDialogDescription className="text-zinc-900">Are you sure you want to log out?</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="bg-primary dark:hover:bg-text dark:hover:text-primary">Cancel</AlertDialogCancel>
                            <form method="post" action="/logout">
                                <Button
                                    className="bg-red-500 dark:bg-red-500/70 hover:bg-red-600 dark:hover:bg-red-500 border-background dark:border-text border"
                                    type="submit"
                                >
                                    Log Out
                                </Button>
                            </form>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </header>
            <h2 className="text-xl font-semibold text-text mb-4 px-4">My Boards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 h-full p-4 ">
                {boards.map((board) => (
                    <BoardCard key={board.id} board={board} />
                ))}
                <NewBoard userId={user.id} />
            </div>
        </div>
    );
}
