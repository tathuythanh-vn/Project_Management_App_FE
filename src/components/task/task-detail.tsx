'use client'

import React, {FormEvent, useState} from 'react';
import {Task} from "@/model/task";
import TaskLabel from './task-label';
import {formarDateTime, formatSnakeToTitle} from "@/utils/helper";
import {clsx} from "clsx";
import {AlignJustify, BookText, Check, Paperclip, Pencil, Trash2, X} from "lucide-react";
import TaskResource from "@/components/task/task-resource";
import PriorityBadge from "@/components/badge/priority-badge";
import StatusBadge from "@/components/badge/status-badge";
import InputField from "@/components/form/input-field";
import PriorityDropdown from "@/components/select/priority-dropdown";
import {deleteTask, updateTask} from "@/service/task";
import {toast} from "sonner";
import {Status} from "@/model/project";
import StatusDropdown from "@/components/select/status-dropdown";
import SelectProjectMember from "@/components/select/select-project-member";
import AlertConfirm from "@/components/popup/alert-confirm";
import {Button} from "@/components/ui/button";
import AssetList from "@/components/asset/asset-list";


interface TaskDetailProps {
    task: Task;
    onClose: () => void;
    refetch: () => void;
}

const TaskDetail = ({task, onClose, refetch}: TaskDetailProps) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [taskData, setTaskData] = useState<Task>(task);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (!task) return;

    const updateTaskHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const updatedTaskData = {
                title: formData.get('title') as string,
                endDate: formData.get('endDate') as string,
                assignee: formData.get('assignee') as string,
                // Include other fields that might have changed
                priority: taskData.priority,
                status: taskData.status,
            };

            // Filter out empty/unchanged values
            const updatePayload: Partial<Task> = {};

            if (updatedTaskData.title && updatedTaskData.title !== task.title) {
                updatePayload.title = updatedTaskData.title;
            }

            if (updatedTaskData.endDate && updatedTaskData.endDate !== task.endDate.split('T')[0]) {
                updatePayload.endDate = updatedTaskData.endDate;
            }

            if (updatedTaskData.assignee && updatedTaskData.assignee !== task.assignee) {
                updatePayload.assignee = updatedTaskData.assignee;
            }

            // Only proceed if there are changes
            if (Object.keys(updatePayload).length === 0) {
                toast.info('No changes detected.');
                setIsEdit(false);
                return;
            }

            const response = await updateTask(task._id!, updatePayload);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || 'Failed to update task');
            }

            // Update local state with the response data
            setTaskData(data);
            setIsEdit(false);
            refetch();
            toast.success('Task updated successfully.');

        } catch (error) {
            console.error(error instanceof Error ? error.message : 'Failed to update task.');
            toast.error(error instanceof Error ? error.message : 'Failed to update task.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <form onSubmit={updateTaskHandler}>
                <div className={'pb-4 border-b-2 border-[#DEE1E6]'}>
                    <div className={'flex justify-between items-center mb-2'}>
                        <p className={'text-stone-600 text-xs'}>Project / Task ID-{task._id}</p>
                        <div className={'flex gap-4 justify-center items-center'}>
                            <AlertConfirm onConfirm={async () => {
                                try {
                                    const response = await deleteTask(task._id!)

                                    const data = await response.json();

                                    if (!response.ok) {
                                        throw new Error(data?.message);
                                    }

                                    toast.success("Task has been removed.")
                                    refetch();
                                } catch (e) {
                                    toast.error(e instanceof Error ? e.message : 'Failed to remove member.');
                                }
                            }}>
                                <Trash2
                                    type="button"
                                    size={20}
                                    className={'text-red-500 hover:text-red-800 cursor-pointer transition-all duration-300'}
                                />
                            </AlertConfirm>
                            {isEdit ?
                                <Button variant={'ghost'} className={'w-7 h-7 p-0'}>
                                    <Check
                                        size={28}
                                        className={'cursor-pointer text-green-500 hover:text-green-800 transition-all duration-300'}
                                        type="button"
                                    />
                                </Button>
                                :

                                <Pencil
                                    className={'cursor-pointer text-blue-500 hover:text-blue-800 transition-all duration-300'}
                                    size={20}
                                    onClick={() => setIsEdit(true)}
                                />
                            }
                            <X onClick={onClose}
                               size={24}
                               className={'cursor-pointer hover:text-red-500 transition-all duration-300'}/>
                        </div>
                    </div>
                    {
                        !isEdit ?
                            <>
                                <h3 className={'text-xl font-semibold mb-4'}>{task.title}</h3>
                                <div className={'flex flex-col gap-y-2'}>
                                    <TaskLabel label={'Priority'}>
                                        <PriorityBadge
                                            type={task.priority}>{formatSnakeToTitle(task.priority)}</PriorityBadge>
                                    </TaskLabel>
                                    <TaskLabel label={'Status'}>
                                        <StatusBadge type={task.status}>{formatSnakeToTitle(task.status)}</StatusBadge>
                                    </TaskLabel>
                                    <TaskLabel label={'Owner'}>{task.owner.fullName}</TaskLabel>
                                    <TaskLabel
                                        className={clsx({'text-red-500': !task?.assignee || typeof task.assignee === 'string'})}
                                        label="Assignee"
                                    >
                                        {typeof task.assignee === 'object' ? task.assignee.fullName : 'Not assigned'}
                                    </TaskLabel>
                                    <TaskLabel label={'Due Date'}>{formarDateTime(new Date(task.endDate))}</TaskLabel>
                                </div>
                            </>
                            :
                            <>
                                <InputField labelType={'inline'} name={'title'} defaultValue={task.title}
                                            isFocused={true}>Task
                                    Title</InputField>
                                <div className={'flex gap-4 mb-2 items-center'}>
                                    <p className={'text-sm text-stone-600 mb-2 w-[8ch]'}>Priority</p>
                                    <PriorityDropdown currentPriority={task.priority}
                                                      onChange={async (newPriority) => {
                                                          try {
                                                              const response = await updateTask(task._id!, {priority: newPriority});
                                                              const data = await response.json();

                                                              if (!response.ok) throw new Error(data?.message);

                                                              refetch();
                                                              toast.success('Priority has been updated.');
                                                          } catch (error) {
                                                              toast.error('Failed to update priority.');
                                                          }
                                                      }}
                                                      onClick={(e) => e.stopPropagation()}/>
                                </div>
                                <div className={'flex gap-4 mb-2 items-center'}>
                                    <p className={'text-sm text-stone-600 mb-2 w-[8ch]'}>Status</p>
                                    <StatusDropdown
                                        currentStatus={task.status}
                                        onChange={async (newStatus) => {
                                            try {
                                                const response = await updateTask(task._id!, {status: newStatus as Status});
                                                const data = await response.json();

                                                if (!response.ok) {
                                                    throw new Error(data?.message);
                                                }
                                                refetch();
                                                toast.success('Status has been updated.');
                                            } catch (error) {
                                                toast.error('Failed to update status:');
                                            }
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                                <InputField className={'text-stone-900 text-sm mb-2'} labelType={'inline'}
                                            disabled={true}
                                            defaultValue={task.owner.fullName}
                                            name={'owner'}>Owner</InputField>
                                <div className={'flex gap-4 items-center mb-2'}>
                                    <p className={'text-sm text-stone-600 mb-2 w-[8ch]'}>Assignee</p>
                                    <SelectProjectMember
                                        projectId={task.projectId}
                                        name={'assignee'}/>
                                </div>
                                <InputField labelType={'inline'} type={'date'} name={'endDate'}
                                            defaultValue={task.endDate.split('T')[0]}>Due Date</InputField>
                            </>
                    }
                </div>
                <div className={'py-4 border-b-2 border-[#DEE1E6]'}>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookText className="w-4 h-4"/>
                        <span>Description</span>
                    </div>
                    <p className={'text-sm mt-2 bg-white'}>{task.description}</p>
                </div>
                <AssetList assets={task.assets} />
            </form>
            <TaskResource subtasks={task.subtasks} taskId={task._id!} refetch={refetch}/>
        </>
    );
};

export default TaskDetail;
