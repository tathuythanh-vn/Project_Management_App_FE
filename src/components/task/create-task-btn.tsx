'use client'

import {Button} from "@/components/ui/button";
import Modal from "@/components/popup/modal";
import {useState} from "react";
import CreateTaskForm from "@/components/task/create-task-form";

interface CreateTaskBtnProps {
    projectId: string;
    onConfirm: () => void;
}

const CreateTaskBtn = ({projectId, onConfirm}: CreateTaskBtnProps) => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    return (
        <>
            <Modal isOpened={modalIsOpened} onClose={() => setModalIsOpened(false)}
                   style={{width: '800px', maxWidth: '95%'}}>
                <CreateTaskForm
                    projectId={projectId}
                    onClose={() => setModalIsOpened(false)}
                    onConfirm={onConfirm}
                />
            </Modal>
            <Button
                onClick={() => setModalIsOpened(true)}
                className='border border-[#036EFF] text-[#036EFF] hover:bg-white bg-white hover:scale-110 transition-all duration-100 cursor-pointer'>
                Assign Task
            </Button>
        </>
    );
};

export default CreateTaskBtn;
