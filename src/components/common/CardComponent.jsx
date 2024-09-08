/**
 * Card component
 * 
 * This component serves as a reusable card layout that can be used to display content in a structured format. It includes a header and allows for additional content to be passed as children.
 * 
 * Usage:
 * 
 * import Card from './path/to/Card';
 * import CardHeader from './path/to/CardHeader';
 * 
 * function ExampleUsage() {
 *   return (
 *     <Card>
 *       <CardHeader title="Card Title" />
 *       <p>This is some content inside the card.</p>
 *       <p>You can add more elements here as needed.</p>
 *     </Card>
 *   );
 * }
 * 
 * In this example, the Card component will display the title in the header, followed by the content provided as children.
 * @param {string} title - The title to be displayed in the card header,
 * @param {React.ReactNode} children - The content to be displayed inside the card.
 * @returns JSX.Element
 */

import { Box } from "@mui/material"
import { cardContainer } from "../../styles/global";
import CardHeader from "./CardHeader";

function Card({ title ,children}) {
  return (
    <Box component={'form'} direction="column" sx={{ ...cardContainer }}>
      {/* Card Title */}
      <CardHeader title={title} />
      {children}
    </Box>
  )
}

export default Card

