/**
 * ButtonContainer component
 * 
 * This component is used to render a button container with two buttons: Cancel and Confirm.
 * 
 * Usage:
 * 
 * import ButtonContainer from './ButtonContainer'
 * 
 * const rightBtn = () => {
 *   console.log('right button clicked')
 * }
 * const leftBtn = () => {
 *   console.log('left button clicked')
 * }
 * 
 * <ButtonContainer rightBtn={rightBtn} leftBtn={leftBtn} />
 * @param {string} rightBtnTitle - The title to be displayed in right button,
 * @param {string} leftBtnTitle - The title to be displayed in left button,
 * @param {function} rightBtn - function to be called when the right button is clicked
 * @param {function} leftBtn - function to be called when the left button is clicked
 * @returns JSX.Element
 */
import { Stack, Button, Box, Typography, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import StyledButton from './StyledMuiButton';

function ButtonContainer({ rightBtn, leftBtn, rightBtnTitle, leftBtnTitle, isSubmit, isSubmittingTitle }) {
    const navigate = useNavigate();
    const goBackHistory = () => {
        navigate(-1)
    }
    return (
        <>
            {/* Button Container  */}
            <Stack direction={'row'} alignSelf={'flex-end'} width={{ xs: '100%', sm: '340px' }} gap={{ xs: 1, sm: 2 }}>
                <StyledButton fullWidth variant="outlined" color="white" onClick={leftBtn ? leftBtn : goBackHistory}>
                    {leftBtnTitle}
                </StyledButton>
                <StyledButton fullWidth variant="contained" onClick={rightBtn}>
                    {isSubmit ? <> <Box display="flex" alignItems="center">
                        <CircularProgress size={24} color="inherit" />
                        <Typography variant="body2" style={{ marginLeft: '8px' }}>
                            {isSubmittingTitle}
                        </Typography>
                    </Box>
                    </> : rightBtnTitle}
                </StyledButton>

            </Stack>
        </>
    )
}

export default ButtonContainer
