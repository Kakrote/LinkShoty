const Click = require('../models/Click');

exports.getLinkAnalytics = async (req, res) => {
  const { linkId } = req.params;
  try {
    const clicks = await Click.find({ linkId });

    const devices = {};
    const clicksPerDay = {};

    clicks.forEach(click => {
      const day = new Date(click.createdAt).toISOString().split('T')[0];
      const agent = click.userAgent || 'unknown';

      // Count per device (simplified)
      const device = /mobile/i.test(agent) ? 'Mobile' : 'Desktop';
      devices[device] = (devices[device] || 0) + 1;

      // Count per date
      clicksPerDay[day] = (clicksPerDay[day] || 0) + 1;
    });

    res.json({ devices, clicksPerDay });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
