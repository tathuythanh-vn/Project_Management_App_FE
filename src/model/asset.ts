import { z } from "zod";
import {ObjectIdSchema} from "@/model/project";

export const assetSchema = z.object({
    _id: ObjectIdSchema,
    filename: z.string(),
    originalName: z.string(),
    mimetype: z.string(),
    url: z.string(),
    size: z.number(),
    uploadedBy: z.string().length(24),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    __v: z.number().optional() // versioning field, optional if not always present
});

export type Asset = z.infer<typeof assetSchema>;