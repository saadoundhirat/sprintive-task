import { amber, blue, green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Typography from "@mui/material/Typography";
import { memo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const StyledSnackbar = styled(Snackbar)(({ theme, variant }) => ({
  "& .FuseMessage-content": {
    ...(variant === "success" && {
      backgroundColor: green[600],
      color: "#FFFFFF",
    }),

    ...(variant === "error" && {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.getContrastText(theme.palette.error.dark),
    }),

    ...(variant === "info" && {
      backgroundColor: blue[600],
      color: "#FFFFFF",
    }),

    ...(variant === "warning" && {
      backgroundColor: amber[600],
      color: "#FFFFFF",
    }),
  },
}));

function SnackbarMessage({ open, message = "Hi", variant = "info" }) {
  const [state, setState] = useState(open);

  const onClose = () => {
    setState(false);
  };

  return (
    <StyledSnackbar
      open={state}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      autoHideDuration={5000}
      message={message}
      variant={variant}
      onClose={onClose}
      ContentProps={{
        variant: "body2",
        headlineMapping: {
          body1: "div",
          body2: "div",
        },
      }}
    >
      <SnackbarContent
        className="FuseMessage-content"
        message={
          <div className="flex items-center">
            {/* {variant? in} */}
            <Typography className="mx-8">{message}</Typography>
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
            size="large"
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </StyledSnackbar>
  );
}

export default memo(SnackbarMessage);
