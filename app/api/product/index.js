export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Simulate a data stream
        res.write('data: {"message": "stream started"}\n\n');
        
        // After completing your operations, finalize the stream
        res.end();
      } catch (error) {
        console.error('Error during request processing:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(405).end();
    }
  }
  