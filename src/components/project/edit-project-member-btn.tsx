import React, {useState} from 'react';
import {Pencil} from "lucide-react";
import Modal from '../popup/modal';
import TeamMemberForm from "@/components/team/team-member-form";
import {Member} from "@/model/team";
import ProjectMemberForm from "@/components/project/project-member-form";
import {Project} from "@/model/project";

interface EditProjectMemberBtnProps {
    member: Member;
    onConfirm: () => void;
    slug: string;
    project?: Project;
}

const EditProjectMemberBtn = ({member, onConfirm, slug, project}: EditProjectMemberBtnProps) => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    return (
        <>
            {modalIsOpened && <ProjectMemberForm project={project ? project : undefined} slug={slug} isEdit={true} onConfirm={onConfirm} onClose={() => setModalIsOpened(false)} modalIsOpened={modalIsOpened} member={member} />}
            <Pencil
                size={18}
                className={'hover:text-blue-500 hover:scale-110 cursor-pointer transition-all duration-300'}
                onClick={() => setModalIsOpened(true)}
            />
        </>
    );
};

export default EditProjectMemberBtn;
