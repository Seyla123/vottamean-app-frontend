/**
 * SelectField component
 * 
 * This component is used to render a select field with a label and options.
 * 
 * Usage:
 * 
 * import SelectField from './path/to/SelectField';
 * 
 * const options = [
 *   { value: 'option-1', label: 'Option 1' },
 *   { value: 'option-2', label: 'Option 2' },
 * ];
 * 
 * <SelectField
 *   label="Select an option"
 *   name="select-option"
 *   value={selectedOption}
 *   onChange={handleChange}
 *   options={options}
 *   placeholder="Select an option"
 * />
 * 
 * @param {string} label - The label to be displayed above the select field.
 * @param {string} name - The name of the select field.
 * @param {string} value - The current value of the select field.
 * @param {function} onChange - The change handler for the select field.
 * @param {array} options - An array of objects with value and label properties.
 * @param {string} placeholder - The placeholder text to be displayed when no option is selected.
 * @returns JSX.Element
 */
import {Box, MenuItem, Select, Typography} from "@mui/material";
function SelectField({ label, name, value, onChange, options ,placeholder, customStyle}) {
  return (
    <Box display="flex" flexDirection="column" gap="4px" sx={customStyle}>
      <Typography sx={{ fontSize: "16px" }}>{label}</Typography>
      <Select
        value={value}
        onChange={onChange}
        name={name}
        displayEmpty
        renderValue={(selected) => selected || (
          <Box component="p" variant="body2" sx={{ color: "#B5B5B5" }}>
            {placeholder}
          </Box>
        )}
      >
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}
export default SelectField
