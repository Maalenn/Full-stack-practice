import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./pages/addProduct";
import ShowProduct from "./pages/showProduct";
import UpdateProduct from "./pages/updateProduct";
import DetailProduct from "./pages/detailProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products/addProduct" element={<AddProduct />} />
        <Route path="/products" element={<ShowProduct />} />
        <Route path="/products/edit/:id" element={<UpdateProduct />} />
        <Route path="/products/products/:id" element={<DetailProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
