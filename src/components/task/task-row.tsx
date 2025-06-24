'use client'
import {formarDateTime, formatSnakeToTitle} from "@/utils/helper";
import {Task} from "@/model/task";
import Modal from "@/components/popup/modal";
import {useState} from "react";
import TaskDetail from "@/components/task/task-detail";
import StatusBadge from "@/components/badge/status-badge";
import PriorityBadge from "../badge/priority-badge";

interface TaskRowProps {
    task: Task;
}

const TaskRow = ({task}: TaskRowProps) => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    return (
        <>
            <Modal style={{width: '600px', maxWidth: '95%'}} isOpened={modalIsOpened} onClose={() => setModalIsOpened(false)}>
                <TaskDetail task={task} onClose={() => setModalIsOpened(false)} />
            </Modal>
            <tr className={`hover:bg-stone-100 cursor-pointer relative ${task.status === 'completed' ? 'after:content-[\'\'] after:absolute after:top-1/2 after:left-0 after:right-0 after:h-0.5 after:bg-black after:z-10 bg-gray-200' : ''}`} onClick={() => {
                setModalIsOpened(true)
            }}>
                <td className={'p-4 pr-0'}>
                    <input type={'checkbox'} checked={task.status === 'completed'}/>
                </td>
                <td className={'p-4'}>{task.title}</td>
                <td>{formarDateTime(new Date(task.endDate))}</td>
                <td><StatusBadge type={task.status}>{formatSnakeToTitle(task.status)}</StatusBadge></td>
                <td>
                    <PriorityBadge type={task.priority}>{formatSnakeToTitle(task.priority)}</PriorityBadge>
                </td>
                {/*<td>{task.title}</td>*/}
                <td>{task.owner?.fullName}</td>
                <td className={typeof task.assignee === 'object' && task.assignee?.fullName ? '' : 'text-red-500'}>
                    {typeof task.assignee === 'object' && task.assignee?.fullName ? task.assignee.fullName : 'Not assigned'}
                </td>
            </tr>
        </>
    );
};

export default TaskRow;
