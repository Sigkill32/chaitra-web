import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ItemCard = ({ img, title, heading, description }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia image={img} title={title} />
        <Typography gutterBottom variant="h5" component="h2">
          {heading}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardActionArea>
      <CardActions>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
