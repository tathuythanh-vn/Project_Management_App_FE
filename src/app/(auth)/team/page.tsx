'use client'

import React from "react";
import CreateTeamBtn from "@/components/team/create-team-btn";
import useFetch from "@/hooks/use-fetch";
import {getTeams} from "@/service/team";
import {Team} from "@/model/team";
import TeamCard from "@/components/team/team-card";

const TeamScreen = () => {
    const {dataFetched: teams, error, isLoading, refetch} = useFetch<Team>(getTeams, [])

    let content = (<div className='grid grid-cols-1 sm:3 lg:grid-cols-3 gap-4'>
        {teams?.map((team: Team) => (
            <TeamCard team={team} key={team._id} {...team}/>
        ))}
    </div>)

    if (error) {
        return <div className='text-center text-2xl'>
            {error}
        </div>
    }

    // Show loading state
    if (isLoading) {
        content = <p className='text-lg'>Loading teams...</p>
    }

    if (teams?.length === 0) {
        content = <p className='text-lg'>You don't have any teams.</p>
    }

    return (
        <div>
            <div className='flex justify-between mb-6'>
                <h1 className='text-2xl font-semibold'>All Teams</h1>
                <CreateTeamBtn onCreate={() => refetch()} />
            </div>
            {content}
        </div>
    );
};

export default TeamScreen;
