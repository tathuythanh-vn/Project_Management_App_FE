'use client'

import {createColumns} from "./collumn"
import {DataTable} from "./data-table"

import {getProjectStatistics} from "@/service/project";
import useFetch from "@/hooks/use-fetch";
import {useEffect, useMemo, useState} from "react";
import {ProjectProgress} from "@/model/project";


const ProjectStatisticTable = () => {
    const [projectStatistics, setProjectStatistics] = useState<ProjectProgress[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProjectStatistics();
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setProjectStatistics(data.data.projects);
            } catch (e) {
                console.error(e instanceof Error ? e.message : 'Something went wrong. Please try again later.');
            }
        }
        fetchData();
    }, []);

    // Memoize columns to prevent unnecessary re-renders
    const columns = useMemo(() =>
            createColumns(),
        []
    );


    return (
        <div className="container mx-auto">
            <DataTable columns={columns} data={projectStatistics}/>
        </div>
    )
}

export default ProjectStatisticTable;