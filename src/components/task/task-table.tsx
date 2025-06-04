import React from 'react';

const TaskTable = () => {
    return (
        <div className='bg-white rounded-md mt-8 p-4 text-left'>
            <table className='w-full table-auto'>
                <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Working time</th>
                    <th>Assignee</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Task 1</td>
                    <td>Apr 1</td>
                    <td>In Progress</td>
                    <td>High</td>
                    <td>10h</td>
                    <td>Huy Thanh</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
