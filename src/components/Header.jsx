import { Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Typography
        component="h1"
        sx={{
          lineHeight: 1.2,
          textTransform: "uppercase",
          fontFamily: '"Montserrat",sans-serif',
          fontSize: "8vw",
        }}
        align="center"
      >
        <Link to="/">Quiz Hub</Link>
      </Typography>
      <Divider sx={{ m: "10px 0", borderColor: "gray" }} />
    </>
  );
};

export default Header;
