'use client'

import {createColumns} from "./collumn"
import {DataTable} from "./data-table"
import {useEffect, useMemo, useState} from "react";
import {RecentActivity} from "@/model/recent-activity";
import {getActivities} from "@/service/recent-activity";


const RecentActivityTable = () => {
    const [activities, setActivities] = useState<RecentActivity[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getActivities();
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data?.message);
                }

                setActivities(data.data);
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
            <DataTable columns={columns} data={activities}/>
        </div>
    )
}

export default RecentActivityTable;