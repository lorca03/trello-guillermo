import {createBoard, deleteBoard} from "~/models/board.server";
import {createColumn, deleteColumn, updateColumn} from "~/models/column.server";
import {createTask, updateTask, deleteTask, reorderTasksInColumn, moveTaskToColumn} from "~/models/task.server";

export const handleBoardActions = async (actionType: any, formData: any) => {
    switch (actionType) {
        case "createBoard":
            const titleBoard = formData.get("title") as string;
            const userId = parseInt(formData.get("userId") as string, 10);
            return await createBoard({title: titleBoard, userId});
        case "deleteBoard":
            const boardIdDelete = parseInt(formData.get("boardId") as string, 10);
            return await deleteBoard(boardIdDelete);
        case "createTask":
            const title = formData.get("title") as string;
            const priorityId = parseInt(formData.get("priority") as string);
            const columnId = parseInt(formData.get("columnId") as string);
            const orderIndex = parseInt(formData.get("orderIndex") as string);
            return await createTask({title, columnId, priorityId, orderIndex});
        case "updateTask":
            const id = parseInt(formData.get("taskId") as string);
            const newTitle = formData.get("title") as string;
            const newPriorityId = parseInt(formData.get("priority") as string);
            return await updateTask(id, {title: newTitle, priorityId: newPriorityId});
        case "deleteTask":
            const deleteId = parseInt(formData.get("taskId") as string);
            return await deleteTask(deleteId);
        case "createColumn":
            const boardId = parseInt(formData.get("boardId") as string);
            const titleCol = formData.get("title");
            return await createColumn({title: titleCol, boardId});
        case "deleteCol":
            const colId = parseInt(formData.get("colId") as string);
            return await deleteColumn(colId);
        case "editCol":
            const colEditId = parseInt(formData.get("colId") as string);
            const titleEditCol = formData.get("title");
            return await updateColumn(colEditId, {title: titleEditCol});
        case "reorder":
            const columnReordId = parseInt(formData.get("columnId") as string, 10);
            const taskIds = (formData.get("taskIds") as string).split(",").map(Number);
            return await reorderTasksInColumn(columnReordId, taskIds);
        case "move":
            const taskId = parseInt(formData.get("taskId") as string, 10);
            const targetColumnId = parseInt(formData.get("targetColumnId") as string, 10);
            const targetIndex = parseInt(formData.get("targetIndex") as string, 10);
            return await moveTaskToColumn(taskId, targetColumnId, targetIndex);
        default:
            throw new Error("Acción no válida");
    }
};
