import { z } from "zod";
import {ObjectIdSchema} from "@/model/project";

// Enum for roles
export const RoleEnum = z.enum(["admin", "manager", "user"]);
export type Role = z.infer<typeof RoleEnum>;

// Public user schema
export const PublicUserSchema = z.object({
    _id: z.string(),
    email: z.string().email(),
    fullName: z.string(),
    role: z.string(),
    avatar: z.string(),
    active: z.boolean(),
    lastLogin: z.string(), // ISO date string
    createdAt: z.string(),
    updatedAt: z.string(),
    projects: z.array(
        z.object({
            _id: ObjectIdSchema,
            title: z.string()
        })
    ),
    __v: z.number(),
});
export type PublicUser = z.infer<typeof PublicUserSchema>;

// Full user schema (extends public)
export const UserSchema = PublicUserSchema.extend({
    password: z.string(),
    salt: z.string(),
});
export type User = z.infer<typeof UserSchema>;
