"use client"

import React, {FormEvent, useState} from "react"
import {addProjectMember, editProjectMember} from "@/service/project"
import {toast} from "sonner"
import InputField from "@/components/form/input-field"
import Message from "@/components/text/message"
import {Button} from "../ui/button"
import Modal from "@/components/popup/modal"
import {Member} from "@/model/team"
import SelectTeamMember from "@/components/select/select-team-member";
import {Project} from "@/model/project";

interface ProjectMemberFormProps {
    onConfirm: () => void
    onClose: () => void
    isEdit?: boolean
    slug: string
    member?: Member
    modalIsOpened?: boolean
    project?: Project
}

const ProjectMemberForm = ({
                               onConfirm,
                               onClose,
                               isEdit = false,
                               slug,
                               member,
                               modalIsOpened = false,
                               project
                           }: ProjectMemberFormProps) => {
    const [error, setError] = useState<string>("")

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const role = formData.get("role") as string

        try {
            const response = isEdit
                ? await editProjectMember(member!.userId._id, role, slug)
                : await addProjectMember({email, role}, slug)

            const data = await response.json()
            if (!response.ok) throw new Error(data.message)

            toast.success(isEdit ? "Project member updated" : "Project member added")

            onClose()
            onConfirm()
        } catch (e) {
            setError(e instanceof Error ? e.message : "An error occurred.")
        }
    }

    return (
        <Modal isOpened={modalIsOpened} onClose={onClose} style={{width: "400px"}}>
            <form onSubmit={submitHandler}>
                <h3 className="font-semibold text-xl mb-4">
                    {isEdit ? "Edit Project Member" : "Add Project Member"}
                </h3>

                <div className="mb-4">
                    {isEdit ? <InputField name="email"
                                          defaultValue={member?.userId.email}
                                          isFocused={!!isEdit}
                                          disabled={isEdit}
                        >
                            Email</InputField> :
                        <SelectTeamMember name={'email'} project={project!}/>}
                </div>
                <InputField
                    name="role"
                    defaultValue={member?.role}
                    isFocused={!!isEdit}
                >
                    Role
                </InputField>
                {error && <Message>{error}</Message>}
                <div className="flex items-center justify-center gap-2 mt-4">
                    <Button type="button" variant="destructive" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Confirm</Button>
                </div>
            </form>
        </Modal>
    )
}

export default ProjectMemberForm
