import type {Priority, Task} from "~/lib/types";
import {Clock, MoreHorizontal, Trash2} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./ui/dropdown-menu";
import {useFetcher} from "@remix-run/react";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "./ui/sheet";
import {Label} from "./ui/label";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {useForm} from "react-hook-form";
import {formSchema} from "./NewTask";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {priorityColors} from "~/lib/utils";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "./ui/select";
import {FormData} from "~/lib/types";
import {useState} from "react";

interface TaskProps {
    task: Task;
    prioritys: Priority[];
}

const Task = ({task, prioritys}: TaskProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {title: task.title, priority: task.priority.id.toString()},
    });
    const fetcher = useFetcher();

    const onSubmit = (data: FormData) => {
        const hasChanges = Object.keys(data).some((key) => {
            if (key === "priority") {
                return task.priority.id.toString() !== data[key];
            }
            return task[key as keyof FormData] && data[key as keyof FormData] !== task[key as keyof FormData].toString();
        });
        if (!hasChanges) {
            return;
        }
        fetcher.submit(
            {
                taskId: task.id,
                title: data.title,
                priority: parseInt(data.priority),
                actionType: "edit",
            },
            {method: "post"}
        );
        setIsOpen(false);
    };

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
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <div
                    key={task.id}
                    className="rounded-md bg-slate-600 scale-95 hover:scale-100 cursor-pointer border border-primary space-y-2 dark:bg-slate-800 p-3 px-4 shadow-sm transition-all duration-200 hover:shadow-md"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-200 mb-2 capitalize font-semibold">{task.title}</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="text-primary hover:text-background z-10">
                                <MoreHorizontal className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleDelete();
                                    }}
                                    className="text-red-500 space-x-2"
                                >
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
            </SheetTrigger>
            <Form {...form}>
                <SheetContent className="w-1/2 sm:max-w-1/2">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <SheetHeader>
                            <SheetTitle>Edit Task</SheetTitle>
                            <SheetDescription>Make changes to your task here. Click save when you're done.</SheetDescription>
                        </SheetHeader>

                        <div className="flex justify-between flex-col gap-y-2 my-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({field}) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Priority*</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a priority" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Priority</SelectLabel>
                                                        {prioritys.map((priority) => (
                                                            <SelectItem key={priority.id} value={priority.id.toString()}>
                                                                {priority.level}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <SheetFooter>
                            <Button type="submit">Save changes</Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Form>
        </Sheet>
    );
};

export default Task;
