import {useState} from "react";
import {Plus, MoreHorizontal, Clock, ArrowLeft} from "lucide-react";
import {Button} from "../components/ui/button";
import {Card, CardContent} from "../components/ui/card";
import {ScrollArea} from "../components/ui/scroll-area";
import {json, useLoaderData, useNavigate} from "@remix-run/react";
import {LoaderFunction} from "@remix-run/node";
import {getBoardById} from "~/models/board.server";
import type {Board} from "~/lib/types";

export const loader: LoaderFunction = async ({params}) => {
    const boardId = parseInt(params.id as string, 10);
    const board = await getBoardById(boardId);
    console.log(board);

    return json(board);
};

export default function Board() {
    const navigate = useNavigate();
    const board: Board = useLoaderData<typeof loader>();

    const priorityColors = {
        High: "bg-red-300 text-red-700",
        Medium: "bg-yellow-300 text-yellow-700",
        Low: "bg-green-300 text-green-700",
    };

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
                {board.columns.map((column) => (
                    <Card key={column.id} className="w-80 bg-slate-700 dark:bg-slate-900 border-primary dark:border-primary shadow-lg">
                        <CardContent className="p-4">
                            <h2 className="mb-4 text-lg font-semibold text-gray-200">{column.title}</h2>
                            <ScrollArea className="h-[calc(100vh-295px)]">
                                <div className="space-y-2">
                                    {column.tasks && column.tasks.length > 0 ? (
                                        column.tasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="rounded-md bg-slate-600 border border-primary space-y-2 dark:bg-slate-800 p-3 px-4 shadow-sm transition-all duration-200 hover:shadow-md"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-200 mb-2 capitalize font-semibold">{task.title}</p>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-primary hover:text-background hover:bg-primary dark:hover:bg-primary"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                {task.content && <textarea>{task.content}</textarea>}
                                                <span
                                                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                        priorityColors[task.priority.level as keyof typeof priorityColors]
                                                    }`}
                                                >
                                                    {task.priority.level}
                                                </span>

                                                <p>{task.content}</p>
                                                <div className="flex items-center text-xs text-gray-400">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400">No tasks available</p>
                                    )}
                                </div>
                            </ScrollArea>
                            <Button
                                variant="ghost"
                                className="mt-4 w-full justify-start text-background hover:text-background hover:bg-primary dark:text-text dark:hover:text-text dark:hover:bg-primary"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Añadir tarea
                            </Button>
                        </CardContent>
                    </Card>
                ))}
                <button className="h-32 w-80 rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-700 hover:text-slate-500 hover:border-slate-500 transition-colors duration-200">
                    <Plus className="w-6 h-6 mr-2" />
                    <span>New Column</span>
                </button>
            </div>
        </div>
    );
}
