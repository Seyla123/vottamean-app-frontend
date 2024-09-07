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
 * In this example, the Card component will display the title "School Information" in the header, followed by the content provided as children.
 * 
 * @param {React.ReactNode} children - The content to be displayed inside the card.
 * @returns JSX.Element
 */

import { Box } from "@mui/material"
import { cardContainer } from "../../styles/global";
import CardHeader from "./CardHeader";

function Card({ children }) {
  return (
    <Box component={'form'} direction="column" sx={{ ...cardContainer }}>
      {/* Card Title */}
      <CardHeader title="School Information" />
      {children}
    </Box>
  )
}

export default Card

