var app = getApp();
var Api = require('../../../utils/api.js');
var Req = require('../../../utils/req.js');
import { $wuxPrompt } from '../../../components/wux'
Page({
  data: {
    resultList: []
  },
  onLoad: function (options) {
    this.getMyCollectList();
  },
  getMyCollectList: function () {
    var that = this;
    Req.req(Api.myCollect(), 'GET', "加载中", function success(res) {
      console.log("list---", res.data);
      if (res.data != null && res.data.models.length > 0) {
        $wuxPrompt.init('msg3', {
          icon: '',
          text: '',
        }).hide();
        console.log("mycollect", res.data.models.length);
        var collectList = res.data.models;
        that.setData({
          resultList: collectList
        })
      } else {
        $wuxPrompt.init('msg3', {
          icon: '../../../image/common/data_empty.png',
          text: '暂无内容',
        }).show();
      }
    }, function fail(res) {

    })
  },
  jumpToDetail(e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.resultList[index];
    console.log("item=", item);
    wx.setStorageSync('homeItem', item);
    wx.navigateTo({
      url: '/pages/commend/detail/index',
    })
  },
  // 关注
  bookUser(e) {
    var that = this;
    var reqType;
    var toastContent;
    var item = e.currentTarget.dataset.item;
    var index = e.currentTarget.dataset.index;
    console.log("index:", index + "");

    if (item.isFollow) {
      reqType = "DELETE";
      toastContent = '取消关注'
    } else {
      reqType = "POST";
      toastContent = '已关注'
    }
    var id = item.user.id;
    Req.req(Api.bookUser(id), reqType, "", function success(res) {
      console.log("result", res.data);
      wx.showToast({
        title: toastContent,
      })
      var dataList = that.data.resultList;
      dataList[index].isFollow = item.isFollow ? false : true;
      that.setData({
        resultList: dataList
      })

    }, function fail(res) {

    })
  },
  //收藏
  collect(e) {
    var that = this;
    var reqType;
    var toastContent = '收藏';
    var item = e.currentTarget.dataset.item;
    var index = e.currentTarget.dataset.index;
    reqType = "POST";
    if (item.islike) {
      reqType = "DELETE";
      toastContent = '取消收藏'
    } else {
      reqType = "POST";
      toastContent = '已收藏'
    }
    var id = item.id;
    Req.req(Api.collectTag(id), reqType, "", function success(res) {
      console.log("result", res.data);
      wx.showToast({
        title: toastContent,
      })
      var dataList = that.data.resultList;
      if (dataList[index].islike) {
        dataList[index].like = dataList[index].like - 1;
        dataList.splice(1,index)//删除一条
      } else {
        dataList[index].like = dataList[index].like + 1;
        dataList[index].islike = item.islike ? false : true;
      }
      wx.setStorageSync("refreshCommend", true);
      wx.setStorageSync("refreshTopic", true);
      that.setData({
        resultList: dataList
      })

    }, function fail(res) {

    })
  },
  //删除
  deleteTag(e) {
    var that = this;
    var reqType;
    var toastContent = '已删除';
    var item = e.currentTarget.dataset.item;
    var index = e.currentTarget.dataset.index;
    var id = item.user.id;
    wx.showModal({
      title: '友情提示',
      content: '确定要删除该话题吗？',
      success: function (res) {
        if (res.confirm) {
          Req.req(Api.deleteUser(id), 'DELETE', "", function success(res) {
            console.log("result", res.data.models);
            wx.showToast({
              title: toastContent,
            })
            // that.setData({
            //   resultList: res.data.models
            // })

          }, function fail(res) {

          })
        }
      }
    })

  },

})