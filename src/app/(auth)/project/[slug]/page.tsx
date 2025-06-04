import React from 'react';
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import TaskTable from "@/components/task/task-table";

const ProjectDetailScreen = () => {
    return (
        <section>
            <div className="flex items-center justify-between">
                <div className='flex gap-2 items-center'>
                    <h1 className='text-2xl font-semibold'>Project Name</h1>
                    <Badge>Project Status</Badge>
                </div>
                <div className='flex gap-2 items-center'>
                    <Button className='bg-[#036EFF]'>Assign Task</Button>
                    <div>
                        <p>Deadline</p>
                        <span>.</span>
                    </div>
                </div>
            </div>
            <TaskTable/>
        </section>
    );
};

export default ProjectDetailScreen;
