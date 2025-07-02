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
import {RecentActivity} from "@/model/recent-activity";
import {formarDateTime} from "@/utils/helper";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";

export const createColumns = (): ColumnDef<RecentActivity>[] => [
    {
        id: "user", // custom ID instead of accessorKey
        header: "User",

        // Custom filter function
        filterFn: (row, columnId, filterValue) => {
            const user = row.original.userId;
            return user?.fullName
                ?.toLowerCase()
                .includes(filterValue.toLowerCase());
        },

        // Cell rendering logic
        cell: ({ row }) => {
            const user = row.original.userId;
            return (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={`${process.env.NEXT_PUBLIC_FILE_URL}${user?.avatar}`} />
                        <AvatarFallback>{user?.fullName?.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{user?.fullName ?? "Unknown"}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </div>
                </div>
            );
        },
    },

    {
        accessorKey: "actionType",
        header: "Action",
        cell: ({row}) => {
            const action = row.original.actionType;
            const icon = {
                create: "➕",
                update: "✏️",
                delete: "🗑️",
            }[action] ?? "⚙️";
            return (
                <span className="capitalize">
          {icon} {action}
        </span>
            );
        },
    },
    {
        id: "details",
        header: "Details",
        cell: ({row}) => row.original.details ?? "-",
    },
    {
        accessorKey: "timestamp",
        header: "Time",
        cell: ({row}) => (
            <div className="text-sm text-muted-foreground">
                {formarDateTime(new Date(row.original.timestamp))}
            </div>
        ),
    },
]