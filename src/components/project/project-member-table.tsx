'use client'

import {createColumns} from "./project-table/collumn"
import {DataTable} from "./project-table/data-table"
import {Member} from "@/model/team";
import {deleteProjectMember, editProjectMember, getProjectMembers} from "@/service/project";
import useFetch from "@/hooks/use-fetch";
import {useCallback, useEffect, useMemo} from "react";
import {toast} from "sonner";

interface ProjectMemberTableProps {
    slug: string;
    onRefetchReady?: (refetch: () => void) => void;
}

const ProjectMemberTable = ({slug, onRefetchReady}: ProjectMemberTableProps) => {
    const fetchFn = useCallback(() => {
        return getProjectMembers(slug);
    }, [slug])

    const {dataFetched: members, refetch, error, isLoading} = useFetch(fetchFn, [])

    useEffect(() => {
        if (onRefetchReady) onRefetchReady(refetch);
    }, [refetch]);

    const deleteHandler = useCallback(async (id: string) => {
        try {
            const response = await deleteProjectMember(slug, id);

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to delete project member");
            }

            toast.success("Project member has been deleted");
            refetch();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete project member");
        }
    }, [refetch]);

    const data = members.map((member: Member) => {
        return {
            ...member.userId,
            role: member.role.charAt(0).toUpperCase() + member.role.slice(1),
        }
    })

    // Memoize columns to prevent unnecessary re-renders
    const columns = useMemo(() =>
            createColumns({ slug, refetch, deleteHandler }),
        [slug, refetch, deleteHandler]
    );

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data}/>
        </div>
    )
}

export default ProjectMemberTable;