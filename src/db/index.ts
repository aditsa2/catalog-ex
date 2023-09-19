const { Client } = require('pg');
const client = new Client({
  user: 'user',
  password: 'mysecretpassword',
  host: 'localhost',
  port: 5432,
  database: 'products-catalog',
});
client.connect();

const queryHandler = async (query: string): Promise<any> => {
  try {
    const results = await new Promise<any[]>((resolve, reject) => {
      client.query(query, (error: Error, results: Object[]) => {
        if (error) reject(error);
        resolve(results);
      });
    });
    return results;
  } catch (error) {
    throw error;
  }
};

export default queryHandler;
