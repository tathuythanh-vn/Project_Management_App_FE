'use client'
import CreateProjectForm from "@/components/project/create-project-form";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import Modal from "@/components/popup/modal";
import CreateTeamForm from "@/components/team/create-team-form";

interface CreateProjectButonProps {
    onCreate: () => void;
}

const CreateProjectButon = ({onCreate}: CreateProjectButonProps) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <>
            <Modal isOpened={isOpened} onClose={() => setIsOpened(false)} style={{width: '375px', maxWidth: '95%'}}>
                <CreateTeamForm onClose={() => {
                    setIsOpened(false);
                    onCreate();
                }}/>
            </Modal>
            <Button onClick={() => setIsOpened(true)}
                    className='bg-[#096eff] hover:bg-blue-700 cursor-pointer'>Create new team</Button>
        </>
    );
};

export default CreateProjectButon;
