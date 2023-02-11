import React, { useState, useEffect,query} from 'react';
import axios from 'axios';

const URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

const SwapsList = () => {
  const [swapsData, setSwapsData] = useState(null);

 const query = `
    {
      swaps(orderBy: timestamp, orderDirection: desc, first: 10, where: {
        pool: "0x5777d92f208679db4b9778590fa3cab3ac9e2168"
      }) {
        pool {
          token0 {
            id
            symbol
          }
          token1 {
            id
            symbol
          }
        }
        sender
        recipient
        amount0
        amount1
        timestamp
      }
    }
  `;

  useEffect(() => {
    axios
      .post(URL, { query: query })
      .then(result => {
        setSwapsData(result.data.data);
      });
  }, []);

  return (
    <div>
      {swapsData ? (
        <table>
          <thead>
            <tr>
              <th>Token0 Symbol</th>
              <th>Token1 Symbol</th>
              <th>Sender</th>
              <th>Recipient</th>
              <th>Amount0</th>
              <th>Amount1</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {swapsData.swaps.map(swap => (
              <tr key={swap.sender}>
                <td>{swap.pool.token0.symbol}</td>
                <td>{swap.pool.token1.symbol}</td>
                <td>{swap.sender}</td>
                <td>{swap.recipient}</td>
                <td>{swap.amount0}</td>
                <td>{swap.amount1}</td>
                <td>{swap.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading swaps data...</p>
      )}
    </div>
  );
};

export default SwapsList;
