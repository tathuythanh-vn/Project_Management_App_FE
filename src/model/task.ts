import {z} from "zod";
import {ObjectIdSchema, PrioritySchema, StatusSchema} from "./project";
import {assetSchema} from "@/model/asset";

// Subtask schema
const SubtaskSchema = z.object({
    _id: ObjectIdSchema,
    title: z.string().min(1, "Subtask title is required"),
    description: z.string().min(1, "Subtask description is required"),
    isCompleted: z.boolean().optional().default(false)
});

export type Subtask = z.infer<typeof SubtaskSchema>;

// Comment schema
const CommentSchema = z.object({
    userId: ObjectIdSchema,
    message: z.string().min(1, "Comment message is required"),
    createdAt: z.string().optional() // ISO string (to align with JS Date)
});

export type Comment = z.infer<typeof CommentSchema>;

export const TaskFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    projectId: ObjectIdSchema, // required in form
    assignee: z.union([
        z.object({
            _id: ObjectIdSchema,
            fullName: z.string(),
            avatar: z.string(),
        }),
        z.string()
    ]).optional(),
    assets: z.array(assetSchema).optional(),
    status: StatusSchema.default('todo'),
    priority: PrioritySchema.default('medium'),
    startDate: z.string(),
    endDate: z.string(),
    subtasks: z.array(SubtaskSchema).optional(),
    comments: z.array(CommentSchema).optional(),
});
export type TaskFormInput = z.infer<typeof TaskFormSchema>;

export const TaskSchema = TaskFormSchema.extend({
    _id: ObjectIdSchema.optional(),
    owner: z.object({
        _id: ObjectIdSchema,
        fullName: z.string(),
        avatar: z.string(),
    }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
