import {Plus, MoreHorizontal, Clock, ArrowLeft} from "lucide-react";
import {Button} from "../components/ui/button";
import {Card, CardContent} from "../components/ui/card";
import {ScrollArea} from "../components/ui/scroll-area";
import {json, useLoaderData, useNavigate} from "@remix-run/react";
import {ActionFunction, LoaderFunction} from "@remix-run/node";
import {getBoardById} from "~/models/board.server";
import type {Board} from "~/lib/types";
import Task from "~/components/Task";
import AlertForm from "~/components/AlertForm";
import {createTask} from "~/models/task.server";
import {handleBoardActions} from "../lib/boardActions";

export const loader: LoaderFunction = async ({params}) => {
    const boardId = parseInt(params.id as string, 10);
    const board = await getBoardById(boardId);
    return json(board);
};

export const action: ActionFunction = async ({request}) => {
    const formData = await request.formData();
    const actionType = formData.get("actionType") as string;
    await handleBoardActions(actionType, formData);
    return "";
};

export default function Board() {
    const navigate = useNavigate();
    const board: Board = useLoaderData<typeof loader>();

    return (
        <div className="min-h-screen bg-gradient-to-br from-foreground to-primary dark:bg-gradient-to-br dark:from-background dark:to-accent p-8 text-text">
            <header className="mb-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="px-4">
                        <Button onClick={() => navigate("/home")} className="rounded-lg text-gray-200 ">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Boards
                        </Button>
                    </div>
                    <span className="mb-2 text-xl text-text font-bold">{board.title}</span>
                </div>
            </header>

            <div className="flex space-x-4 overflow-x-auto pb-4 p-4">
                <div className="flex gap-x-4">
                    {board.columns.map((column, index) => (
                        <Card key={column.id} className="w-80 bg-slate-700 dark:bg-slate-900 border-primary dark:border-primary shadow-lg">
                            <CardContent className="p-4">
                                <h2 className="mb-4 text-lg font-semibold text-gray-200">{column.title}</h2>
                                <ScrollArea className="h-[calc(100vh-295px)]">
                                    <div className="space-y-2">
                                        {column.tasks && column.tasks.length > 0 ? (
                                            column.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)
                                        ) : (
                                            <p className="text-gray-400">No tasks available</p>
                                        )}
                                    </div>
                                </ScrollArea>
                                <AlertForm columnId={column.id} />
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <button className="h-32 min-w-80 rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-700 hover:text-slate-500 hover:border-slate-500 transition-colors duration-200">
                    <Plus className="w-6 h-6 mr-2" />
                    <span>New Column</span>
                </button>
            </div>
        </div>
    );
}
