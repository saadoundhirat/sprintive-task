import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PropTypes from "prop-types";
import ImageList from "@mui/material/ImageList";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function MasonryImageList({
  list,
  setDialogOpen,
  setSelectedImg,
}) {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));
  const matchDownLG = useMediaQuery(theme.breakpoints.down("md"));

  const handleImgClick = async (img) => {
    await setDialogOpen(true);
    await setSelectedImg(img);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: "1rem 0",
      }}
    >
      <ImageList
        variant="masonry"
        cols={matchDownMd ? 1 : matchDownLG ? 2 : 3}
        gap={20}
      >
        {list.map((item) => (
          <ImageListItem
            key={item.id}
            sx={{
              "&:hover": {
                opacity: ".8",
              },
            }}
            onClick={() => handleImgClick(item)}
          >
            <img
              src={`${item?.urls?.regular}?w=${item?.width}&fit=crop&auto=format`}
              srcSet={`${item?.urls?.regular}?w=${item?.width}&fit=crop&auto=format&dpr=2 2x`}
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
                  aria-label={`likes ${item?.title}`}
                >
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
              }
              actionPosition="left"
            />
            <ImageListItemBar
              title={item?.user?.name}
              subtitle={item?.user?.bio}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

MasonryImageList.propTypes = {
  list: PropTypes.array.isRequired,
};

MasonryImageList.defaultProps = {
  list: [],
};
