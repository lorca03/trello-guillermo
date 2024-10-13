import type {Task} from "~/lib/types";
import {Clock, MoreHorizontal, Trash2} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./ui/dropdown-menu";
import {useFetcher} from "@remix-run/react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "./ui/select";

interface TaskProps {
    task: Task;
    index: number;
}

const Task = ({task, index}: TaskProps) => {
    const fetcher = useFetcher();
    const priorityColors = {
        High: "bg-red-300 text-red-700",
        Mid: "bg-yellow-300 text-yellow-700",
        Low: "bg-green-300 text-green-700",
    } as const;

    const handleDelete = () => {
        fetcher.submit(
            {
                taskId: task.id,
                actionType: "delete",
            },
            {method: "post"}
        );
    };

    return (
        <div
            key={task.id}
            className="rounded-md bg-slate-600 scale-95 hover:scale-100 cursor-pointer border border-primary space-y-2 dark:bg-slate-800 p-3 px-4 shadow-sm transition-all duration-200 hover:shadow-md"
        >
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-200 mb-2 capitalize font-semibold">{task.title}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger className="text-primary hover:text-background">
                        <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="text-red-500 space-x-2" onClick={handleDelete}>
                            <Trash2 height={"20px"} />
                            Delete Task
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[task.priority.level as keyof typeof priorityColors]}`}>
                {task.priority.level}
            </span>
            <div className="flex items-center text-xs text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default Task;
