// React and MUI imports
import React from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  List,
  ListItem,
  Link,
} from '@mui/material';

// Section component for reusable content section
const Section = ({ id, title, children }) => (
  <>
    <Typography id={id} variant="body1" paragraph>
      <strong>{title}</strong>
    </Typography>
    {children}
  </>
);

// TableOfContentsLink component for reusable table of contents links
const TableOfContentsLink = ({ href, text }) => (
  <ListItem>
    <Link href={href} underline="hover">
      {text}
    </Link>
  </ListItem>
);

const TermsModal = ({ open, handleClose }) => {
  const sections = [
    {
      id: 'section1',
      title: '1. Definitions',
      content: (
        <>
          <Typography variant="body2" paragraph>
            1.1 “Service” refers to the functionalities provided by Vottamean,
            including, but not limited to, attendance management, user role
            management, and reporting features.
          </Typography>
          <Typography variant="body2" paragraph>
            1.2 “User” refers to any individual or entity using Vottamean,
            including administrators, teachers, students, and parents.
          </Typography>
          <Typography variant="body2" paragraph>
            1.3 “You” or “Your” refers to the User accessing the Service.
          </Typography>
        </>
      ),
    },
    {
      id: 'section2',
      title: '2. Acceptance of Terms',
      content: (
        <Typography variant="body2" paragraph>
          By creating an account or accessing and using Vottamean, you
          acknowledge that you have read, understood, and agreed to these Terms.
          These Terms constitute a binding agreement between you and HexCode+.
        </Typography>
      ),
    },
    {
      id: 'section3',
      title: '3. User Accounts and Responsibilities',
      content: (
        <>
          <Typography variant="body2" paragraph>
            3.1 <strong>Registration:</strong> To access certain features of the
            Service, you must create an account and provide accurate and
            complete information during the registration process. You agree to
            update your information to keep it accurate and complete.
          </Typography>
          <Typography variant="body2" paragraph>
            3.2 <strong>Account Security:</strong> You are responsible for
            maintaining the confidentiality of your account credentials. You
            agree not to share your login credentials with anyone and
            acknowledge that you are fully responsible for all activities that
            occur under your account.
          </Typography>
          <Typography variant="body2" paragraph>
            3.3 <strong>Prohibited Use:</strong> You agree not to use the
            Service for any illegal, unauthorized, or harmful purpose. Misuse or
            abuse of the Service may result in the suspension or termination of
            your account.
          </Typography>
        </>
      ),
    },
    {
      id: 'section4',
      title: '4. Services Provided',
      content: (
        <>
          <Typography variant="body2" paragraph>
            4.1 <strong>Attendance Management:</strong> The Service enables
            users to record and track attendance, view reports, and manage
            attendance-related data.
          </Typography>
          <Typography variant="body2" paragraph>
            4.2 <strong>User Roles:</strong> Different user roles (e.g., Admin,
            Teacher) have different levels of access and privileges. You agree
            to use the Service in accordance with the assigned role and
            permissions.
          </Typography>
          <Typography variant="body2" paragraph>
            4.3 <strong>Data Storage:</strong> Vottamean stores attendance data
            and other related information securely. You acknowledge that the
            integrity of data may depend on the accuracy and completeness of the
            information provided by users.
          </Typography>
        </>
      ),
    },
    {
      id: 'section5',
      title: '5. Data Privacy',
      content: (
        <>
          <Typography variant="body2" paragraph>
            5.1 <strong>Collection of Data:</strong> We collect and process data
            as described in our Privacy Policy. By using our Service, you
            consent to our collection and processing of your personal data.
          </Typography>
          <Typography variant="body2" paragraph>
            5.2 <strong>Data Security:</strong> We implement reasonable security
            measures to protect user data from unauthorized access, disclosure,
            or loss. However, no method of transmission over the Internet or
            electronic storage is 100% secure.
          </Typography>
          <Typography variant="body2" paragraph>
            5.3 <strong>User Consent:</strong> You acknowledge that by using
            Vottamean, you consent to the collection, storage, and processing of
            your information in accordance with our Privacy Policy.
          </Typography>
        </>
      ),
    },
    {
      id: 'section6',
      title: '6. Contact Information',
      content: (
        <Typography variant="body2" paragraph>
          If you have any questions or concerns about these Terms, please
          contact us at{' '}
          <a href="mailto:wavetrack.app@gmail.com">wavetrack.app@gmail.com</a>
          <br />
          <br />
          By using Vottamean, you agree to these Terms and Conditions.
          <br />
          <br />
          [October 28, 2024]
          <br />
          <strong>HexCode+</strong>
        </Typography>
      ),
    },
  ];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '600px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Terms and Conditions
        </Typography>

        {/* Table of Contents */}
        <Typography variant="subtitle1" gutterBottom>
          Table of Contents
        </Typography>
        <List dense sx={{ paddingLeft: '20px' }}>
          {sections.map(({ id, title }, index) => (
            <TableOfContentsLink
              key={id}
              href={`#${id}`}
              text={`${index + 1}. ${title}`}
            />
          ))}
        </List>

        {/* Content Sections */}
        {sections.map(({ id, title, content }) => (
          <Section key={id} id={id} title={title}>
            {content}
          </Section>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsModal;
