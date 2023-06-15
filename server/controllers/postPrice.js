const Like = require("../models/Like");
const {Op} = require("sequelize");
const DigitalAsset = require("../models/DigitalAsset");

const postPrice = async (postId) => {
    try {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const likesCount = await Like.count({
            where: {
                postId: postId,
                createdAt: {
                    [Op.gte]: weekAgo
                }
            }
        });

        const digitalAsset = await DigitalAsset.findOne({
            where: {
                postId: postId
            }
        });

        digitalAsset.price = parseFloat(likesCount / 15).toFixed(2);
        await digitalAsset.save();
    } catch (e) {
        console.log(e)
    }
}

module.exports = postPrice;