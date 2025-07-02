"use client"

import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {useEffect, useState} from "react";
import {TeamMemberStat} from "@/model/team";
import {getTeamMemberStats} from "@/service/team";

const chartConfig = {
    completedTasks: {
        label: "Task Completed",
        color: "#2563eb",
    },
    projectsCount: {
        label: "Projects",
        color: "#60a5fa",
    },
} satisfies ChartConfig

function TeamProductivityChart() {
    const [chartData, setChartData] = useState<TeamMemberStat[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTeamMemberStats();
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setChartData(
                    data.data.map((item: any) => ({
                        ...item,
                        fullName: item.user.fullName, // flatten it for XAxis
                    }))
                );


            } catch (e) {
                console.error(e instanceof Error ? e.message : 'Something went wrong. Please try again later.');
            }
        }
        fetchData();
    }, []);

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] max-h-[320px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="fullName"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                />
                <YAxis
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent payload={undefined} />} />
                <Bar dataKey="completedTasks" fill={chartConfig.completedTasks.color} radius={4} />
                <Bar dataKey="projectsCount" fill={chartConfig.projectsCount.color} radius={4} />
            </BarChart>
        </ChartContainer>
    )
}

export default TeamProductivityChart;
