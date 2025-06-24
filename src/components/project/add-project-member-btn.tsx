import React, {FormEvent, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import Modal from "@/components/popup/modal";
import TeamMemberForm from "@/components/team/team-member-form";
import ProjectMemberForm from "@/components/project/project-member-form";
import {Project} from "@/model/project";

interface AddProjectMemberBtnProps {
    slug: string;
    onConfirm: () => void;
    project: Project;
}

const AddProjectMemberBtn = ({slug, onConfirm, project}: AddProjectMemberBtnProps) => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    return (
        <>
            {modalIsOpened && <ProjectMemberForm project={project} onConfirm={onConfirm} onClose={() => setModalIsOpened(false)}
                                              modalIsOpened={modalIsOpened} isEdit={false} slug={slug}/>}
            <Button onClick={() => setModalIsOpened(true)} className={'cursor-pointer text-white bg-[#036EFF] hover:scale-110 hover:bg-blue-600'}><Plus/>Add user</Button>
        </>
    );
};

export default AddProjectMemberBtn;
