"use client"

import {createColumns} from "./collumn"
import {DataTable} from "./data-table"

import {getProjectStatistics} from "@/service/project";
import useFetch from "@/hooks/use-fetch";
import {useEffect, useMemo, useState} from "react";
import {ProjectProgress} from "@/model/project";
import {PublicUser} from "@/model/user";
import {getUsers} from "@/service/user";


const UserManagementTable = () => {
    const {dataFetched: users, refetch} = useFetch<PublicUser>(getUsers, []);

    // Memoize columns to prevent unnecessary re-renders
    const columns = useMemo(() =>
            createColumns({refetch}),
        [refetch]
    );


    return (
        <div className="container mx-auto">
            <DataTable columns={columns} data={users} refetch={refetch}/>
        </div>
    )
}

export default UserManagementTable;
