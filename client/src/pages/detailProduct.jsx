import { useParams } from "react-router-dom";
import { useFetchProductQuery } from "../store/api/productApi";
import { Container, Typography, CardContent, CardMedia, Box } from "@mui/material";

import MalenIconSvg from "../assets/images/Malen.webp";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { data, isLoading, isError } = useFetchProductQuery(id); // Fetch the product using its ID

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching product details</p>;

  const product = data?.data; // Access the product details

  return (
    <Container>
      <Box mt={10}>
        <CardMedia
          component="img"
          height="300"
          image={MalenIconSvg}
          alt={product?.title}
          sx={{ width: "100%" }}
        />
        <CardContent>
          <Typography variant="h4">{product?.title}</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mt: 2 }}>
            {product?.description}
          </Typography>
          <Typography variant="h6" sx={{ color: "red", mt: 2 }}>
            {product?.price}$
          </Typography>
        </CardContent>
      </Box>
    </Container>
  );
};

export default ProductDetails;
