/**
 * CardHeader component
 * 
 * This component is used to render a header for a card, including a title and a divider.
 * 
 * Usage:
 * 
 * import CardHeader from './CardHeader';
 * 
 * <CardHeader title="Your Card Title" />
 * 
 * @param {string} title - The title to be displayed in the card header.
 * @returns JSX.Element
 */

import { Stack, Typography, Divider } from "@mui/material"
function CardHeader({ title }) {
    return (
        <Stack component={'div'} direction="column" gap={1}>
            <Typography variant="formTitle" >{title}</Typography>
            <Divider sx={{ borderWidth: 1, borderColor: "text.secondary" }} />
        </Stack>
    )
}

export default CardHeader;