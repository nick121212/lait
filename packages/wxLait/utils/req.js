const App = getApp()
// 请求头配置
var header = {
  'content-type': 'application/x-www-form-urlencoded',
  appVersionCode: 1000000,
  appVersionName: "1.0.0",
  channel: "wxapp",
  mobileType: 2,
  cookie: wx.getStorageSync("cookie")
}


//自定义错误提示
function showToastErr(content) {
  $wuxToast.show({
    type: 'forbidden',
    timer: 1500,
    color: '#fff',
    text: content,
    success: () => console.log(content)
  })
}

function cbFail() {
  return res;
}

//请求
function req(url, method, message, success, fail) {
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }else{
    wx.showNavigationBarLoading();
  }
  console.log("请求Url：",url);
  header.cookie = wx.getStorageSync("cookie");
  wx.request({
    url: url,
    header: header,
    method: method,
    success: function (res) {
      if (message!= "") {
        wx.hideLoading();
      }else{
        wx.hideNavigationBarLoading();
      }
      if (res.data.code == '200') {
        //缓存cookie
        if (res.header["set-cookie"]){
          console.log("获取登录的cookie：", res.header["set-cookie"]);
          console.log(res.header["set-cookie"].split(";")[0]);
          wx.setStorageSync("cookie", res.header["set-cookie"]);
        }
        success(res.data);
        console.log("result: ",res.data);
      } else {
          console.log("reqfail---------" + res.data.code + "/" + res.data.message);
        fail(res);
      }
    },
    fail: function (res) {
      if (message != "") {
        wx.hideLoading();
      }else{
        wx.hideNavigationBarLoading();
      }
    }
  })

}


//JSON传参
function req_json(url, params, message, success, fail) {
  wx.showNavigationBarLoading()
  // if (message != "") {
  //   wx.showLoading({
  //     title: message,
  //   })
  // }
  wx.request({
    url: url,
    dataType: JSON,
    header: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      wx.hideNavigationBarLoading()
      // if (message != "") {
      //   wx.hideLoading()
      // }
      if (res.data.resCode == '0000') {
        success(res);
      } else if (res.data.resCode == '403') {//无权限，需重新登录
        wx.removeStorageSync('token');
        wx.redirectTo({
          url: '/pages/login/index',
        });
      } else {
        console.log("--------reqfail---------" + res.data.resCode + "/" + res.data.resDesc);
        if (res.data.resCode) {
          showToastErr(res.data.resDesc);
        }
        fail(res);
      }
    },
    fail: function (res) {
      wx.hideNavigationBarLoading();
      if (message != "") {
        wx.hideLoading();
      }
      fail(res);
    }
  })
}

module.exports = {
  req:req,
  req_json: req_json
}