'use strict';
var HOST_URI = 'https://www.lait.tv/';

//小程序appid
const APP_ID = "wx994ee0e4609b652a"
const AppSecret = '778bb7c28007f23baad80c91c5ef5b2e'
const PAGE_SIZE = 10;
//分享标题
const SHARE_TITLE = '老铁精选';
// 分享描述
const SHARE_DESC = '专注于搞笑话题和热点视频！';

//微信登录
var OPENID_LOGIN = 'api/common/thirdLogin';

//========================================cache缓存=========================================
//用户帐号
function _getLoginName() {
  return wx.getStorageSync('loginName');
}

//密码
function _getPsw() {
  return wx.getStorageSync('psw');
}

//取token
function _getToken() {
  return wx.getStorageSync('token');
}

//取用户信息
function _getUser() {
  return wx.getStorageSync('user');
}

//取用户id
function _getUserId() {
  return wx.getStorageSync('user').id;
}



//==========================================================================================

//带参数的请求
function reqUrl(url, o) {
  return HOST_URI + url + '?' + _obj2uri(o);
}

//带id
function reqUrlIdParmas(url, id, o) {
  return HOST_URI + url + "/" + id + '?' + _obj2uri(o);
}

//带id
function reqUrlId(url, id) {
  return HOST_URI + url + "/" + id;
}

//不带参数请求
function reqCon(url) {
  return HOST_URI + url;
}

function _obj2uri(obj) {
  return Object.keys(obj).map(function (k) {
    return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
  }).join('&');
}
//===========================================导出===========================================
module.exports = {
  //获取标签
  getWelcomeTags() {
    return reqCon("tags");
  },
  PAGE_SIZE: PAGE_SIZE,
  //标签列表
  getTagsList(o) {
    return reqUrl("posts/post/search", o);
  },
  //用户登录
  wxLogin(o) {
    return reqUrl("auth/weapp", o);
  },
  //返回用户信息
  wxGetUserInfo() {
    return reqCon("auth/weapp/callback");
  },

  //获取文章评论
  getAllComment(id) {
    return reqUrlId('comments', id);
  },
  //发送评论
  sendComment(id, o) {
    return reqUrlIdParmas('comments', id, o);
  },
  //关注
  bookUser(id) {
    return reqUrlId('users/user', id);
  },
  //点赞
  collectTag(id) {
    return reqUrlId('posts/like', id);
  },
  //分享
  shareTag(id) {
    return reqUrlId('posts/share', id);
  },

  //选择的标签
  myBookTags() {
    return reqCon('users/tags');
  },

  //启动页选择标签
  chooseTags(o) {
    return reqUrl('users/tags', o);
  },
  //删除话题
  deleteUser(id) {
    return reqUrlId('users/users', id);
  },
  //我关注的主题列表
  myBookUsers() {
    return reqCon('users/users');
  },
  //我的收藏
  myCollect() {
    return reqCon('posts/user/likes');
  }
};