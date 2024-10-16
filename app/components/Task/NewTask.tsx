import {useState} from "react";
import {Plus} from "lucide-react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "~/components/ui/alert-dialog";
import {Button} from "~/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "~/components/ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "~/components/ui/select";
import {useFetcher} from "@remix-run/react";
import {Priority} from "~/lib/types";
import {FormData} from "~/lib/types";

export const formSchema = z.object({
    title: z.string().min(1, "Name is required"),
    priority: z.string().min(1, "Priority is required"),
});

const NewTask = ({columnId, prioritys, index}: {columnId: number; prioritys: Priority[]; index: number}) => {
    const fetcher = useFetcher();
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {title: "", priority: ""},
    });

    const onSubmit = (data: FormData) => {
        fetcher.submit(
            {
                title: data.title,
                priority: parseInt(data.priority),
                columnId: columnId,
                orderIndex: index,
                actionType: "createTask",
            },
            {method: "post"}
        );
        setIsOpen(false);
        handleDialogClose(false);
    };

    const handleDialogClose = (open: boolean | ((prevState: boolean) => boolean)) => {
        setIsOpen(open);
        if (!open) {
            form.reset();
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={handleDialogClose}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="mt-4 w-full justify-start text-background hover:text-background hover:bg-primary dark:text-text dark:hover:text-text dark:hover:bg-primary"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir tarea
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-foreground text-text border-accent dark:bg-foreground dark:border-text dark:text-text">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-text font-bold">Añadir una tarea nueva</AlertDialogTitle>
                    <AlertDialogDescription>Por favor, completa el formulario para añadir una tarea.</AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex justify-between gap-x-2">
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
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button type="submit">Submit</Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default NewTask;
