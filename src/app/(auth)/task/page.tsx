import React from 'react';
import CreateProjectButon from "@/components/project/create-project-btn";
import TaskTable from "@/components/task/task-table";

const TaskScreen = () => {
    return (
        <div>
            <h1 className='text-2xl font-semibold mb-6'>Tasks</h1>
            <TaskTable />
        </div>
    );
};

export default TaskScreen;
