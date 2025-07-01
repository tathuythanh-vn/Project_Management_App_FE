import { ObjectIdSchema } from "./project"; // Reuse if defined like z.string().regex(/^[a-f\d]{24}$/i)
import { z } from "zod";
import {PublicUser, PublicUserSchema} from "@/model/user";

// Team form schema — only what's needed from UI
export const TeamFormSchema = z.object({
    name: z.string().min(1, "Team name is required"),
    description: z.string().optional()
});

export type TeamFormInput = z.infer<typeof TeamFormSchema>;

export const MemberSchema = z.object({
    userId: PublicUserSchema,
    role: z.string()
});

export type Member = z.infer<typeof MemberSchema>;

export const TeamSchema = TeamFormSchema.extend({
    _id: ObjectIdSchema.optional(),
    owner: PublicUserSchema,
    members: z.array(MemberSchema).optional(),
    projects: ObjectIdSchema.optional(),
    createdAt: z.string().optional()
});

export type Team = z.infer<typeof TeamSchema>;

const TeamMemberStatSchema = z.object({
    userId: PublicUserSchema,
    taskCounts: z.number(),
    completedTask: z.number(),
    projectCount: z.number(),
});

export type TeamMemberStat = z.infer<typeof TeamMemberStatSchema>;

