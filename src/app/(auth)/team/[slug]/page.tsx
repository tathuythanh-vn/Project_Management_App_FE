import Link from 'next/link';
import {ArrowLeft} from "lucide-react";
import {Member, Team} from "@/model/team";
import {getTeam, getTeamMembers} from "@/service/team";
import AvatarGroup from "@/components/avatar-group";
import TeamTable from "@/components/team/team-table";
import {Project} from "@/model/project";
import ProjectCard from "@/components/project/project-card";

const TeamDetailScreen = async ({params}: { params: Promise<{ slug: string }> }) => {
    const {slug} = await params;

    const [team, members] = await Promise.all([
        getTeam(slug).then(res => res.json()).then(res => res.data),
        getTeamMembers(slug)
            .then(res => {
                return res.json();
            })
            .then(res => {
                return res.data?.data || [];
            })
    ]);

    if (!team) {
        return <div className="p-6 text-center text-gray-500">Failed to load team.</div>;
    }

    return (
        <div>
            <div className='flex items-center gap-1 mb-4'>
                <Link href={`/team`}><ArrowLeft className={'text-stone-700'} size={24}/></Link>
                <p className={'text-base text-stone-700'}>Teams</p>
            </div>
            <h1 className='text-2xl font-semibold mb-2'>{team.name}</h1>
            <p className={'mb-4'}>{team.description}</p>
            <AvatarGroup user={members} visibleCount={4} />
            <TeamTable slug={slug} />
        </div>
    );
};

export default TeamDetailScreen;
