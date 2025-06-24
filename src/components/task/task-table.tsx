'use client'

import TaskRow from "@/components/task/task-row";
import {useCallback} from "react";
import useFetch from "@/hooks/use-fetch";
import {Project} from "@/model/project";
import {getProjectTasks} from "@/service/project";
import {getTasks} from "@/service/task";
import {Task} from "@/model/task";

interface TaskTableProps {
    slug?: string
}

const TaskTable = ({slug}: TaskTableProps) => {
    const fetchFn = useCallback(() => {
        return slug ? getProjectTasks(slug) : getTasks();
    }, [slug]);

    const {dataFetched: tasks, error, isLoading, refetch} = useFetch<Task>(fetchFn, [])

    let content = <div className='bg-white rounded-md mt-8 text-left'>
        <table className='w-full table-auto border-collapse'>
            <thead>
            <tr className='border-b border-stone-200'>
                <th className={'p-4 pr-0'}>
                    <input type={'checkbox'}/>
                </th>
                <th className={'p-4'}>Title</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Priority</th>
                {/*<th>Progress</th>*/}
                <th>Owner</th>
                <th>Assignee</th>
            </tr>
            </thead>
            <tbody>
            {tasks.length > 0 && tasks?.map((task: Task) => (
                <TaskRow key={task._id} task={task}/>
            ))}
            </tbody>
        </table>
    </div>

    if (isLoading) {
        content = <h3 className={'text-center font-semibold text-xl mt-[30vh]'}>Loading...</h3>
    }

    if (tasks.length === 0) (
        content = <h3 className={'text-center font-semibold text-xl mt-[30vh]'}>Great! You dont have any task left</h3>
    )

    return (
        <>
            {content}
        </>
    );
};

export default TaskTable;
