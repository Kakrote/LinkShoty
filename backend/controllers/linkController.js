const Link = require('../models/Links');
const generateShortCode = require('../utils/generateShortCode');

exports.createLink = async (req, res) => {
  const { longUrl, customAlias, expiresAt } = req.body;
  console.log(longUrl)
  const userId = req.userId; // from JWT middleware

  try {
    let shortCode = customAlias || generateShortCode();

    // Check if custom alias is already used
    const existing = await Link.findOne({ shortCode });
    if (existing) {
      return res.status(400).json({ message: 'Alias already in use' });
    }

    const newLink = await Link.create({
      userId,
      longUrl,
      shortCode,
      expiresAt,
    });

    res.status(201).json({
      shortUrl: `https://linkshoty-production.up.railway.app/${newLink.shortCode}`,
      link: newLink,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllLinks=async (req,res)=>{
  const userId=req.userId
  try{
    const links=await Link.find({userId}).sort({createdAt:-1})
    if(!links){
      res.status(400).json({msg:"no link found"})
    }
    res.status(202).json(links)
  }
  catch(err){
    console.log(err)
    res.status(500).json({msg:"server error"})
  }
}

exports.deleteLink = async (req, res) => {
  const userId = req.userId; // from auth middleware
  const linkId = req.params.id;

  try {
    const link = await Link.findOne({ _id: linkId, userId });

    if (!link) {
      return res.status(404).json({ message: 'Link not found or unauthorized' });
    }

    await Link.findByIdAndDelete(linkId);
    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
