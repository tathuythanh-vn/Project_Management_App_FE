import {z} from "zod";
import {PublicUserSchema} from "@/model/user";

const RecentActivitySchema = z.object({
    _id: z.string(),
    userId: PublicUserSchema,
    actionType: z.enum(["create", "update", "delete"]),
    targetType: z.string(),
    targetId: z.string(),
    details: z.string(),
    timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date string",
    }),
    __v: z.number(),
})

export type RecentActivity = z.infer<typeof RecentActivitySchema>;