var app = getApp();
var Api = require('../../../utils/api.js');
var Req = require('../../../utils/req.js');
import { $wuxPrompt } from '../../../components/wux'
Page({
  data: {
    bookList:[]
  },
  onLoad: function (options) {
    this.getBookList();
  },
  getBookList: function () {
    var that = this;
    Req.req(Api.myBookUsers(), 'GET', "加载中", function success(res) {
      console.log("list---", res.data);
      if (res.data != null && res.data.models.length>0){
        $wuxPrompt.init('msg3', {
          icon: '',
          text: '',
        }).hide();

        var bookList = res.data.models;
        that.setData({
          bookList: bookList
        })
      }else{
        $wuxPrompt.init('msg3', {
          icon: '../../../image/common/data_empty.png',
          text: '暂无内容',
        }).show();
      }
    }, function fail(res) {

    })
  },

})