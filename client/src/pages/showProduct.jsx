// import { useState, useEffect } from "react";
// import axios from "axios";
// const showProduct = () => {

//     useEffect(async () => {
//         try {
//                 const data = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/products/products`) // Update URL if necessary
//                 console.log(data);
//             } catch (error) {
//                 console.log(error.message);
//             }
//     }, []);

//   return <div>All Product</div>;
// };

// export default showProduct;

import { useState, useEffect } from "react";
import axios from "axios";

const ShowProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/products/products`);
                console.log(response.data); // Log the entire response to inspect its structure
                // Extract the array of products from response.data.data
                setProducts(Array.isArray(response.data.data) ? response.data.data : []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>All Products</h1>
            <ul>
                {products.length > 0 ? (
                    products.map(product => (
                        <li key={product.id}>{product.title}</li> // Extract and display the title
                    ))
                ) : (
                    <div>No products available.</div>
                )}
            </ul>
        </div>
    );
};

export default ShowProduct;



