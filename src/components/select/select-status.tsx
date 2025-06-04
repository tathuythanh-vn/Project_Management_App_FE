import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Circle,
    Loader,
    CheckCircle,
    FileCheck
} from "lucide-react";

interface SelectStatusProps {
    name: string;
}

const SelectStatus = ({name}: SelectStatusProps) => {
    return (
        <Select name={name}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="To Do"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="todo" className="flex items-center gap-2 text-gray-500 hover:bg-gray-100">
                        <Circle className="w-4 h-4 text-gray-500"/>
                        To Do
                    </SelectItem>
                    <SelectItem value="in_progress" className="flex items-center gap-2 text-blue-600 hover:bg-blue-100">
                        <Loader className="w-4 h-4 text-blue-600 animate-spin-slow"/>
                        In Progress
                    </SelectItem>
                    <SelectItem value="in_review"
                                className="flex items-center gap-2 text-yellow-600 hover:bg-yellow-100">
                        <FileCheck className="w-4 h-4 text-yellow-600"/>
                        In Review
                    </SelectItem>
                    <SelectItem value="completed" className="flex items-center gap-2 text-green-600 hover:bg-green-100">
                        <CheckCircle className="w-4 h-4 text-green-600"/>
                        Completed
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectStatus;
