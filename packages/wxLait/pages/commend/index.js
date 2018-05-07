var app = getApp();
var Api = require('../../utils/api.js');
var Req = require('../../utils/req.js');
import { $wuxPrompt } from '../../components/wux'
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    tags: [],
    pageNum:0,
    showLoading:false,//是否显示加载更多
    resultList: []
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  onPullDownRefresh: function () {
    this.getCommendList();
  },

  onShow:function(){
    if (wx.getStorageSync('refreshCommend')){
      console.log("收藏刷新");
      this.getCommendList();
    }
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300,
        pageNum: 0,
        resultList: []
      })
    } else {
      this.setData({
        scrollLeft: 0,
        pageNum: 0,
        resultList: []
      })
    }
    var tags = wx.getStorageSync("tags");
    var cur = this.data.currentTab;
    console.log("滑动标签", cur + "/" + tags[cur].name);
    if (tags[cur].name) {
      this.setData({
        currentTag: tags[cur].name,
        currentId: tags[cur].id
      })

      $wuxPrompt.init('msg3', {
        icon: '../../image/common/loading.gif',
        text: '正在加载',
      }).show();
      this.getCommendList();
    }
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
      id =item.id;
    }
    return {
      title: '老铁精选',
      path: 'pages/commend/index',
      success: function (res) {
        // 转发成功
        console.log("share-success");
        Req.req(Api.shareTag(id), 'POST', "", function success(res) {
          var dataList = that.data.resultList;
          if(!dataList[index].isshare){
            dataList[index].isshare=true;
            dataList[index].share = dataList[index].share+1;
            console.log("分享成功", res.data);
            that.setData({
              resultList: dataList
            })
          }
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
      if (dataList[index].islike){
        dataList[index].like = dataList[index].like-1;
      }else{
        dataList[index].like = dataList[index].like+1;
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
  //搜索
  search() {
    wx.navigateTo({
      url: '/pages/commend/search/index',
    })
  },
  getCommendList: function () {
    var that = this;
    Req.req(Api.getTagsList({
      q: that.data.currentTag,
      tag: that.data.currentId,
      from: that.data.pageNum * Api.PAGE_SIZE,
      size: Api.PAGE_SIZE
    }), 'GET', "", function success(res) {
      wx.setStorageSync("refreshCommend", false);
      var datalist;
      if(that.data.pageNum==0){
        datalist = res.data.models;
        console.log("pageNum---",that.data.pageNum);
        if(datalist.length>0){
          $wuxPrompt.init('msg3', {
            icon: '',
            text: '',
          }).hide();
        }else{
          $wuxPrompt.init('msg3', {
            icon: '../../image/common/data_empty.png',
            text: '暂无内容',
          }).show();
        }

      }else{
        datalist = that.data.resultList.concat(res.data.models);
      }
      that.setData({
        showLoading: false,
        totalPage: res.data.count/Api.PAGE_SIZE,
        resultList: datalist
      })
      wx.stopPullDownRefresh();
    }, function fail(res) {

    })
  },

  //滚动到底部触发事件  
  scrollMore: function (){
    var that = this;
    console.log("页数", that.data.pageNum + "/" + that.data.totalPage);
    if (that.data.pageNum < that.data.totalPage) {
      that.setData({
        showLoading: true,
        pageNum: that.data.pageNum + 1,   
      });
      that.getCommendList();
    }else{
      that.setData({
        showLoading: false
      });
    }
  },
  onLoad: function () {
    var that = this;
    var tags = wx.getStorageSync("tags");
   
    if (tags != null && tags.length > 0) {
      that.setData({
        currentTag: tags[0].name,
        currentId: tags[0].id
      })
      that.getCommendList();
    }
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;//- 180
        that.setData({
          tags: tags,
          winHeight: calc
        });
      }
    });
  },
  footerTap: app.footerTap
})