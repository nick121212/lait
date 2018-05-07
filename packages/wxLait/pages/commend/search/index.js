var app = getApp();
var Api = require('../../../utils/api.js');
var Req = require('../../../utils/req.js');
import { $wuxPrompt } from '../../../components/wux'
Page({
  data: {
    pageNum:0,
    showLoading: false,//是否显示加载更多
    resultList: []
  },
  onLoad: function (options) {
  
  },
  //滚动到底部触发事件  
  scrollMore: function () {
    var that = this;
    console.log("页数", that.data.pageNum + "/" + that.data.totalPage);
    if (that.data.pageNum < that.data.totalPage) {
      that.setData({
        showLoading: true,
        pageNum: that.data.pageNum + 1,
      });
      that.getTagList();
    } else {
      that.setData({
        showLoading: false
      });
    }
  },
  inputContent: function (e) {
    this.setData({
      content: e.detail.value
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
      } else {
        dataList[index].like = dataList[index].like + 1;
      }
      dataList[index].islike = item.islike ? false : true;
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
  getTagList: function () {
    var that = this;
    Req.req(Api.getTagsList({
      q: that.data.tagName,
      from: that.data.pageNum * Api.PAGE_SIZE,
      size: Api.PAGE_SIZE
    }), 'GET', "", function success(res) {
      var datalist;
      if (that.data.pageNum == 0) {
        datalist = res.data.models;
        console.log("pageNum---", that.data.pageNum);
        if (datalist.length > 0) {
          $wuxPrompt.init('msg3', {
            icon: '../../../image/common/data_empty.png',
            text: '未搜索到相关内容',
          }).hide();
        } else {
          $wuxPrompt.init('msg3', {
            icon: '../../../image/common/data_empty.png',
            text: '未搜索到相关内容',
          }).show();
        }

      } else {
        datalist = that.data.resultList.concat(res.data.models);
      }
      that.setData({
        showLoading: false,
        totalPage: res.data.count / Api.PAGE_SIZE,
        resultList: datalist
      })
      wx.stopPullDownRefresh();

    }, function fail(res) {

    })
  },
  //搜索
  goSearch(){
    var that=this;
    var content = this.data.content;
    if (!content) {
      wx.showToast({
        title: '请输入搜索内容',
      })
      return
    }
    that.setData({
      tagName:content,
      resultList: []
    })
    that.getTagList();
  }
})