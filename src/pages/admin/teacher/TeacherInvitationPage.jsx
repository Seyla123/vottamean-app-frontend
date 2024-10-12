// - React and third-party libraries
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

// - MUI Components

// - Custom Components
import DOBPicker from '../../../components/common/DOBPicker../../';
import PhoneInputField from '../../../components/common/PhoneInputField';
import InputField from '../../../components/common/InputField';
import GenderSelect from '../../../components/common/GenderSelect';
import StyledButton from '../common/StyledMuiButton';

// - Redux Hooks and APIs
import { useSendTeacherInvitationMutation } from '../../../services/teacherApi'
import { setSnackbar } from '../../../store/slices/uiSlice';

// - Validator
import { SendTeacherInvitationValidator } from '../../../validators/validationSchemas'

function TeacherInvitationPage() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [sendTeacherInvitation, { isLoading, isSuccess, isError, error }] = useSendTeacherInvitationMutation()

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        resolver: yupResolver(SendTeacherInvitationValidator),
        defaultValues: {
            email: '',
            first_name: '',
            last_name: '',
            gender: '',
            phone_number: '',
            address: '',
            dob: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await sendTeacherInvitation(data).unwrap();
            if (response) {
                console.log('Teacher signed up successfully', response);
            }
        } catch (err) {
            console.error('Signup failed:', err);
        }
    };

    // - Snackbar notifications based on API status
    useEffect(() => {
        if (isLoading) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: 'Creating new student....',
                    severity: 'info',
                    autoHideDuration: 6000,
                }),
            );
        } else if (isError) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: error?.data?.message || 'An error occurred during signup',
                    severity: 'error',
                    autoHideDuration: 6000,
                }),
            );
        } else if (isSuccess) {
            dispatch(
                setSnackbar({
                    open: true,
                    message: 'Created Successfully',
                    severity: 'success',
                    autoHideDuration: 6000,
                }),
            );
            // navigate('/admin/teachers');
        }
    }, [dispatch, isLoading, isError, error, isSuccess, navigate]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* STUDENT NAME */}
            <Box display="flex" flexDirection="row" sx={boxContainer}>
                <InputField
                    name="first_name"
                    control={control}
                    label="First Name"
                    placeholder="First Name"
                    errors={errors}
                    icon={UserRoundPen}
                />
                <InputField
                    name="last_name"
                    control={control}
                    label="Last Name"
                    placeholder="Last Name"
                    errors={errors}
                    icon={UserRoundPen}
                />
            </Box>

            {/* STUDENT GENDER AND DATE OF BIRTH */}
            <Box display="flex" flexDirection="row" sx={boxContainer}>
                <GenderSelect
                    control={control}
                    errors={errors}
                    name="gender"
                    label="Gender"
                    defaultValue={studentData.gender || ''}
                />
                <DOBPicker
                    control={control}
                    errors={errors}
                    name="dob"
                    dob={dob}
                    setDob={setDob}
                />
            </Box>

            {/* CONTACT INFORMATION */}
            <Box sx={{ ...textFieldGap, width: '100%' }}>
                <PhoneInputField
                    name="phone_number"
                    control={control}
                    label="Contact Number"
                    errors={errors}
                />
                <InputField
                    name="address"
                    control={control}
                    label="Street Address"
                    placeholder="Phnom Penh, Street 210, ..."
                    errors={errors}
                    required={false}
                    multiline
                    minRows={5}
                />
            </Box>
        </form>
    )
}

export default TeacherInvitationPage
