export default async function handler(req, res) {
    try {
      const apiResponse = await fetch('SUA_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_TOKEN}`
        },
        body: req.body
      });
  
      if (!apiResponse.ok) throw new Error('API Error');
      
      const data = await apiResponse.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }