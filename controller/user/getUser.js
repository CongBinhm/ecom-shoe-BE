const getUser = async (req, res) => {
  try {
    res.json({ data: req.user });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = getUser;
