import {useState, useEffect} from 'react'
import WelcomeCard from '../common/WelcomeCard'
import { useGetUserProfileQuery } from '../../services/userApi';
import LoadingCircle from '../loading/LoadingCircle';

import SomethingWentWrong from '../common/SomethingWentWrong';
function TeacherWelcomeCard({subTitle, handleError}) {
    const [userData, setUserData] = useState({});
    const { data: user, isLoading, error, isSuccess } = useGetUserProfileQuery();
    useEffect(() => {
        if (user && isSuccess) {
            setUserData(user.data?.teacherProfile);
        }
    }, [user, isSuccess])
    
    return (
        <WelcomeCard
            subTitle={subTitle || `Welcome back to your dashboard`}
            name={userData?.Info?.first_name}
            schoolName={userData?.School?.school_name}
            isLoading={isLoading}
        />
    )
}

export default TeacherWelcomeCard