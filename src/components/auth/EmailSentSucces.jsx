import React from 'react'
import { Box, Typography } from '@mui/material'
import EmailSentIcon from '../../assets/icon/email-sent.svg';
import { ChevronLeft, Fingerprint, Mail } from 'lucide-react';
import { Link } from 'react-router-dom'
function EmailSentSucces({
    subTitle = 'We have sent a password reset link to your email. Please check your', title = "Email Sent" }) {
    return (
        <Box sx={styles.formContainer}>
            <Box sx={styles.emailContainer}>
                <img
                    src={EmailSentIcon}
                    alt="email-sent"
                    style={{ width: '200px' }}
                />
                <Typography variant="h4">{title}</Typography>
                <Typography variant="body1">
                    {subTitle}
                    <br />
                    Please check your {' '}
                    <Link
                        target="_blank"
                        to={'https://mail.google.com/mail/u/0/#inbox'}
                        style={{ textDecoration: 'underline' }}
                    >
                        Email
                    </Link>
                    .
                </Typography>
            </Box>
            <Link to={'/auth/signin'} style={styles.footer}>
                <ChevronLeft size={18} />
                <Typography variant="body2">Back to sign in</Typography>
            </Link>
        </Box>
    )
}
const styles = {
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        height: '100%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        margin: '0 auto',
    },
    emailContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        alignItems: 'center',
        textAlign: 'center',
    },
    footer: {
        color: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
    }
};
export default EmailSentSucces
