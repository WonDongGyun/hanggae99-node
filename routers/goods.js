const express = require("express");
const Goods = require("../schemas/Goods");

const router = express.Router();

// 쿼리 스트링에서 우선 category에 맞는 상품을 정렬해서 가져오며, 그것을 json파일로 이쁘게 해서 내보낼거야 
router.get("/goods", async (req, res, next) => {
    try {
        const { category } = req.query;
        const goods = await Goods.find({ category }).sort("-goodsId");
        res.json({ goods: goods });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// : 이라 붙으면 /goods/ 뒤에 어떤 문자열이 붙으면 그것을 goodsId라는 변수로 보겠다는 뜻 
// 그렇게 입력된 goodsId를 몽고DB에서 findOne해서 하나만 가져와서 json으로 이쁘게 해서 내보냄
router.get("/goods/:goodsId", async (req, res) => {
    const { goodsId } = req.params;
    goods = await Goods.findOne({ goodsId: goodsId });
    res.json({ detail: goods });
});


// router.get => GET 요청
// router.post => POST 요청
router.post('/goods', async (req, res) => {
    const { goodsId, name, thumbnailUrl, category, price } = req.body;

    // 해당 goodsId가 존재하는지 아닌지 검색해서 찾아봄. 같은게 있으면 생성안되게 함
    isExist = await Goods.find({ goodsId });
    if (isExist.length == 0) {
        await Goods.create({ goodsId, name, thumbnailUrl, category, price });
    }
    res.send({ result: "success" });
});

module.exports = router;