const Link = require('../models/Links');
const Click = require('../models/Click');

exports.handleRedirect = async (req, res) => {
  const { code } = req.params;

  try {
    const link = await Link.findOne({ shortCode: code });
    if (!link) return res.status(404).send('Link not found');

    // Check if expired
    if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
      return res.status(410).send('Link expired');
    }

    // Increment click count
    link.clicks += 1;
    await link.save();

    // Async click log (IP + agent)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    Click.create({
      linkId: link._id,
      ip,
      userAgent,
    });

    return res.redirect(link.longUrl);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
