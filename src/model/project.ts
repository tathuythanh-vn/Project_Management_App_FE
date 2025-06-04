import {z} from "zod";

export const ProjectStatusSchema = z.enum([
    'todo',
    'in_progress',
    'in_review',
    'completed'
]);

export const PrioritySchema = z.enum([
    'low',
    'medium',
    'high',
    'critical'
]);

export const ProjectTypeSchema = z.enum([
    'Software Development',
    'Web Design',
    'Mobile App Development',
    'Data Analysis',
    'Marketing Campaign',
    'Infrastructure / DevOps',
    'Research',
    'E-commerce',
    'Business / ERP / CRM',
    'AI / Machine Learning',
    'School Project',
    'Other'
]);

export const ObjectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Invalid ObjectId format"
});

export const TeamMemberSchema = z.object({
    userId: ObjectIdSchema,
    projectRole: z.string().min(1, "Project role is required")
});

// Type inference from schemas
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;
export type Priority = z.infer<typeof PrioritySchema>;
export type ProjectType = z.infer<typeof ProjectTypeSchema>;

// Form data validation schema
const ProjectFormSchema = z.object({
    _id: ObjectIdSchema.optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    status: ProjectStatusSchema,
    priority: PrioritySchema,
    type: ProjectTypeSchema,
}).refine((data) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    return startDate <= endDate;
}, {
    message: "End date must be after start date",
    path: ["endDate"]
});

export type Project = z.infer<typeof ProjectFormSchema>;