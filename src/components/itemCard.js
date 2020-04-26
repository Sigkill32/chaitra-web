import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";

const ItemCard = ({
  img,
  title,
  heading,
  description,
  id,
  onHandleLike,
  isLiked,
}) => {
  return (
    <Card
      style={{
        margin: "30px 0px",
        width: window.innerWidth > 600 ? "45%" : "98%",
      }}
    >
      <CardActionArea>
        <CardMedia
          image={img}
          title={title}
          style={{
            paddingTop: "100%",
          }}
        />
        <Typography gutterBottom variant="h5" component="h2">
          {heading}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardActionArea>
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          onClick={() => onHandleLike(id)}
        >
          <FavoriteIcon
            style={{ color: isLiked ? "red" : "rgba(0, 0, 0, 0.54)" }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
