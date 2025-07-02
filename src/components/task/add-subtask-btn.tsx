'use client'
import {Plus} from "lucide-react";
import Modal from "@/components/popup/modal";
import {useState} from "react";
import SubtaskForm from "@/components/task/subtask-form";

interface AddSubtaskBtnProps {
    taskId: string;
    refetch: () => void;
    onConfirm: () => void;
}

const AddSubtaskBtn = ({taskId, refetch}: AddSubtaskBtnProps) => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    const onConfirm = () => {
        setModalIsOpened(false);
        refetch();
    }

    return (
        <>
            <Modal
                style={{width: '375px', maxWidth: '95%'}}
                isOpened={modalIsOpened}
                onClose={() => setModalIsOpened(false)}
            >
                <SubtaskForm taskId={taskId} onConfirm={onConfirm} onCancel={() => setModalIsOpened(false)}/>
            </Modal>
            <Plus className={'cursor-pointer'} onClick={() => setModalIsOpened(true)}/>
        </>
    );
};

export default AddSubtaskBtn;
