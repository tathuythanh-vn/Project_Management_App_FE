import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Circle, Activity, Flame, AlertTriangle} from "lucide-react";

interface SelectPriorityProps {
    name: string;
}

const SelectPriority = ({name}: SelectPriorityProps) => {
    return (
        <Select name={name}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Low"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="low" className="flex items-center gap-2 text-[#00a63e] hover:bg-green-100">
                        <Circle className="w-4 h-4" color="#00a63e"/>
                        Low
                    </SelectItem>
                    <SelectItem value="medium" className="flex items-center gap-2 hover:bg-yellow-100">
                        <Activity className="w-4 h-4" color='#d08700'/>
                        Medium
                    </SelectItem>
                    <SelectItem value="high" className="flex items-center gap-2 text-[#f54900] hover:bg-orange-100">
                        <Flame className="w-4 h-4" color='#f54900'/>
                        High
                    </SelectItem>
                    <SelectItem value="critical"
                                className="flex items-center gap-2 text-[#c10007] font-semibold hover:bg-red-100">
                        <AlertTriangle className="w-4 h-4" color='#c10007'/>
                        Critical
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectPriority;
