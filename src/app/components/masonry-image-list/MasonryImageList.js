import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import ImageList from "@mui/material/ImageList";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function MasonryImageList({ list, loading }) {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: "1rem 0",
      }}
    >
      <ImageList variant="masonry" cols={matchDownMd ? 1 : 3} gap={20}>
        {list.map((item) =>
          item.url ? (
            <ImageListItem
              key={item.id}
              sx={{
                "&:hover": {
                  opacity: ".8",
                },
              }}
            >
              <img
                src={`${item?.url}?w=${item?.width}&fit=crop&auto=format`}
                srcSet={`${item?.url}?w=${item?.width}&fit=crop&auto=format&dpr=2 2x`}
                alt={item?.title}
                loading="lazy"
              />

              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                title={item?.likes}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: "white" }}
                    aria-label={`likes ${item.title}`}
                  >
                    <FavoriteBorderOutlinedIcon />
                  </IconButton>
                }
                actionPosition="left"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.user.displayName}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ) : null
        )}
      </ImageList>
      {loading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
    </Box>
  );
}

MasonryImageList.propTypes = {
  list: PropTypes.array.isRequired,
};

MasonryImageList.defaultProps = {
  list: [],
};
