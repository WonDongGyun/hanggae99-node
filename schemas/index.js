// 몽고 DB 연결하자! 노드에서는 몽구스를 사용해야 몽고DB와 연결할 수 있습니다.
const mongoose = require("mongoose");

// 몽고 DB에 voyage라는 데이터베이스 스키마를 만듭니다.
const connect = () => {
    mongoose
        .connect("mongodb://localhost:27017/voyage", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            ignoreUndefined: true
        })
        .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
});

module.exports = connect;