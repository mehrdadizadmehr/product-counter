import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://special-engine.partoir.ir/part/gql';

const GET_TOTAL_PRODUCTS = `
  query CategoriesList($page: Float!) {
    partListWithPagination(page: $page) {
      totalItems
    }
  }
`;

const ProductCount = () => {
  const [totalProducts, setTotalProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const variables = { page: 1 }; // For the first page
        const response = await axios.post(
          API_URL,
          {
            query: GET_TOTAL_PRODUCTS,
            variables: variables,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*', // هدر برای حل مشکل CORS
            },
          }
        );

        setTotalProducts(response.data.data.partListWithPagination.totalItems);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div>
      <h1>Total Products: {totalProducts}</h1>
    </div>
  );
};

export default ProductCount;
