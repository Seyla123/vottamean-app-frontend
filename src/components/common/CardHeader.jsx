/**
 * CardHeader component
 *
 * This component renders a header section for a card. It includes:
 * - A title
 * - Optional edit and delete action icons
 * - A divider separating the header from the rest of the card content
 *
 * The edit and delete icons are only displayed if their corresponding handlers are provided. When clicked, these icons trigger their respective callback functions.
 *
 * Usage:
 *
 * import CardHeader from './CardHeader';
 *
 * function handleEdit() {
 *   console.log("Edit clicked");
 * }
 *
 * function handleDelete() {
 *   console.log("Delete clicked");
 * }
 *
 * <CardHeader
 *   title="Your Card Title"
 *   handleEdit={handleEdit}
 *   handleDelete={handleDelete}
 * />
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.title - The title to be displayed in the card header.
 * @param {function} [props.handleEdit] - (Optional) Callback function to be triggered when the edit icon is clicked.
 * @param {function} [props.handleDelete] - (Optional) Callback function to be triggered when the delete icon is clicked.
 *
 * @returns {JSX.Element} The rendered CardHeader component.
 */

import { Stack, Typography, Divider, IconButton } from '@mui/material';
import { PencilLineIcon, Trash2 } from 'lucide-react';
function CardHeader({ title, handleEdit, handleDelete }) {
  return (
    <Stack component={'div'} direction="column" gap={1}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction="row" gap={1}>
          {handleEdit && (
            <IconButton onClick={handleEdit} color="primary">
              <PencilLineIcon size={18} />
            </IconButton>
          )}
          {handleDelete && (
            <IconButton onClick={handleDelete} color="error">
              <Trash2 size={18} />
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CardHeader;
