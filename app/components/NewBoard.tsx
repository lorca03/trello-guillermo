import {Plus} from "lucide-react";
import {Button} from "./ui/button";
import {Input} from "./ui/input";
import {Label} from "./ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import {useState} from "react";
import {useFetcher} from "@remix-run/react";

const NewBoard = ({userId}: {userId: number}) => {
    const fetcher = useFetcher();
    const [popoverOpen, setPopoverOpen] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        fetcher.submit(
            {
                title: title,
                userId: userId.toString(),
                actionType: "createBoard",
            },
            {method: "post"}
        );
        setPopoverOpen(false);
    };
    return (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
                <button className="h-32 rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-700 hover:text-slate-500 hover:border-slate-500 transition-colors duration-200">
                    <Plus className="w-6 h-6 mr-2" />
                    <span>New Board</span>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <form action="post" onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <h4 className="font-medium leading-none">New Board</h4>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="width">Title</Label>
                            <Input id="width" name="title" required className="col-span-3 h-8" />
                        </div>
                        <div>
                            <Button className="w-full" type="submit">
                                Create Board
                            </Button>
                        </div>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
};

export default NewBoard;
