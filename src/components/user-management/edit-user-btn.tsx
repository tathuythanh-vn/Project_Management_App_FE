import React, {useState} from 'react';
import Modal from "@/components/popup/modal";
import UserForm from "@/components/user-management/user-form";
import {Pencil} from "lucide-react";
import {PublicUser} from "@/model/user";

interface EditUserBtnProps {
    user: PublicUser;
    refetch: () => void;
}

const EditUserBtn = ({user, refetch}: EditUserBtnProps) => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    return (
        <>
            <Modal isOpened={modalIsOpened} onClose={() => setModalIsOpened(false)} style={{width: 'fit-content', maxWidth: '95%'}}>
                <UserForm
                    user={user}
                    isEdit={true}
                    onCancel={() => setModalIsOpened(false)}
                    onConfirm={() => {
                        setModalIsOpened(false)
                        refetch()
                    }}
                />
            </Modal>
            <Pencil
                size={18}
                className={'hover:text-blue-500 hover:scale-110 cursor-pointer transition-all duration-300'}
                onClick={() => setModalIsOpened(true)}
            />
        </>
    );
};

export default EditUserBtn;
