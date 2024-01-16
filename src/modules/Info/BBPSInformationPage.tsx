
import { Container, Typography, Paper } from '@mui/material';

const BBPSInformationPage = () => {
  return (
    <Container>
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h4" gutterBottom>
          Bharat Bill Payment System (BBPS)
        </Typography>
        <Typography variant="body1" paragraph>
          The Bharat Bill Payment System (BBPS) is an integrated online platform introduced by the National Payments Corporation of India (NPCI).
          It facilitates secure and convenient bill payments for various services, including electricity, water, gas, DTH, broadband, and insurance premiums.
        </Typography>
        <Typography variant="body1" paragraph>
          Key Features:
          <ul>
            <li>Unified Platform: BBPS acts as a one-stop solution for multiple bill payments.</li>
            <li>Accessibility: Users can make payments through various channels like online banking, mobile apps, and authorized service providers.</li>
            <li>Standardized Bill Formats: BBPS uses standardized formats, making the payment process more streamlined.</li>
            <li>Security: Transactions are secure through encryption and authentication mechanisms.</li>
            <li>Multiple Payment Options: Users can choose from various electronic payment methods.</li>
            <li>Instant Confirmation: BBPS provides instant confirmation of payments.</li>
          </ul>
        </Typography>
      </Paper>
    </Container>
  );
};

export default BBPSInformationPage;
