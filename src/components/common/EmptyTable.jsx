import { Box, Typography, TableRow, TableCell } from '@mui/material';
import EmptyDataImage from '../../assets/images/empty-image.svg';
const EmptyTable = ({ columns=[], emptyTitle, emptySubTitle, Img=EmptyDataImage }) => {
    return (
        <TableRow>
            <TableCell
                colSpan={columns.length + 2}
                sx={{
                    height: '600px',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                }}
            >
                <Box component={'div'}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    <Box component={'div'} 
                    sx={{ width: '100%', height: '300px' }}>
                        <img
                            src={Img}
                            alt="empty"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                    <Typography variant="h6" gutterBottom>
                        {emptyTitle}
                    </Typography>
                    <Typography variant="body2">{emptySubTitle}</Typography>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default EmptyTable;
