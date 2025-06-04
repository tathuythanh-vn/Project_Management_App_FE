'use client'
import CreateProjectForm from "@/components/form/create-project-form";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import Modal from "@/components/popup/modal";

const CreateProjectButon = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <>
            <Modal isOpened={isOpened} onClose={() => setIsOpened(false)}>
                <CreateProjectForm onClose={() => setIsOpened(false)}/>
            </Modal>
            <Button onClick={() => setIsOpened(true)}
                    className='bg-[#096eff] hover:bg-blue-700 cursor-pointer'>Create</Button>
        </>
    );
};

export default CreateProjectButon;
