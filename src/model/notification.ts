import {z} from "zod";
import {PublicUserSchema} from "@/model/user";

const notificationSchema = z.object({
    _id: z.string(),
    receiver: PublicUserSchema,
    sender: PublicUserSchema,
    type: z.enum(["task_assign", "task_update"]),
    description: z.string(),
    template: z.string(),
    data: z.any(),
    isRead: z.boolean(),
    isDeleted: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    __v: z.number(),
    processedTemplate: z.string(),
});

export type Notification = z.infer<typeof notificationSchema>;

const notificationStatSchema = z.object({
    all: z.number(),
    read: z.number(),
    unread: z.number(),
    engagement: z.number(),
})

export type NotificationStat = z.infer<typeof notificationStatSchema>;