"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _typeorm = require("typeorm");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _temp;

var Post = (_dec = (0, _typeorm.Entity)('posts'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('increment'), _dec3 = (0, _typeorm.Column)('varchar'), _dec4 = (0, _typeorm.Column)('text'), _dec5 = (0, _typeorm.Column)('text'), _dec6 = (0, _typeorm.Column)('int'), _dec7 = (0, _typeorm.Column)('int'), _dec8 = (0, _typeorm.Column)('int'), _dec9 = (0, _typeorm.CreateDateColumn)({
  type: 'timestamp'
}), _dec10 = (0, _typeorm.UpdateDateColumn)({
  type: 'timestamp'
}), _dec11 = (0, _typeorm.ManyToOne)('User', 'posts'), _dec12 = (0, _typeorm.ManyToOne)('Category', 'posts'), _dec13 = (0, _typeorm.OneToMany)('Comment', 'post'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function Post() {
    (0, _classCallCheck2["default"])(this, Post);
    (0, _initializerDefineProperty2["default"])(this, "id", _descriptor, this);
    (0, _initializerDefineProperty2["default"])(this, "title", _descriptor2, this);
    (0, _initializerDefineProperty2["default"])(this, "content", _descriptor3, this);
    (0, _initializerDefineProperty2["default"])(this, "images", _descriptor4, this);
    (0, _initializerDefineProperty2["default"])(this, "views", _descriptor5, this);
    (0, _initializerDefineProperty2["default"])(this, "categoryId", _descriptor6, this);
    (0, _initializerDefineProperty2["default"])(this, "authorId", _descriptor7, this);
    (0, _initializerDefineProperty2["default"])(this, "createdAt", _descriptor8, this);
    (0, _initializerDefineProperty2["default"])(this, "updatedAt", _descriptor9, this);
    (0, _initializerDefineProperty2["default"])(this, "author", _descriptor10, this);
    (0, _initializerDefineProperty2["default"])(this, "category", _descriptor11, this);
    (0, _initializerDefineProperty2["default"])(this, "comments", _descriptor12, this);
    (0, _defineProperty2["default"])(this, "errors", {
      title: [],
      content: [],
      category: []
    });
  }

  (0, _createClass2["default"])(Post, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.title) {
                  this.errors.title.push('标题不能为空');
                }

                if (!this.content) {
                  this.errors.content.push('内容不能为空');
                }

                if (!this.categoryId) {
                  this.errors.category.push('分类不能为空');
                }

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validate() {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "hasError",
    value: function hasError() {
      return !!Object.values(this.errors).find(function (v) {
        return v.length > 0;
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        id: this.id,
        title: this.title,
        content: this.content,
        images: this.images,
        views: this.views,
        category: this.category,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        author: this.author
      };
    }
  }]);
  return Post;
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "title", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "content", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "images", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "views", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "categoryId", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "authorId", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "createdAt", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "updatedAt", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "author", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "category", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "comments", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Post = Post;