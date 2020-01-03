import request from '../utils/request';

let base_url = '/api';
const API = {
    // 登录
    login: function(data) {
        console.log('login', data);
        return request({
            url: base_url + '/login',
            method: 'post',
            data: data
        });
    },

    // 获取轮播图列表
    getlunboList: function(data) {
        return request({
            url: base_url + '/slideshow',
            method: 'get',
            params: data
        });
    },
    // 添加轮播图
    addlunboList: function(data) {
        return request({
            url: base_url + '/slideshow',
            method: 'post',
            data: data
        });
    },
    // 更新轮播图
    upDatalunboList: function(data) {
        return request({
            url: base_url + '/slideshow',
            method: 'put',
            data: data
        });
    },
    // 删除轮播图
    delImg: function(data) {
        return request({
            url: base_url + '/slideshow',
            method: 'delete',
            data: data
        });
    },
    // 获取联系列表
    getContactList: function(data) {
        return request({
            url: base_url + '/message',
            method: 'get',
            params: data
        });
    },

    // 获取动态列表
    getNewsList: function(data) {
        return request({
            url: base_url + '/dynamic',
            method: 'get',
            params: data
        });
    },
    // 添加动态
    addNews: function(data) {
        return request({
            url: base_url + '/dynamic',
            method: 'post',
            data: data
        });
    },
    // 编辑动态
    editNews: function(data) {
        return request({
            url: base_url + '/dynamic',
            method: 'put',
            data: data
        });
    },
    // 编辑动态
    delNews: function(data) {
        return request({
            url: base_url + '/dynamic',
            method: 'delete',
            data: data
        });
    },
    // 获取产品列表
    getProductList: function(data) {
        return request({
            url: base_url + '/product',
            method: 'get',
            params: data
        });
    },

    // 添加产品列表
    addProduct: function(data) {
        return request({
            url: base_url + '/product',
            method: 'post',
            data: data
        });
    },

    // 编辑产品列表
    editProduct: function(data) {
        return request({
            url: base_url + '/product',
            method: 'put',
            data: data
        });
    },

    // 获取产品列表
    delProduct: function(data) {
        return request({
            url: base_url + '/product',
            method: 'delete',
            data: data
        });
    },

    // 文件上传
    fileUpLoad: function(data) {
        return request({
            url: base_url + '/file',
            method: 'post',
            data: data
        });
    }
};

export default API;
