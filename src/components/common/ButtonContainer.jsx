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
import {Stack, Button} from '@mui/material'

function ButtonContainer({rightBtn, leftBtn, rightBtnTitle , leftBtnTitle}) {
    return (
        <>
            {/* Button Container  */}
            <Stack direction={'row'} alignSelf={'flex-end'} width={{ xs: '100%', sm: '340px' }} gap={{ xs: 1, sm: 2 }}>
                <Button fullWidth variant="outlined" color="white" onClick={leftBtn}>
                    {leftBtnTitle}
                </Button>
                <Button fullWidth variant="contained" onClick={rightBtn}>
                    {rightBtnTitle}
                </Button>
            </Stack>
        </>
    )
}

export default ButtonContainer
