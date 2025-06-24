import React, {FormEvent, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import Modal from "@/components/popup/modal";
import TeamMemberForm from "@/components/team/team-member-form";

interface AddTeamMemberBtnProps {
    slug: string;
    onConfirm: () => void;
}

const AddTeamMemberBtn = ({slug, onConfirm}: AddTeamMemberBtnProps) => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    return (
        <>
            {modalIsOpened && <TeamMemberForm onConfirm={onConfirm} onClose={() => setModalIsOpened(false)}
                                              modalIsOpened={modalIsOpened} isEdit={false} slug={slug}/>}
            <Button onClick={() => setModalIsOpened(true)} className={'cursor-pointer hover:bg-[#333]'}><Plus/>Add user</Button>
        </>
    );
};

export default AddTeamMemberBtn;
