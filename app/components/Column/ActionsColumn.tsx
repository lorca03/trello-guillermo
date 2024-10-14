import {Trash2} from "lucide-react";
import {Button} from "../ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import {useFetcher} from "@remix-run/react";
import {useState} from "react";
import {Column} from "@prisma/client";

const ActionsColumn = ({column}: {column: Column}) => {
    const fetcher = useFetcher();
    const [popoverOpen, setPopoverOpen] = useState<{[key: number]: boolean}>({});

    const handleDeleteCol = (colId: number) => {
        fetcher.submit(
            {
                colId: colId,
                actionType: "deleteCol",
            },
            {method: "post"}
        );
        setPopoverOpen({});
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        setPopoverOpen({[column.id]: false});
        if (title === column.title) {
            return;
        }
        fetcher.submit(
            {
                colId: column.id,
                title: title,
                actionType: "editCol",
            },
            {method: "post"}
        );
    };
    return (
        <Popover open={popoverOpen[column.id]} onOpenChange={(open) => setPopoverOpen({...popoverOpen, [column.id]: open})}>
            <PopoverTrigger asChild>
                <h2 className="mb-4 text-lg font-semibold text-gray-200">{column.title}</h2>
            </PopoverTrigger>
            <PopoverContent>
                <div>
                    <Button onClick={() => handleDeleteCol(column.id)} className="mt-2 w-full flex items-center mb-2 text-red-500 hover:text-red-600">
                        <Trash2 height={"18px"} />
                        Delete Column
                    </Button>
                    <hr />
                    <form action="post" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-4 items-center gap-4 mt-4">
                            <Label htmlFor="width">Title</Label>
                            <Input id="width" defaultValue={column.title} autoFocus name="title" required className="col-span-3 h-8" />
                        </div>
                        <div className="my-2 w-full flex justify-end">
                            <Button className="" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ActionsColumn;
