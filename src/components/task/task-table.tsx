'use client'

import TaskRow from "@/components/task/task-row";
import {useCallback, useEffect, useState} from "react";
import useFetch from "@/hooks/use-fetch";
import {Project} from "@/model/project";
import {getProjectTasks} from "@/service/project";
import {getTasks} from "@/service/task";
import {Task} from "@/model/task";

interface TaskTableProps {
    slug?: string
    onRefetchReady?: (refetch: () => void) => void;
    shorten?: boolean;
}

const TaskTable = ({slug, onRefetchReady, shorten = false}: TaskTableProps) => {
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const fetchFn = useCallback(() => {
        return slug ? getProjectTasks(slug) : getTasks();
    }, [slug]);

    const {dataFetched: tasks, error, isLoading, refetch} = useFetch<Task>(fetchFn, [])

    useEffect(() => {
        if (onRefetchReady) onRefetchReady(refetch);
    }, [refetch]);

    let content = <div className={`bg-white overflow-y-scroll rounded-md text-left ${!shorten && 'mt-8'}`}>
        <table className='w-full table-auto border-collapse'>
            <thead>
            <tr className='border-b border-stone-200'>
                {!shorten && <th className={'p-4 pr-0'}>
                    {/*<input type={'checkbox'} />*/}
                </th>}
                <th className={'p-4'}>Title</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Priority</th>
                {/*{!shorten && <th>Owner</th>}*/}
                {!shorten && <th>Assignee</th>}
            </tr>
            </thead>
            <tbody>
            {tasks.length > 0 && tasks?.map((task: Task) => (
                <TaskRow key={task._id} task={task} refetch={refetch} shorten={shorten} projectId={slug} />
            ))}
            </tbody>
        </table>
    </div>

    // Only mark initial load once data arrives
    useEffect(() => {
        if (!isLoading && isInitialLoad) {
            setIsInitialLoad(false);
        }
    }, [isLoading]);

    if (isLoading && isInitialLoad) {
        return (
            <h3 className="text-center font-semibold text-xl mt-[30vh]">
                Loading...
            </h3>
        );
    }

    if (tasks.length === 0) (
        content = <h3 className={'text-center text-stone-700 font-semibold text-xl mt-[20vh]'}>Great! You dont have any task left</h3>
    )

    return (
        <>
            {content}
        </>
    );
};

export default TaskTable;
