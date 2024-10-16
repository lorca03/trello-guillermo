import {useFetcher, useNavigate} from "@remix-run/react";
import {LayoutList, Trash2} from "lucide-react";
import {Board} from "~/lib/types";
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
} from "../ui/alert-dialog";

const BoardCard = ({board}: {board: Board}) => {
    const navigate = useNavigate();
    const fetcher = useFetcher();

    const handleDelete = (boardId: number) => {
        fetcher.submit(
            {
                boardId: boardId,
                actionType: "deleteBoard",
            },
            {method: "post"}
        );
    };
    return (
        <button
            key={board.id}
            className="h-32 rounded-lg shadow-lg border border-accent overflow-hidden transition-all duration-200 ease-in-out transform hover:scale-105"
            onClick={() => navigate(`/boards/${board.id}`)}
        >
            <div className="w-full h-full bg-gradient-to-br from-accent to-secondary p-4 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-background dark:text-text">{board.title}</h3>
                <div className="flex justify-between items-center z-10">
                    <div className="flex items-center text-gray-200 text-sm">
                        <LayoutList className="w-4 h-4 mr-2" />
                        <span>{board.columns.reduce((total, column) => total + column.tasks.length, 0)} tasks</span>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <div
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                                className="text-background hover:text-red-500 flex flex-col justify-center items-center gap-x-2"
                            >
                                <Trash2 className="h-6 w-6" />
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent className=" bg-accent text-background border-background dark:bg-secondary dark:border-text dark:text-text">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-background font-bold">Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription className="text-zinc-900">
                                    This action cannot be undone. This will permanently delete the board and all its data.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    className="bg-primary dark:hover:bg-text dark:hover:text-primary"
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleDelete(board.id);
                                    }}
                                    className="bg-red-500 dark:bg-red-500/70 hover:bg-red-600 dark:hover:bg-red-500 border-background dark:border-text border"
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </button>
    );
};

export default BoardCard;
