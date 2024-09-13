import { useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import { useCreateProductMutation } from "../store/api/productApi";

const AddProduct = () => {
  const [createProduct, { isLoading, isError, isSuccess }] =
    useCreateProductMutation();

  // Form state
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Prepare product data
    const newProduct = { title, price, description };

    // Trigger the mutation to post data to the backend
    try {
      await createProduct(newProduct).unwrap();
      // Optionally reset form fields or give success feedback
      setTitle("");
      setPrice("");
      setDescription("");
    } catch (error) {
      console.error("Failed to create product: ", error);
    }
  };

  return (
    <Container
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
      onSubmit={onSubmit}
    >
      <TextField
        label="Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        label="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Add Product"}
      </Button>

      {isError && <p style={{ color: "red" }}>Failed to create product</p>}
      {isSuccess && (
        <p style={{ color: "green" }}>Product created successfully</p>
      )}
    </Container>
  );
};

export default AddProduct;
