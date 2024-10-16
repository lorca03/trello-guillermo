import {ArrowLeft} from "lucide-react";
import {Button} from "../components/ui/button";
import {Card, CardContent} from "../components/ui/card";
import {ScrollArea} from "../components/ui/scroll-area";
import {json, useFetcher, useLoaderData, useNavigate} from "@remix-run/react";
import {ActionFunction, LoaderFunction} from "@remix-run/node";
import {getBoardById} from "~/models/board.server";
import type {Board, Priority} from "~/lib/types";
import Task from "~/components/Task/Task";
import {handleBoardActions} from "../lib/boardActions";
import {getAllPriorities} from "~/models/priority.server";
import NewColumn from "~/components/Column/NewColumn";
import ActionsColumn from "~/components/Column/ActionsColumn";
import {DragDropContext, Droppable, Draggable} from "@hello-pangea/dnd";
import NewTask from "~/components/Task/NewTask";
import {useEffect, useState} from "react";

export const loader: LoaderFunction = async ({params}) => {
    const boardId = parseInt(params.id as string, 10);
    const board = await getBoardById(boardId);
    const prioritys = await getAllPriorities();
    return json({board, prioritys});
};

export const action: ActionFunction = async ({request}) => {
    const formData = await request.formData();
    const actionType = formData.get("actionType") as string;
    await handleBoardActions(actionType, formData);
    return "";
};

export default function Board() {
    const navigate = useNavigate();
    const fetcher = useFetcher();
    const {board: boardData, prioritys: prioritysData} = useLoaderData<typeof loader>();
    const board: Board = boardData;
    const prioritys: Priority[] = prioritysData;
    const [tasksState, setTasksState] = useState(board.columns.map((column) => column.tasks));

    useEffect(() => {
        const orderedTasks = board.columns.map((col) => [...col.tasks].sort((a, b) => a.orderIndex - b.orderIndex));
        setTasksState(orderedTasks);
    }, [board]);

    const handleDragEnd = (result: any) => {
        const {source, destination} = result;
        if (!destination) return;

        const sourceColumnIndex = board.columns.findIndex((col) => col.id.toString() === source.droppableId);
        const destinationColumnIndex = board.columns.findIndex((col) => col.id.toString() === destination.droppableId);

        if (sourceColumnIndex === -1 || destinationColumnIndex === -1) return;

        const sourceTasks = [...tasksState[sourceColumnIndex]];
        const movedTask = sourceTasks[source.index];

        // Misma columna
        if (sourceColumnIndex === destinationColumnIndex) {
            sourceTasks.splice(source.index, 1);
            sourceTasks.splice(destination.index, 0, movedTask);

            const updatedTasksState = [...tasksState];
            updatedTasksState[sourceColumnIndex] = sourceTasks;
            setTasksState(updatedTasksState);

            fetcher.submit(
                {
                    actionType: "reorder",
                    columnId: board.columns[sourceColumnIndex].id.toString(),
                    taskIds: sourceTasks.map((task) => task.id).join(","),
                },
                {method: "post"}
            );
        } else {
            // Disitntas columnas
            const destinationTasks = [...tasksState[destinationColumnIndex]];
            sourceTasks.splice(source.index, 1);
            destinationTasks.splice(destination.index, 0, movedTask);

            const updatedTasksState = [...tasksState];
            updatedTasksState[sourceColumnIndex] = sourceTasks;
            updatedTasksState[destinationColumnIndex] = destinationTasks;
            setTasksState(updatedTasksState);

            fetcher.submit(
                {
                    actionType: "move",
                    taskId: movedTask.id.toString(),
                    targetColumnId: board.columns[destinationColumnIndex].id.toString(),
                    targetIndex: destination.index.toString(),
                },
                {method: "post"}
            );
        }
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
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex space-x-4 overflow-x-auto pb-4 p-4">
                    <div className="flex gap-x-4">
                        {board.columns.map((column, columnIndex) => (
                            <Droppable key={column.id} droppableId={column.id.toString()}>
                                {(provided) => (
                                    <section ref={provided.innerRef} {...provided.droppableProps} key={column.id}>
                                        <Card className="w-80 bg-slate-700 dark:bg-slate-900 border-primary dark:border-primary shadow-lg">
                                            <CardContent className="p-4">
                                                <ActionsColumn column={column} />
                                                <ScrollArea className="h-[calc(100vh-295px)]">
                                                    <div className="space-y-2">
                                                        {column.tasks && column.tasks.length > 0 ? (
                                                            tasksState[columnIndex].map((task, taskIndex) => (
                                                                <Draggable key={task.id} draggableId={task.id.toString()} index={taskIndex}>
                                                                    {(provided) => (
                                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                            <Task key={task.id} task={task} prioritys={prioritys} />
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))
                                                        ) : (
                                                            <p className="text-gray-400">No tasks available</p>
                                                        )}
                                                    </div>
                                                </ScrollArea>
                                                <NewTask columnId={column.id} prioritys={prioritys} index={column.tasks.length} />
                                            </CardContent>
                                        </Card>
                                    </section>
                                )}
                            </Droppable>
                        ))}
                    </div>
                    <NewColumn boardId={board.id} />
                </div>
            </DragDropContext>
        </div>
    );
}
