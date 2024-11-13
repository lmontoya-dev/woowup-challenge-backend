import { Box, Container, AppBar, Toolbar, Typography } from "@mui/material";
import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Email Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>{children}</Container>
    </Box>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
