"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _Post = require("./entity/Post");

var _User = require("./entity/User");

var _Comment = require("./entity/Comment");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var user, post, comment;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = new _User.User();
            user.username = '第一个用户';
            user.password = '123456';
            _context.next = 5;
            return connection.manager.save(user);

          case 5:
            post = new _Post.Post();
            post.title = '一篇博客';
            post.content = '这是第这篇博客的内容';
            post.author = user;
            _context.next = 11;
            return connection.manager.save(post);

          case 11:
            comment = new _Comment.Comment();
            comment.content = '这是评论的内容';
            comment.post = post;
            comment.user = user;
            _context.next = 17;
            return connection.manager.save(comment);

          case 17:
            _context.next = 19;
            return connection.close();

          case 19:
            console.log('ok!');

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())["catch"](function (error) {
  return console.log(error);
});