/**
 * FormComponent
 *
 * This component is used to render a form layout that includes a title and an subtitle,
 * followed by any additional content passed as children. It utilizes the TitleHeader component
 * for displaying the title and subtitle.
 *
 * Usage:
 *
 * import FormComponent from './path/to/FormComponent';
 *
 * <FormComponent title="Form Title" subTitle="This is a subtitle">
 *   <YourFormContent />
 * </FormComponent>
 *
 * In this example, the FormComponent will display the provided title and subtitle,
 * followed by any content passed as children.
 *
 * @param {string} title - The main title to be displayed in the form header.
 * @param {string} [subTitle] - An optional subtitle to provide additional context or information.
 * @param {React.ReactNode} children - The content to be displayed inside the form.
 * @returns JSX.Element
 */

import TitleHeader from './TitleHeader';
import { Stack } from '@mui/material';
function FormComponent({ title, subTitle, children }) {
  return (
    <Stack component={'div'} direction="column" gap={2} mt={4}>
      {/* <TitleHeader title={title} subTitle={subTitle} /> */}
      {children}
    </Stack>
  );
}

export default FormComponent;
