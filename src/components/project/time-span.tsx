import React from 'react';
import {Timer} from 'lucide-react'
import {formatToMonthWeekDay} from "@/utils/helper";

interface TimeSpanProps {
    title?: string;
    timestamp?: string;
}

const TimeSpan = ({title, timestamp}: TimeSpanProps) => {
    if (!timestamp) return;
    const time = formatToMonthWeekDay(new Date(timestamp), new Date());

    return (
        <div className={'flex flex-col items-center'}>
            {title && <p className={'text-stone-700'}>{title}</p>}
            <div className={'bg-[#EBF5EE] text-[#4BA655] rounded-lg p-2 flex items-center gap-1'}>
                <Timer className={'w-5 h-5 '}/>
                <span>{time}</span>
            </div>
        </div>
    );
};

export default TimeSpan;
