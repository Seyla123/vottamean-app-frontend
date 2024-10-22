import { Button, CircularProgress, Menu, MenuItem, Stack, Box } from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon, Edit as EditIcon, FileCopy as FileCopyIcon } from '@mui/icons-material';
import { useState } from 'react';
import { alpha ,styled} from '@mui/material/styles';
import { DownloadIcon } from "lucide-react";
import StyledButton from '../common/StyledMuiButton';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
        ...theme.applyStyles('dark', {
            color: theme.palette.grey[300],
        }),
    },
}));

const ExportMenu = ({
    handleExportsCsv,
    isExporting,
    handleExportPDF,
    handleExportXLSX,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const exportPDF = () => {
        handleExportPDF();
        handleClose();
    };
    const exportXLSX = () => {
        handleExportXLSX();
        handleClose();
    }
    return (
        <Stack direction="row" justifyContent="flex-end" sx={{ width: '100%' }}>
            {handleExportsCsv ? (
                <StyledButton
                    variant="contained"
                    size="small"
                    endIcon={
                        isExporting ? (
                            <CircularProgress size={16} color="inherit" />
                        ) : (
                            <DownloadIcon size={16} />
                        )
                    }
                    disabled={isExporting}
                    onClick={handleExportsCsv}
                    sx={{ alignSelf: 'flex-end' }}
                >
                    Export CSV
                </StyledButton>
            ) : (
                <Box>
                    <StyledButton
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="contained"
                        size="small"
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        exports
                    </StyledButton>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={exportPDF} disableRipple>
                            <EditIcon />
                            PDF
                        </MenuItem>

                        <MenuItem onClick={exportXLSX} disableRipple>
                            <FileCopyIcon />
                            EXCEL
                        </MenuItem>
                    </StyledMenu>
                </Box>
            )}
        </Stack>
    );
};

export default ExportMenu