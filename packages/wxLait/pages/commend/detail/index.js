var item;
var app = getApp();
var Api = require('../../../utils/api.js');
var Req = require('../../../utils/req.js');
Page({
  data: {
    resultList: [],
    commentInput:''
  },
  //图片预览
  previewImage: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;

    if (item.images) {
      wx.previewImage({
        //当前显示下表
        current: item.imageArr[index],
        //数据源
        urls: item.imageArr
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    item = wx.getStorageSync("homeItem");
    var list = new Array();
    list.push(item);
    if (list != null) {
      this.setData({
        resultList: list,
        discussId:item.id
      })
    }
    var that=this;
    if(item.id){
      console.log("文章id",item.id);
      that.getAllComment();
    }
  },
  commentInput: function (e) {
    this.setData({
      commentInput: e.detail.value
    })
  },
  //发送评论
  sendCommend(e) {
    var that=this;
    var id =item.id;
    var content = this.data.commentInput;
    if (!content) {
      wx.showToast({
        title: '请输入评论内容',
      })
      return
    }
    
    Req.req(Api.sendComment(id, {
      comment: JSON.stringify({
        content: content
        })
    }), 'POST', "发送中", function success(res) {
      console.log("result", res.data);

      var dataList = that.data.resultList;
      //评论成功+1；
      dataList[0].comment = dataList[0].comment + 1;
      that.setData({
        resultList: dataList,
        commentInput:'',
      })
      wx.setStorageSync("refreshCommend", true);
      wx.setStorageSync("refreshTopic", true);
      that.getAllComment();
    }, function fail(res) {

    })
    
  },
  //转发
  onShareAppMessage: function (res) {
    var that = this;
    var item;
    var index;
    var id;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      item = res.target.dataset.item;
      index = res.target.dataset.index;
      id = item.id;
    }
    return {
      title: '老铁精选',
      path: 'pages/commend/index',
      success: function (res) {
        // 转发成功
        console.log("share-success");
        Req.req(Api.shareTag(id), 'POST', "", function success(res) {
          var dataList = that.data.resultList;
          if (!dataList[index].isshare) {
            dataList[index].isshare = true;
            dataList[index].share = dataList[index].share + 1;
            console.log("分享成功", res.data);
            that.setData({
              resultList: dataList
            })
          }
          wx.setStorageSync("refreshCommend", true);
          wx.setStorageSync("refreshTopic", true);
        }, function fail(res) {

        })
      },
      fail: function (res) {
        // 转发失败
        console.log("share-fail");
      }
    }
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
      wx.setStorageSync("refreshCommend", true);
      wx.setStorageSync("refreshTopic", true);
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
      wx.setStorageSync("refreshCommend", true);
      wx.setStorageSync("refreshTopic", true);
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
            wx.setStorageSync("refreshCommend", true);
            wx.setStorageSync("refreshTopic", true);
          }, function fail(res) {
           
          })
        }
      }
    })
  },
  //获取评论列表
  getAllComment:function(){
    var that=this;
    var id = this.data.discussId;
    Req.req(Api.getAllComment(id), 'GET', "加载中", function success(res) {
      console.log("获取评论：", res.data);
      var dataList = that.data.resultList;
      dataList[0].comment = res.data.models.length;
      that.setData({
        resultList: dataList,
        discussList: res.data.models
      })

    }, function fail(res) {

    })

  }

})