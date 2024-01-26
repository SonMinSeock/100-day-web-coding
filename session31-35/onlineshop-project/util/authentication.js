function createUserSession(req, user, action) {
  req.session.uid = user._id.toString(); // user._id는 몽고 DB에서 받아온 유저 문서의 식별자 _id이다. ObjectId 타입에서 String 타입 변환.
  req.session.save(action);
}

function destoryUserAuthSession(req) {
  req.session.uid = null;
  req.session.isAuth = false;
}

module.exports = {
  createUserSession,
  destoryUserAuthSession,
};
