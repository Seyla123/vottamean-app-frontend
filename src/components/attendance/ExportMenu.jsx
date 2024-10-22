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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  PictureAsPdf as PdfIcon,
  TableChart as ExcelIcon,
} from '@mui/icons-material';
import { DownloadIcon, File } from 'lucide-react';
import StyledButton from '../common/StyledMuiButton';
import { BootstrapDialog } from '../common/BootstrapDialog';
import pdfIcon from '../../assets/icon/pdf.png';
import excelIcon from '../../assets/icon/excel.png';

// Styled ToggleButton for export options
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  width: '100%',
  textTransform: 'none',
  display: 'flex',
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
  border: '1px solid',
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
}) => {
  const [open, setOpen] = useState(false);
  const [exportType, setExportType] = useState(null);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setExportType(null);
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
            endIcon={<DownloadIcon size={14} />}
          >
            Export
          </StyledButton>

          <BootstrapDialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              Choose Export Format
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Select the format you want to export your data to
              </Typography>
            </DialogTitle>

            <DialogContent>
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
                    <StyledToggleButton value="pdf" aria-label="export as PDF">
                      <Avatar src={pdfIcon} alt="PDF Icon" variant="rounded" />
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
                endIcon={
                  isExporting ? (
                    <CircularProgress size={16} />
                  ) : (
                    <DownloadIcon size={16} />
                  )
                }
              >
                Export now
              </StyledButton>
            </DialogActions>
          </BootstrapDialog>
        </Box>
      )}
    </Stack>
  );
};

export default ExportMenu;
