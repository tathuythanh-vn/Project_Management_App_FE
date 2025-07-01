'use client'

import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {getTeamMembers, getTeams} from "@/service/team";
import {Member, Team} from '@/model/team';
import useFetch from "@/hooks/use-fetch";
import {useCallback} from "react";
import {Project} from "@/model/project";
import {getProjectMembers} from "@/service/project";

interface SelectTeamMemberProps {
    project: Project;
    name: string;
    defaultValue?: string;
}

const SelectTeamMember = ({name, defaultValue, project}: SelectTeamMemberProps) => {
    const teamId = project.teamId;

    const fetchFn = useCallback(() => getTeamMembers(teamId), [teamId]);

    const {dataFetched: teamMembers, refetch, error, isLoading} = useFetch<Member>(fetchFn, [])

    const fetchProjectMembersFn = useCallback(() => getProjectMembers(project._id!), [project._id]);
    const {dataFetched: projectMembers} = useFetch<Member>(fetchProjectMembersFn, [])

    const options = teamMembers.filter(member => !projectMembers.some(projectMember => projectMember.userId._id === member.userId._id));

    return (
        <Select name={name}>
            <SelectTrigger className="w-full bg-[#F9FAFB] p-2 border-0">
                <SelectValue placeholder="Choose a team member"/>
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
                                value={option.userId.email}
                                className="flex items-center gap-2 text-xl"
                            >
                                {option.userId.email}
                            </SelectItem>
                        ))
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectTeamMember;
