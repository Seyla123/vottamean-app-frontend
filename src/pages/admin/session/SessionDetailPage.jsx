import FormComponent from "../../../components/common/FormComponent"
import CardComponent from "../../../components/common/CardComponent"
import CardInformation from "../../../components/common/CardInformation"
import { useGetSessionByIdQuery } from "../../../services/sessionApi"
import  LoadingCircle  from "../../../components/loading/LoadingCircle"
import { useNavigate,useParams } from "react-router-dom"
import { calculatePeriod } from "../../../utils/formatData"
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';
import { useDispatch, useSelector } from "react-redux"
import { useDeleteSessionMutation } from "../../../services/sessionApi"
import { useEffect } from "react"

function SessionDetailPage() {
  // get the id from the route params
  const {id} = useParams();
  const {data , isError, isLoading} = useGetSessionByIdQuery(id); 
  // const [remove , result] = useDeleteSessionMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { modal } = useSelector((state) => state.ui);

  const [deleteSession, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError, error }] = useDeleteSessionMutation();

  // When the delete is in progress, show a snackbar with a message "Deleting..."
  // When the delete is failed, show a snackbar with an error message
  // When the delete is successful, show a snackbar with a success message and navigate to the class list page
  useEffect(() => {
    if (isDeleting) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleting...', severity: 'info' }),
      );
    } else if (isDeleteError) {
      dispatch(setSnackbar({ open: true, message: error.data.message, severity: 'error', }),);
    } else if (isDeleteSuccess) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success', }),
      );
      navigate('/admin/sessions');
    }
  }, [dispatch, isDeleteError, isDeleteSuccess, isDeleting]);

  // handle confirm deletion
  const handleDeleteConfirm = async () => {
    dispatch(setModal({ open: false }));
    await deleteSession(id).unwrap();
    navigate('/admin/sessions');
  };

  // handle delete action
  const handleDelete = (rows) => {
    dispatch(setModal({ open: true }));
    
  };

  const clickEdit = () => {
    navigate(`/admin/sessions/update/${id}`);
  }

  const clickDetele = ()=>{
    // remove(id)
  }

  if(isLoading){
    return <LoadingCircle/>
  }

  if(isError){
    console.log('error message :', error.data.message);
  }
  
  const session = data?.data ? {
    "Teach By": `${data.data.Teacher.Info.first_name} ${data.data.Teacher.Info.last_name}`,
    "Time": `${data.data.Period.start_time} - ${data.data.Period.end_time}`,
    "Period": calculatePeriod(data.data.Period.start_time, data.data.Period.end_time),
    "Subject": data.data.Subject.name,
    "Class": data.data.Class.class_name,
    "Day of week": data.data.DayOfWeek.day,
  } : {};

  return (
<FormComponent title={'Session Detail'} subTitle={"These are Session's information"}>
  <CardComponent 
    title={"Subject Information"} 
    handleEdit={clickEdit} 
    handleDelete={handleDelete}>
    <CardInformation  data={session} />
  </CardComponent>
  <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={handleDeleteConfirm}
        itemName="Session"
      />
</FormComponent>
  )
}

export default SessionDetailPage
