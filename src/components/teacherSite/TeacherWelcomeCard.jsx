import {useState, useEffect} from 'react'
import WelcomeCard from '../common/WelcomeCard'
import { useGetUserProfileQuery } from '../../services/userApi';
import LoadingCircle from '../loading/LoadingCircle';

import SomethingWentWrong from '../common/SomethingWentWrong';
function TeacherWelcomeCard({subTitle, handleError}) {
    const [userData, setUserData] = useState({});
    const [schoolName, setSchoolName] = useState(null);
    const { data: user, isLoading, error, isSuccess } = useGetUserProfileQuery();
    useEffect(() => {
        if (user && isSuccess) {
            setUserData(user?.data?.teacherProfile);
            setSchoolName(user?.data?.teacherProfile?.School[0]?.school_name)
        }
    }, [user, isSuccess])
    
    console.log('this school name : ', schoolName);
    
    return (
        <WelcomeCard
            subTitle={subTitle || `Welcome back to your home`}
            name={userData?.Info?.first_name}
            schoolName={schoolName}
            isLoading={isLoading}
        />
    )
}

export default TeacherWelcomeCard