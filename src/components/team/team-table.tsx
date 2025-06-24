'use client'

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {CloudDownload, Pencil, Plus, Trash2} from "lucide-react";
import {useCallback, useState} from "react";
import useFetch from "@/hooks/use-fetch";
import {deleteTeamMember, getTeamMembers} from "@/service/team";
import {PublicUser} from "@/model/user";
import {capitalize} from "@/utils/helper";
import AddTeamMemberBtn from "@/components/team/add-team-member-btn";
import AlertConfirm from "@/components/popup/alert-confirm";
import {toast} from "sonner"
import {useAuth} from "@/context/auth-context";
import EditTeamMemberBtn from "@/components/team/edit-team-member-btn";

interface TeamTableProps {
    slug: string;
}

const TeamTable = ({slug}: TeamTableProps) => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    const {user} = useAuth()

    const fetchFn = useCallback(() => getTeamMembers(slug), [slug]);
    const {dataFetched: members, error, isLoading, refetch} = useFetch<{
        userId: PublicUser,
        role: string
    }>(fetchFn, [])

    if (members.length === 0 && !isLoading) return (
        <h3 className={'text-center font-semibold text-xl mt-8'}>Good! You dont have any task left</h3>
    )

    const deleteHandler = async (userId: string) => {
        try {
            const response = await deleteTeamMember(slug, userId);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message);
            }

            toast.success("Member has been removed.")
            await refetch();
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Failed to remove member.');
        }
    }

    return (
        <div className={'bg-white rounded-md shadow-sm'}>
            <div className={'flex justify-between items-center p-4 border-b border-stone-200'}>
                <div className={'flex items-center gap-2'}>
                    <p className={'text-xl font-semibold'}>Team members</p>
                    <Badge className={'font-semibold'} variant={'secondary'}>{members.length} users</Badge>
                </div>
                <div className={'flex items-center gap-4'}>
                    <Button className={'bg-white cursor-pointer'}
                            variant={'outline'}><CloudDownload/>Download CSV</Button>
                    <AddTeamMemberBtn slug={slug} onConfirm={refetch}/>
                </div>
            </div>
            <table className='w-full table-auto border-collapse'>
                <thead>
                <tr className={'text-left'}>
                    <th className={'p-4'}>Name</th>
                    {/*<th className={'p-4'}>Status</th>*/}
                    <th className={'p-4'}>Email Address</th>
                    <th className={'p-4'}>Roles</th>
                    <th className={'p-4'}>Projects</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {members.length > 0 && members?.map((member) => (
                    <tr key={member.userId._id}>
                        <td className={'p-4'}>{member.userId.fullName}</td>
                        {/*<td className={'p-4'}>{member.userId.active ? 'Active' : 'Unactive'}</td>*/}
                        <td className={'p-4'}>{member.userId.email}</td>
                        <td className={'p-4'}>
                            <Badge
                                variant={member.role === 'owner' ? 'outline' : 'default'}>{capitalize(member.role)}</Badge>
                        </td>
                        <td className={'p-4'}>
                            {member.userId.projects.length > 0 ? (
                                member.userId.projects.map((project) => (
                                    <Badge variant={'secondary'} key={project._id}>{project.title}</Badge>
                                ))
                            ) : <Badge variant={'destructive'}>Not assigned</Badge>}
                        </td>
                        <td>
                            <div className={'flex gap-2'}>
                                {(member.role !== 'owner' && user?.userRole === 'manager') && (
                                    <>
                                        <EditTeamMemberBtn member={member} onConfirm = {refetch} slug={slug}/>
                                        <AlertConfirm
                                            onConfirm={() => deleteHandler(member.userId._id)}>
                                            <Trash2
                                                size={18}
                                                className={'hover:text-red-500 hover:scale-110 cursor-pointer transition-all duration-300'}/>
                                        </AlertConfirm>
                                    </>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamTable;
