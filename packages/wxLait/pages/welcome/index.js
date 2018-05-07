var Api = require('../../utils/api.js');
var Req = require('../../utils/req.js');
const App = getApp();
Page({
  data: {
    tags: []
  },
  onLoad: function (options) {
    this.checkUserSetting();
    this.getTags();
  },
  goHome() {
    var that = this;
    var ids;//选中标签id
    var tags = that.data.tags;
    var hasChoose = false;
    if (tags.length < 1) {
      wx.showToast({
        title: '未获取到数据',
      })
      return
    }

    var chooseTags = new Array();
    var idArray = new Array();
    for (var i = 0; i < tags.length; i++) {
      if (tags[i].isSelected) {
        hasChoose = true;
        idArray.push(tags[i].id);
        chooseTags.push(tags[i]);
      }
    }
    if (idArray != null && idArray.length > 0) {
      ids = idArray.join(",");
      console.log("ids=", ids);
      that.setData({
        ids: ids
      })
    }
    if (hasChoose) {
      wx.authorize({
        scope: 'scope.userInfo',
        success() {
          that.upLoadChooseTags();
          wx.setStorageSync('tags', chooseTags);
        },
        fail() {
          //不同意授权
          wx.showModal({
            title: '温馨提示',
            content: '您点击了拒绝授权，将无法正常使用,开始授权？',
            success: function (res) {
              // if (res.confirm) {
              //设置用户信息
              wx.openSetting({
                success: function (res) {
                  if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                    that.getWxUserInfo();
                  }
                }
              })

              // }
            }
          })
        }
      })

    } else {
      wx.showToast({
        title: '请至少选择一个标签',
      })
    }
  },
  clinkItem(e) {
    var tags = this.data.tags;
    var index = e.currentTarget.dataset.index;
    var item = tags[index];
    if (!item.isSelected) {
      item.isSelected = true;
    } else {
      item.isSelected = false;
    }
    this.setData({
      tags: tags
    })
  },
  //获取标签
  getTags: function () {
    var that = this;
    Req.req(Api.getWelcomeTags(), 'GET', "", function success(res) {
      console.log("getTags---", res);
      var tags = res.data.models;
      that.setData({
        tags: tags
      })
    }, function fail(res) {

    })
  },
  // 检查用户授权状态
  checkUserSetting: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('获取code成功:  ' + res.code)
          that.setData({
            code: res.code
          })
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 同意授权
              that.getWxUserInfo();
            },
            fail() {
              //不同意授权
              wx.showModal({
                title: '温馨提示',
                content: '您点击了拒绝授权，将无法正常使用,开始授权？',
                success: function (res) {
                  // if (res.confirm) {
                  //设置用户信息
                  wx.openSetting({
                    success: function (res) {

                       console.log("授权回调成功",'ok');
                      if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                        console.log("开始调用", '---------------');
                        that.getWxUserInfo();
                      }
                    }
                  })

                  // }
                }
              })
            }
          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

  },

  settingUser: function () {
    var that = this;
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        // 同意授权
        that.getWxUserInfo();
      },
      fail() {
        //不同意授权
        wx.showModal({
          title: '温馨提示',
          content: '您点击了拒绝授权，将无法正常使用,开始授权？',
          success: function (res) {
            // if (res.confirm) {
            //设置用户信息
            wx.openSetting({
              success: function (res) {
                if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                  that.getWxUserInfo();
                }
              }
            })
            // }
          }
        })
      }
    })
  },
  //检查用户是否选择了标签
  myBookTags: function () {
    var that = this;
    Req.req(Api.myBookTags(), 'GET', "加载中", function success(res) {
      console.log("已选中的标签---", res.data);
      var tags = res.data;
      if (tags != null && tags.length > 0) {
        wx.setStorageSync('tags', tags);
        wx.switchTab({
          url: '/pages/commend/index'
        })
      } else {
        //that.getTags();
      }
    }, function fail(res) {
      //that.getTags();
    })
  },

  //上传选中标签
  upLoadChooseTags: function () {
    var that = this;
    var ids = that.data.ids;
    Req.req(Api.chooseTags({
      ids: ids
    }), 'POST', "加载中", function success(res) {
      console.log("上传选中的标签---", res.data);
      wx.switchTab({
        url: '/pages/commend/index'
      })
    }, function fail(res) {

    })
  },

  //获取微信用户信息
  getWxUserInfo: function () {
    var that = this;
    wx.getUserInfo({
      success: res => {
        //var userInfo = JSON.stringify(res.userInfo);
        console.log("getuserinfo", res.userInfo);
        if (res.userInfo != null) {
          var user = Object.create(null);
          user.avatar = res.userInfo.avatarUrl;
          user.city = res.userInfo.city;
          user.country = res.userInfo.country;
          user.gender = res.userInfo.gender;
          user.nickname = res.userInfo.nickName;
          user.province = res.userInfo.province;
          console.log("jsonUser:", JSON.stringify(user));
          that.laitUserLogin(JSON.stringify(user));
        }

      }
    })
  },
  //登录
  laitUserLogin: function (userInfo) {
    var that = this;
    var code=that.data.code;
    Req.req(Api.wxLogin({
      code: code,
      userInfo: userInfo
    }), 'GET', "加载中", function success(res) {
      console.log("登录成功：", res.data);

      that.myBookTags();
    }, function fail(res) {

    })
  },

  // getUserInfo: function () {
  //   Req.req(Api.wxGetUserInfo(), 'GET', "加载中", function success(res) {
  //     console.log("userinfo:", res.data);
  //   }, function fail(res) {

  //   })
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})