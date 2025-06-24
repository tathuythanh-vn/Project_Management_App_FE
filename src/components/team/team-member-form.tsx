import React, {FormEvent, useState} from 'react';
import {addTeamMember, deleteTeamMember, editTeamMember} from "@/service/team";
import {toast} from "sonner";
import InputField from "@/components/form/input-field";
import Message from "@/components/text/message";
import {Button} from '../ui/button';
import Modal from "@/components/popup/modal";
import {Member} from "@/model/team";

interface TeamMemberFormProps {
    onConfirm: () => void;
    onClose: () => void;
    isEdit?: boolean;
    slug?: string;
    member?: Member;
    modalIsOpened?: boolean;
}

const TeamMemberForm = ({
                            onConfirm,
                            onClose,
                            isEdit = false,
                            slug,
                            modalIsOpened = false,
                            member
                        }: TeamMemberFormProps) => {
    const [error, setError] = useState<string>('');

    const addHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);

            const email = formData.get("email") as string;
            const role = formData.get("role") as string;

            const response = await addTeamMember({email, role}, slug!);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            toast.success("Added successfully");
            onClose();
            onConfirm()
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An error occurred.');
        }
    }

    const editHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const role = formData.get("role") as string;

        try {
            const response = await editTeamMember(member!.userId._id, role, slug!);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message);
            }

            toast.success("Member has been removed.")
            onClose();
            onConfirm()
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An error occurred.');
        }
    }

    return (
        <Modal isOpened={modalIsOpened} onClose={onClose} style={{width: '400px'}}>
            <form onSubmit={!isEdit ? addHandler : editHandler}>
                <h3 className={'font-semibold text-xl mb-4'}>{!isEdit ? 'Add new member' : 'Edit member'}</h3>
                <InputField name={'email'} defaultValue={member?.userId.email} disabled={isEdit}>Email</InputField>
                <InputField name={'role'} defaultValue={member?.role} isFocused>Role</InputField>
                {error && <Message>{error}</Message>}
                <div className="flex items-center justify-center gap-2 mt-4">
                    <Button type="button" variant={'destructive'} onClick={onClose}>Cancel</Button>
                    <Button type="submit">Confirm</Button>
                </div>
            </form>
        </Modal>
    );
};

export default TeamMemberForm;
