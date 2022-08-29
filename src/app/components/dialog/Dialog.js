import React, { forwardRef, useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import List from "@mui/material/List";
import _ from "lodash";

const Tawqi3iDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 20,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

Tawqi3iDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ScrollDialog({ open, onClose, list, selectedImg }) {
  const [currentImage, setCurrentImage] = useState(null);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);

  useEffect(() => {
    setCurrentImage(selectedImg);
  }, [selectedImg]);

  useEffect(() => {
    if (currentImage && list) {
      const currImgIndex = _.findIndex(
        list,
        (img) => img.id === currentImage.id
      );
      setPrev((currImgIndex + list.length - 1) % list.length);
      setNext((currImgIndex + 1) % list.length);
    }
  }, [list, currentImage]);

  const handleClose = () => {
    if (onClose) onClose(false);
  };

  const handlePrevious = async () => {
    await setCurrentImage(list[prev]);
  };

  const handleNext = async () => {
    await setCurrentImage(list[next]);
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="image-dialog-head"
      aria-describedby="image-dialog-content"
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
    >
      <Tawqi3iDialogTitle
        id="image-dialog-head"
        onClose={handleClose}
        className="flex items-center py-0 "
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Avatar
          alt="user photo"
          src={currentImage?.user?.profile_image?.small}
          sx={{ mr: "12px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "sm",
            overflow: "hidden",
          }}
        >
          <Typography
            noWrap
            component="span"
            color="primary"
            sx={{
              fontSize: {
                lg: 18,
                sm: 16,
                xs: 12,
              },
              fontWeight: "500",
            }}
          >
            {currentImage?.user?.name}
          </Typography>
          <Typography
            noWrap
            component="span"
            variant="subtitle2"
            color="text.secondary"
            sx={{
              fontSize: {
                lg: 16,
                sm: 12,
                xs: 10,
              },
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            {currentImage?.user?.bio}
          </Typography>
        </Box>
      </Tawqi3iDialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            fontSize: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              maxHeight: "450px",
              maxWidth: "700px",
              mt: 2,
              mb: 5,
            }}
          >
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              src={currentImage?.urls?.full}
              alt={currentImage?.title}
              loading="lazy"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: { md: "row", sm: "column" },
              alignItems: "start",
              justifyContent: "space-between",
              width: "100%",
              fontSize: "1rem",
              pl: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                noWrap
                component="span"
                color="primary"
                sx={{
                  fontWeight: "500",
                }}
              >
                User Total collections
              </Typography>
              <Typography
                noWrap
                component="span"
                color="text.secondary"
                sx={{
                  fontWeight: "500",
                }}
              >
                {currentImage?.user?.total_collections}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                noWrap
                component="span"
                color="primary"
                sx={{
                  fontWeight: "500",
                }}
              >
                User likes
              </Typography>
              <Typography
                noWrap
                component="span"
                color="text.secondary"
                sx={{
                  fontWeight: "500",
                }}
              >
                {currentImage?.user?.total_likes}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                noWrap
                component="span"
                color="primary"
                sx={{
                  fontWeight: "500",
                }}
              >
                User total photos
              </Typography>
              <Typography
                noWrap
                component="span"
                color="text.secondary"
                sx={{
                  fontWeight: "500",
                }}
              >
                {currentImage?.user?.total_photos}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              width: "100%",
              fontSize: "1rem",
            }}
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`Published 14 hours ago`}
                  secondary={null}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CameraAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={`FUJIFILM, X-T4`} secondary={null} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalPoliceOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`Free to use under the Unsplash License`}
                  secondary={null}
                />
              </ListItem>
            </List>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            mx: 1,
          }}
        >
          <Tooltip title="Previous">
            <IconButton
              aria-label="previous"
              onClick={handlePrevious}
              size="medium"
              disabled={prev === 0}
              sx={{
                "&.Mui-disabled": {
                  cursor: "not-allowed",
                  pointerEvents: "all !important",
                },
              }}
            >
              <ArrowCircleLeftOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Next">
            <IconButton
              aria-label="next"
              onClick={handleNext}
              size="medium"
              disabled={next === list.length - 1}
              sx={{
                "&.Mui-disabled": {
                  cursor: "not-allowed",
                  pointerEvents: "all !important",
                },
              }}
            >
              <ArrowCircleRightOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
