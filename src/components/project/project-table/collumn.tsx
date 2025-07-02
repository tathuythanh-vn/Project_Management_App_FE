"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {ArrowUpDown, Trash2} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import {PublicUser} from "@/model/user";
import {Badge} from "@/components/ui/badge";
import {useAuth} from "@/context/auth-context";
import AlertConfirm from "../../popup/alert-confirm";
import AddProjectMemberBtn from "@/components/project/add-project-member-btn";
import EditProjectMemberBtn from "@/components/project/edit-project-member-btn";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";

interface ColumnsProps {
    slug: string;
    refetch: () => void;
    deleteHandler: (id: string) => void;
}

export const createColumns = ({ slug, refetch, deleteHandler }: ColumnsProps): ColumnDef<PublicUser & {
    tasks: Array<{
        _id: string;
        title: string;
    }>
}>[] => [
    // {
    //     id: "select",
    //     header: ({table}) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({row}) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "fullName",
        header: "Name",
        cell: ({row}) => {
            const member = row.original;

            const {avatar, fullName} = member;

            return (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={`${process.env.NEXT_PUBLIC_FILE_URL}${avatar}`}/>
                        <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="capitalize">{fullName}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "email",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    className="font-semibold text-base"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "role",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    className="font-semibold text-base"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({row}) => <Badge className={'text-sm'} variant={'outline'}>{row.getValue("role")}</Badge>,
    },
    {
        accessorKey: "tasks",
        header: "Tasks",
        cell: ({ row }) => {
            const tasks = row.getValue("tasks") as { title: string }[];

            if (!tasks || tasks.length === 0) return <span className="text-muted-foreground text-xs">No tasks</span>;

            return (
                <div className="flex flex-wrap gap-2">
                    {tasks.map((task, index) => (
                        <Badge className={'text-sm'} key={index} variant="secondary">
                            {task.title}
                        </Badge>
                    ))}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => {
            const { user } = useAuth();
            const member = row.original;

            return (
                <div className="flex gap-2">
                    {(member.role !== "owner" && user?.userRole === "manager") && (
                        <>
                            <EditProjectMemberBtn member={ {userId: member, role: member.role} }  slug={slug} onConfirm={refetch}  />
                            <AlertConfirm onConfirm={() => deleteHandler(member._id)}>
                                <Trash2
                                    size={18}
                                    className="hover:text-red-500 hover:scale-110 cursor-pointer transition-all duration-300"
                                />
                            </AlertConfirm>
                        </>
                    )}
                </div>
            );
        },
        enableSorting: false,
    }
]