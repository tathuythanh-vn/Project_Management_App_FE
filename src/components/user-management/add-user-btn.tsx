import React, {useState} from 'react';
import Modal from "@/components/popup/modal";
import UserForm from "@/components/user-management/user-form";
import {Pencil, Plus} from "lucide-react";
import {PublicUser} from "@/model/user";
import {Button} from "@/components/ui/button";

interface AddUserBtnProps {
    refetch: () => void;
}

const AddUserBtn = ({refetch}: AddUserBtnProps) => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    return (
        <>
            <Modal isOpened={modalIsOpened} onClose={() => setModalIsOpened(false)} style={{width: '500px', maxWidth: '95%'}}>
                <UserForm
                    isEdit={false}
                    onCancel={() => setModalIsOpened(false)}
                    onConfirm={() => {
                        setModalIsOpened(false)
                        refetch()
                    }}
                />
            </Modal>
            <Button onClick={() => setModalIsOpened(true)} className={'cursor-pointer hover:bg-[#333]'}><Plus/>Add user</Button>
        </>
    );
};

export default AddUserBtn;
