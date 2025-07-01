'use client'
import NotificationCard from "@/components/notification/notification-card";
import useFetch from "@/hooks/use-fetch";
import {Notification} from "@/model/notification";
import {getNotification} from "@/service/notification";
import NotificationStat from "@/components/notification/notification-stat";


const InboxScreen = () => {
    const {dataFetched: notifications, refetch} = useFetch<Notification>(getNotification ,[])

    const groupedByMonth: Record<string, Notification[]> = {};

    for (const notification of notifications) {
        const month = new Date(notification.createdAt).toLocaleString('default', {month: 'long'});

        if (!groupedByMonth[month]) {
            groupedByMonth[month] = [];
        }
        groupedByMonth[month].push(notification);
    }

    let content = (<div className={'flex flex-col gap-y-4'}>
        {Object.keys(groupedByMonth).map((month) => (
            <div key={month}>
                <h3 className={'text-[#646464] mb-2'}>{month}</h3>
                <div className="flex flex-col gap-2 w-full rounded-md overflow-hidden">
                    {groupedByMonth[month].map((notification) => (
                        <NotificationCard notification={notification} key={notification._id} refetch={refetch}/>
                    ))}
                </div>
            </div>
        ))}
    </div>)

    if (notifications?.length === 0) {
        content = <p className='text-lg'>You don't have any notifications.</p>
    }
    

    return (
        <div>
            <h1 className='text-2xl font-semibold mb-4'>Notifications</h1>
            <NotificationStat />
            {content}
        </div>
    );
};

export default InboxScreen;
