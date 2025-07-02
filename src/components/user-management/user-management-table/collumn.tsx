"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Trash2} from "lucide-react";
import {PublicUser} from "@/model/user";
import {Badge} from "@/components/ui/badge";
import {useAuth} from "@/context/auth-context";
import AlertConfirm from "../../popup/alert-confirm";
import {formarDateTime} from "@/utils/helper";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import {Role} from "@/model/auth";
import EditUserBtn from "@/components/user-management/edit-user-btn";
import {toast} from "sonner";
import {deleteUser} from "@/service/user";

interface ColumnsProps {
    refetch: () => void;
}

export const createColumns = ({refetch}: ColumnsProps): ColumnDef<PublicUser>[] => [
    {
        accessorKey: "email",
        header: "Email Address",
        cell: ({row}) => (
            <div>
                {row.getValue("email")}
            </div>
        ),
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({row}) => {
            const fullName: string = row.getValue("fullName");
            const avatar: string = row.original.avatar;

            return (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={`${process.env.NEXT_PUBLIC_FILE_URL}${avatar}`}/>
                        <AvatarFallback>{fullName.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div className="capitalize">
                        {row.getValue("fullName")}
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "phone",
        header: "Phone Number",
        cell: ({row}) => (
            <div className="capitalize">
                {row.getValue("phone")}
            </div>
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({row}) => (
            <div className="capitalize">
                {row.getValue("role")}
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({row}) => (
            <div className="capitalize">
                {formarDateTime(new Date(row.getValue("createdAt")))}
            </div>
        ),
    },
    {
        accessorKey: "active",
        header: "Status",
        cell: ({row}) => (
            <Badge className={`capitalize ${row.getValue("active") ? "bg-green-500" : "bg-red-500"}`}>
                {row.getValue("active") ? "Active" : "Unactive"}
            </Badge>
        ),
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => {
            const { user } = useAuth();
            const member = row.original;

            return (
                <div className="flex gap-2">
                    {(member.role !== Role.ADMIN) && (
                        <>
                            <EditUserBtn user={member} refetch={refetch} />
                            <AlertConfirm onConfirm={async () => {
                                try {
                                    const response = await deleteUser(member._id);
                                    const data = await response.json();

                                    if (!response.ok) throw new Error(data.message);

                                    toast.success("Successful");
                                } catch (e) {
                                    console.error(e instanceof Error ? e.message : 'Something went wrong. Please try again later.');
                                    toast.error(e instanceof Error ? e.message : 'Something went wrong. Please try again later.');
                                }
                            }}>
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