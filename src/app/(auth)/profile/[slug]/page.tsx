import React from 'react';
import AccountForm from "@/components/profile/account-form";

const ProfilePage = async ({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;

    return (
        <div className=''>
            <AccountForm slug={slug}/>
        </div>
    );
};

export default ProfilePage;
