import {useState, useEffect} from 'react'
import WelcomeCard from '../common/WelcomeCard'
import { useGetUserProfileQuery } from '../../services/userApi';
function TeacherWelcomeCard({subTitle}) {
    const [userData, setUserData] = useState({});
    const [schoolName, setSchoolName] = useState(null);
    const { data: user, isLoading, error, isSuccess } = useGetUserProfileQuery();
    useEffect(() => {
        if (user && isSuccess) {
            setUserData(user?.data?.teacherProfile);
            setSchoolName(user?.data?.teacherProfile?.School[0]?.school_name)
        }
    }, [user, isSuccess])
    
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