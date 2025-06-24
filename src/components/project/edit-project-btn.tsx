'use client'

import React, {FormEvent, useState} from 'react';
import {SquarePen} from "lucide-react";
import {Project} from "@/model/project";
import CreateProjectForm from "@/components/project/create-project-form";
import Modal from '../popup/modal';

interface EditProjectBtnProps {
    project: Project;
    children: React.ReactNode;
}

const EditProjectBtn = ({project, children}: EditProjectBtnProps) => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    return (
        <>
            <Modal isOpened={modalIsOpened} onClose={() => setModalIsOpened(false)}>
                <CreateProjectForm onClose={() => setModalIsOpened(false)} project={project}/>
            </Modal>
            <span className={'cursor-pointer'} onClick={() => setModalIsOpened(true)}>
                {children}
            </span>
        </>
    );
};

export default EditProjectBtn;