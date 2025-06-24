'use client'

import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {getTeams} from "@/service/team";
import {Team} from '@/model/team';

import useFetch from "@/hooks/use-fetch";

interface SelectTeamProps {
    name: string;
    defaultValue?: string;
}

const SelectTeam = ({name, defaultValue}: SelectTeamProps) => {
    const {dataFetched: options, refetch, error, isLoading} = useFetch<Team>(getTeams, [])

    return (
        <Select name={name} defaultValue={defaultValue}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose a project"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((option) => (
                        <SelectItem
                            key={option._id}
                            value={option._id!}
                            className={`flex items-center gap-2`}
                        >
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectTeam;
