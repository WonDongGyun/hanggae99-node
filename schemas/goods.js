const mongoose = require("mongoose");

// 몽고 DB의 스키마를 만들어보자!
const { Schema } = mongoose;
const goodsSchema = new Schema({
    goodsId: {
        type: Number,
        required: true,  // 이 값이 필수값인가요?
        unique: true    // 이 값이 유니크한 값인 가요?
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    thumbnailUrl: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model("Goods", goodsSchema);