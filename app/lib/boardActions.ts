import {createTask, updateTask, deleteTask} from "~/models/task.server";

export const handleBoardActions = async (actionType: any, formData: any) => {
    switch (actionType) {
        case "create":
            const title = formData.get("title") as string;
            const priorityId = parseInt(formData.get("priority") as string);
            const columnId = parseInt(formData.get("columnId") as string);
            return await createTask({title, columnId, priorityId});
        case "edit":
            const id = parseInt(formData.get("taskId") as string);
            const newTitle = formData.get("title") as string;
            const newPriorityId = parseInt(formData.get("priority") as string);
            const newColumnId = parseInt(formData.get("columnId") as string);
            return await updateTask(id, {title: newTitle, columnId: newColumnId, priorityId: newPriorityId});
        case "delete":
            const deleteId = parseInt(formData.get("taskId") as string);
            return await deleteTask(deleteId);
        default:
            throw new Error("Acción no válida");
    }
};
