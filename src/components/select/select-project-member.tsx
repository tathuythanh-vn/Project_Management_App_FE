'use client'

import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Member, Team} from '@/model/team';
import useFetch from "@/hooks/use-fetch";
import {useCallback} from "react";
import {Project} from "@/model/project";
import {getProjectMembers} from "@/service/project";

interface SelectProjectMemberProps {
    projectId: string;
    name: string;
    defaultValue?: string;
}

const SelectProjectMember = ({name, defaultValue, projectId}: SelectProjectMemberProps) => {
    const fetchProjectMembersFn = useCallback(() => getProjectMembers(projectId), [projectId]);
    const {dataFetched: options} = useFetch<Member>(fetchProjectMembersFn, [])

    return (
        <Select name={name} value={defaultValue}>
            <SelectTrigger className="w-[250px] bg-[#F9FAFB] p-2 border-0">
                <SelectValue placeholder="Select Assignee"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.length === 0 ? (
                        <div className="px-4 py-2 text-muted-foreground text-sm">
                            No team members found
                        </div>
                    ) : (
                        options.map((option) => (
                            <SelectItem
                                key={option.userId._id}
                                value={option.userId._id}
                                className="flex items-center gap-2 text-xl"
                            >
                                {option.userId.fullName}
                            </SelectItem>
                        ))
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectProjectMember;
