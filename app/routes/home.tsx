import {Avatar, AvatarFallback, AvatarImage} from "../components/ui/avatar";
import {Plus, CheckCircle2, User, LogOut} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {json, LoaderFunction} from "@remix-run/node";
import {getBoardsByUserId} from "~/models/board.server";
import {useLoaderData, useNavigate} from "@remix-run/react";
import {Board} from "~/lib/types";

export const loader: LoaderFunction = async () => {
    const userId = 1; // Hardcoded for now
    const boards = await getBoardsByUserId(userId);
    return json(boards);
};

export default function Home() {
    const navigate = useNavigate();
    const boards: Board[] = useLoaderData<typeof loader>();

    const handleLogOut = () => {
        console.log("Logged Out");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-foreground to-primary dark:bg-gradient-to-br dark:from-background dark:to-accent p-8 text-text">
            <header className="mb-8 flex items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 ring-2 ring-accent shadow-lg flex items-center justify-center">
                        <User className="w-8 h-8 text-accent" />
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold text-text">My Workspace</h1>
                        <p className="text-sm text-text/30">Guillermo</p>
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
                            <AlertDialogAction
                                onClick={handleLogOut}
                                className="bg-red-500 dark:bg-red-500/70 hover:bg-red-600 dark:hover:bg-red-500 border-background dark:border-text border"
                            >
                                Log Out
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </header>
            <h2 className="text-xl font-semibold text-text mb-4 px-4">My Boards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 h-full p-4 ">
                {boards.map((board) => (
                    <button
                        key={board.id}
                        className="h-32 rounded-lg shadow-lg border border-accent overflow-hidden transition-all duration-200 ease-in-out transform hover:scale-105"
                        onClick={() => navigate(`/boards/${board.id}`)}
                    >
                        <div className="w-full h-full bg-gradient-to-br from-accent to-secondary p-4 flex flex-col justify-between">
                            <h3 className="text-lg font-semibold text-background dark:text-text">{board.title}</h3>
                            <div className="flex items-center text-gray-200 text-sm">
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                <span>{board.id} tasks</span>
                            </div>
                        </div>
                    </button>
                ))}
                <button className="h-32 rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-700 hover:text-slate-500 hover:border-slate-500 transition-colors duration-200">
                    <Plus className="w-6 h-6 mr-2" />
                    <span>New Board</span>
                </button>
            </div>
        </div>
    );
}
