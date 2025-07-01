'use client'
import {formarDateTime, formatSnakeToTitle} from "@/utils/helper";
import {Task} from "@/model/task";
import Modal from "@/components/popup/modal";
import React, {useState} from "react";
import TaskDetail from "@/components/task/task-detail";
import StatusBadge from "@/components/badge/status-badge";
import PriorityBadge from "../badge/priority-badge";
import {Status} from "@/model/project";
import EditTeamMemberBtn from "@/components/team/edit-team-member-btn";
import AlertConfirm from "@/components/popup/alert-confirm";
import {Trash2} from "lucide-react";
import {useAuth} from "@/context/auth-context";
import StatusDropdown from "@/components/select/status-dropdown";
import {toast} from "sonner";
import {deleteTask, updateTask} from "@/service/task";
import PriorityDropdown from "@/components/select/priority-dropdown";
import SelectProjectMember from "@/components/select/select-project-member";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface TaskRowProps {
    task: Task;
    refetch: () => void;
    shorten?: boolean;
}

const TaskRow = ({task, refetch, shorten}: TaskRowProps) => {
    const {user} = useAuth()
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    const onChangeStatus = async (id: string) => {
        const currentStatus = task.status;

        try {
            const response = await updateTask(task._id!, {status: currentStatus === 'completed' ? 'in_progress' : 'completed' as Status});
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message);
            }
            refetch();
            toast.success('Status has been updated.');
        } catch (error) {
            toast.error('Failed to update status:');
        }
    }


    const deleteHandler = async (id: string) => {
        try {
            const response = await deleteTask(id)

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message);
            }

            toast.success("Task has been removed.")
            refetch();
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Failed to remove member.');
        }
    };

    return (
        <>
            <Modal style={{width: '600px', maxWidth: '95%'}} isOpened={modalIsOpened}
                   onClose={() => setModalIsOpened(false)}>
                <TaskDetail task={task} refetch={refetch} onClose={() => setModalIsOpened(false)}/>
            </Modal>
            <tr
                className={`hover:bg-stone-100 cursor-pointer relative ${task.status === 'completed' ? 'after:content-[\'\'] after:absolute after:top-1/2 after:left-0 after:right-0 after:h-0.5 after:bg-black after:z-10 bg-gray-200' : ''}`}
                onClick={() => {
                    setModalIsOpened(true)
                }}>
                {!shorten && <td className={'p-4 pr-0'}>
                    <input type={'checkbox'}
                           className={'cursor-pointer w-4 h-4 hover:scale-110 transition-all duration-300'}
                           checked={task.status === 'completed'}
                           onClick={(e) => {
                               e.stopPropagation()
                               onChangeStatus(task._id!)
                           }}
                           readOnly={true}
                    />
                </td> }
                <td className={'p-4'}>{task.title}</td>
                <td>{formarDateTime(new Date(task.endDate))}</td>
                <td>
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
                </td>
                    <td>
                        <PriorityDropdown
                            currentPriority={task.priority}
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
                            onClick={(e) => e.stopPropagation()}
                        />
                    </td>
                    {/*{!shorten && <td>{task.owner?.fullName}</td>}*/}
                    {!shorten && <td className={typeof task.assignee === 'object' && task.assignee?.fullName ? '' : 'text-red-500'}>
                        {typeof task.assignee === 'object' && task.assignee?.fullName ?
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage src={`${process.env.NEXT_PUBLIC_FILE_URL}${task.assignee.avatar}`}/>
                                    <AvatarFallback>{task.assignee.fullName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="capitalize">{task.assignee.fullName}</span>
                            </div>
                            : 'Not assigned'}
                    </td>}
                {!shorten && <td className={'p-4'}>
                    <div className={'flex gap-2'}>
                        {user?.userRole === 'manager' && (
                            <>
                                {/*<EditTeamMemberBtn member={member} onConfirm = {refetch} slug={slug}/>*/}
                                <div onClick={(e) => e.stopPropagation()}>
                                    <AlertConfirm onConfirm={() => deleteHandler(task._id!)}>
                                        <Trash2
                                            size={18}
                                            className={'hover:text-red-500 hover:scale-110 cursor-pointer transition-all duration-300'}
                                        />
                                    </AlertConfirm>
                                </div>
                            </>
                        )}
                    </div>
                </td>}
            </tr>
        </>
    );
};

export default TaskRow;