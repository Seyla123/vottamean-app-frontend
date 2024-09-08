/**
 * Card component
 * 
 * This component is used to render a card with a header and content. It includes:
 * - A CardHeader component at the top, which displays the card's title and optional edit and delete action icons.
 * - Content passed as children, which will be rendered below the header.
 * 
 * Usage:
 * 
 * import Card from './Card';
 * 
 * function handleEdit() {
 *   console.log("Edit clicked");
 * }
 * 
 * function handleDelete() {
 *   console.log("Delete clicked");
 * }
 * 
 * <Card 
 *   title="Card Title" 
 *   handleEdit={handleEdit} 
 *   handleDelete={handleDelete}
 * >
 *   <p>Card content goes here.</p>
 * </Card>
 * 
 * @param {Object} props - The props for the component.
 * @param {string} props.title - The title to be displayed in the card header.
 * @param {function} [props.handleEdit] - (Optional) Callback function to be triggered when the edit icon is clicked.
 * @param {function} [props.handleDelete] - (Optional) Callback function to be triggered when the delete icon is clicked.
 * @param {React.ReactNode} props.children - The content to be displayed within the card below the header.
 * 
 * @returns {JSX.Element} The rendered Card component.
 */

import { Box } from "@mui/material"
import { cardContainer } from "../../styles/global";
import CardHeader from "./CardHeader";

function Card({title ,children, handleEdit, handleDelete}) {
  console.log('this is other :', handleEdit , handleDelete);
  
  return (
    <Box component={'form'} direction="column" sx={{ ...cardContainer }}>
      {/* Card Title */}
      <CardHeader title={title} handleEdit={handleEdit} handleDelete={handleDelete}/>
      {children}
    </Box>
  )
}

export default Card

