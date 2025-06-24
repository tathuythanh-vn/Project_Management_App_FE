import Link from 'next/link';
import {ArrowLeft} from "lucide-react";
import {Team} from "@/model/team";
import {getTeam} from "@/service/team";
import AvatarGroup from "@/components/avatar-group";
import TeamTable from "@/components/team/team-table";
import {Project} from "@/model/project";
import ProjectCard from "@/components/project/project-card";

const TeamDetailScreen = async ({params}: { params: Promise<{ slug: string }> }) => {
    const {slug} = await params;

    let team: Team | undefined = undefined;
    let projects: Project[] | undefined = undefined;

    try {
        const response = await getTeam(slug);
        const {data} = await response.json();
        projects = data;
    } catch (error) {
        console.error(error)
    }

    try {
        const response = await getTeam(slug);
        const {data} = await response.json();
        team = data;
    } catch (error) {
        console.error(error)
    }

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
            <AvatarGroup user={team.members!} visibleCount={5} />
            {/*{projects?.map((project: Project) => (*/}
            {/*    <ProjectCard key={project._id} {...project}/>*/}
            {/*))}*/}
            <TeamTable slug={slug} />
        </div>
    );
};

export default TeamDetailScreen;
