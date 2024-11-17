import { useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  PictureAsPdf as PdfIcon,
  TableChart as ExcelIcon,
} from '@mui/icons-material';
import { Download, DownloadIcon, File, X } from 'lucide-react';
import StyledButton from '../common/StyledMuiButton';
import { BootstrapDialog } from '../common/BootstrapDialog';
import pdfIcon from '../../assets/icon/pdf.png';
import excelIcon from '../../assets/icon/excel.png';
import { StyledTextField } from '../common/InputField';

// Styled ToggleButton for export options
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  width: '100%',
  textTransform: 'none',
  display: 'flex',
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
  border: '1px solid',
  borderRadius: 8,
  borderColor: theme.palette.primary.main,
  '&:not(.Mui-selected)': {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.divider,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const ExportMenu = ({
  handleExportsCsv,
  isExporting,
  handleExportPDF,
  handleExportXLSX,
  handleStudentLimit,
  studentLimit
}) => {
  const [open, setOpen] = useState(false);
  const [exportType, setExportType] = useState(null);
  
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setExportType(null);
  };

  const handleOnChange = (event) => {
    handleStudentLimit(event.target.value);
  };

  const handleExportTypeChange = (event, newType) => {
    setExportType(newType);
  };

  const handleExport = () => {
    if (exportType === 'pdf') {
      handleExportPDF();
    } else if (exportType === 'excel') {
      handleExportXLSX();
    }
    handleClose();
  };

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
            variant="contained"
            size="small"
            onClick={handleClickOpen}
            disabled={isExporting}
            endIcon={
              isExporting ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <DownloadIcon size={16} />
              )
            }
          >
            Export
          </StyledButton>

          <BootstrapDialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Choose Export Format</DialogTitle>
            <IconButton
              onClick={handleClose}
              sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <X />
            </IconButton>

            <DialogContent dividers>
              <Stack direction="column" gap={1} mb={1}>
                <InputLabel>Select number of rows to export </InputLabel>
                <StyledTextField
                  fullWidth
                  select
                  value={studentLimit}
                  onChange={handleOnChange}
                  size="small"
                  SelectProps={{
                    renderValue: (selected) => (
                      <Stack direction={'row'} gap={1} alignItems={'center'}>
                        <InputLabel> {selected}</InputLabel>
                      </Stack>
                    ),
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                </StyledTextField>
              </Stack>

              <Stack direction="column" gap={1}>
                <InputLabel>Select export format</InputLabel>
                <ToggleButtonGroup
                  value={exportType}
                  exclusive
                  onChange={handleExportTypeChange}
                  aria-label="export format"
                  orientation="vertical"
                  color="primary"
                >
                  <Grid container gap={1}>
                    <Grid item xs={12}>
                      <StyledToggleButton
                        value="pdf"
                        aria-label="export as PDF"
                      >
                        <Avatar
                          src={pdfIcon}
                          alt="PDF Icon"
                          variant="rounded"
                        />
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography variant="subtitle1">
                            PDF Document
                          </Typography>
                          <Typography variant="body2" color="inherit">
                            Export data as a formatted PDF file
                          </Typography>
                        </Box>
                      </StyledToggleButton>
                    </Grid>

                    <Grid item xs={12}>
                      <StyledToggleButton
                        value="excel"
                        aria-label="export as Excel"
                      >
                        <Avatar
                          src={excelIcon}
                          alt="EXCEL Icon"
                          variant="rounded"
                        />
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography variant="subtitle1">
                            Excel Spreadsheet
                          </Typography>
                          <Typography variant="body2" color="inherit">
                            Export data as an Excel XLSX file
                          </Typography>
                        </Box>
                      </StyledToggleButton>
                    </Grid>
                  </Grid>
                </ToggleButtonGroup>
              </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
              <StyledButton onClick={handleClose} size="small">
                Cancel
              </StyledButton>
              <StyledButton
                onClick={handleExport}
                variant="contained"
                size="small"
                disabled={!exportType}
              >
                {isExporting ? 'Exporting...' : 'Export Now'}
              </StyledButton>
            </DialogActions>
          </BootstrapDialog>
        </Box>
      )}
    </Stack>
  );
};

export default ExportMenu;
