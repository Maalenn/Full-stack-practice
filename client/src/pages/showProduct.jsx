import { useFetchProductQuery } from "../store/api/productApi";
import {
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  CardActions,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

import MalenIconSvg from "../assets/images/Malen.webp";

const ShowProduct = () => {
  const { data, isLoading, isError } = useFetchProductQuery();

  // Safely access data once it's available
  const products = data?.data || [];
  console.log(products);
  const renderProduct = products.map((item) => (
    <Grid item sx={{ background: "white", width: "350px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={MalenIconSvg}
          alt="green iguana"
          sx={{ width: "100%" }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {item.description}
          </Typography>
          <Typography variant="body2" sx={{ color: "red", fontSize: "16px" }}>
            {item.price}$
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/products/${item.id}`}>
          <Button size="small" color="primary">
            View
          </Button>
        </Link>
      </CardActions>
    </Grid>
  ));

  return (
    <Container>
      <Grid container spacing={2} mt={20} gap={2}>
        {renderProduct}
      </Grid>
    </Container>
  );
};

export default ShowProduct;
