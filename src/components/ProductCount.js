import React, { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';

const ProductCount = () => {
  const [totalItems, setTotalItems] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const endpoint = 'http://special-engine.partoir.ir/part/gql';
    const query = gql`
      query {
        partListWithPagination(page: 1) {
          totalItems
        }
      }
    `;

    try {
      const data = await request(endpoint, query);
      setTotalItems(data.partListWithPagination.totalItems);
    } catch (err) {
      setError(err);
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {error && <p>Error fetching data: {error.message}</p>}
      {totalItems !== null ? (
        <p>Total Products: {totalItems}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductCount;
