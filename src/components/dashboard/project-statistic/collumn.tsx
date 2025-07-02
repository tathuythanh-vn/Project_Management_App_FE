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
import {ProjectProgress} from "@/model/project";
import {Progress} from "@/components/ui/progress";

export const createColumns = (): ColumnDef<ProjectProgress>[] => [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({row}) => (
            <div className="capitalize whitespace-normal leading-5">
                {row.getValue("title")}
            </div>
        ),
    },
    {
        accessorKey: "totalTasks",
        header: "Total",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("totalTasks")}</div>
        ),
    },
    {
        accessorKey: "completedTasks",
        header: "Completed",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("completedTasks")}</div>
        ),
    },
    {
        accessorKey: "progress",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    className="font-semibold text-base"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Progress
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({row}) => {
            const value: number = row.getValue("progress");

            return (
                <div className={`w-full flex flex-col justify-center items-center`}>
                        <span className="text-sm text-center">
                            {value}%
                         </span>
                    <Progress value={value}/>
                </div>
            )
        },
    },
]