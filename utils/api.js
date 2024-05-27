export const createApiHandler = () => {
  const handler = async (req, res) => {
    res.status(404).json({ message: 'API route not found' });
  };

  handler.post = async (req, res, callback) => {
    if (typeof callback === 'function') {
      try {
        await callback(req, res);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(500).json({ error: 'Callback function is not defined' });
    }
  };

  return handler;
};