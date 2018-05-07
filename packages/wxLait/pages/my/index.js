//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.openSetting({
      success: function (res) {
        if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
          //这里是授权成功之后 填写你重新获取数据的js
          //参考:
          that.getLogiCallback('', function () {
            callback('')
          })
        }
      }
    })
  },
  onLoad: function () {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  // 检查用户授权状态
  checkUserSetting: function () {
    var that = this;
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        // 用户已经同意不会弹窗询问
        console.log("ok");
      },
      fail() {
        wx.showModal({
          title: '温馨提示',
          content: '您点击了拒绝授权，将无法正常使用,开始授权？',
          success: function (res) {
            if (res.confirm) {

              wx.openSetting({
                success: function (res) {
                  if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                    wx.getUserInfo({
                      success: res => {
                        app.globalData.userInfo = res.userInfo

                        console.log("userinfo", res.userInfo);
                        that.setData({
                          userInfo: res.userInfo,
                          hasUserInfo: true
                        })
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  //我关注的主题
  goMyBook() {
    wx.navigateTo({
      url: '/pages/my/book/index',
    })
  },
  //我的收藏
  goMyCollect() {
    wx.navigateTo({
      url: '/pages/my/mycollect/index',
    })
  },
  //我的通知
  goMyNotice() {
    // wx.navigateTo({
    //   url: '/pages/my/mynotice/index',
    // })

    this.checkUserSetting();
  },
})
