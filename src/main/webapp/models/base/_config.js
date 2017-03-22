'use strict';

angular.module('base')

// LOCALS & TRANSLATION
.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en',{
        'TITLE':'Hello',
        'FOO':'This is a paragraph',
        'global': {
            'app.name': 'lewei-bus',
            'home': 'home',
            'route': 'route',
            'bot': 'Chat Bot'
        },
        'home': {
            'title': 'Linde Bus Stop',
            'subtitle': 'key in key word of your destination',
            'search': 'search',
            'searchByCurrent': 'search by current'
        },
        'route': {
            'map': 'map',
            'route': 'route',
            'station': 'station',
            'keyword': 'keyword',
            'description': 'description',
            'action': 'action',
            'add' : 'add',

            'clear.map' : 'clear map',
            'show.in.map' : 'show.in.map',
            'edit' : 'edit',
            'show.stations' : 'show stations',
            'delete' : 'delete'
        },
        'station': {
            'map': 'map',
            'route': 'route',
            'keyword': 'keyword',
            'position': 'position',
            'action': 'action',
            'add': 'add',
            'reload' : 'reload Map'
        }
    });

    $translateProvider.translations('zh',{
        'TITLE':'Hello',
        'FOO':'This is a paragraph',
        'global': {
            'app.name': 'Linde班车',
            'home': '首页',
            'route': '班次',
            'bot': '机器人'
        },
        'home': {
            'title': 'Linde 班车',
            'subtitle': '输入您的目的地关键字',
            'search': '搜索',
            'searchByCurrent': '当前位置搜索'
        },
        'route': {
            'map': '地图',
            'route': '班次',
            'station': '站点',
            'keyword': '名称',
            'description': '描述',
            'action': '操作',
            'add' : '添加',

            'clear.map' : '清除地图',
            'show.in.map' : '在地图中显示',
            'edit' : '编辑',
            'show.stations' : '显示站点',
            'delete': '删除'
        },
        'station': {
            'map': '地图',
            'station': '站点',
            'keyword': '站点名称',
            'position': '地理座标',
            'action': '操作',
            'add': '添加',
            'reload' : '刷新地图'
        }
    });

    $translateProvider.preferredLanguage('zh');
}]);
