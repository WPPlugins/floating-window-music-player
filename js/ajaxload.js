//定义所需变量
var ajaxcontent = ajaxload_data.content; // 为Ajax加载部分的id
var ajaxignore = ajaxload_data.string.split(', ');// 不需要Ajax加载的链接格式
var ajaxloading_code = '<style>.ajax{font-size:80px;top:70%;left:50%;position:fixed;color:#81d742;}</style><i class="fa fa-spinner fa-pulse ajax"></i>'; // 加载动画
var ajaxloading_error_code = 'error'; // 加载失败动画
var ajaxstarted = ajaxisLoad = ajaxtrack_analytics = ajaxreloadDocumentReady = false; 
var ajaxsearchPath = null; // 搜索路径
var ajaxscroll_top = true; // 定位返回锚点
// 初始化载入
jQuery(document).ready(function() { ajaxloadPageInit("")});
// 函数：搜索提交
function submitSearch(param){ if (!ajaxisLoad){ ajaxloadPage(ajaxsearchPath, 0, param)}}
// 函数：过滤链接
function ajaxcheck_ignore(url) {
    for (var i in ajaxignore) { if (url.indexOf(ajaxignore[i]) >= 0) return false }
    return true;
}
// 函数：需要重新加载的js，比如灯箱、代码高亮等
function ajaxreload_code() {
  jQuery(document).ready(function(jQuery){$('.collapseButton').click(function(){$(this).parent().parent().find('.xContent').slideToggle('slow')})});
  var _hmt = _hmt || []; (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?5ca9e4a4e2e6534eefae431f32bf09fb";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s)
  })();
}
// 函数：导航菜单高亮切换
function ajaxclick_code(thiss) {
    $('ul.nav-menu li').each(function() { $(this).removeClass('current-menu-item')});// 设置成你的菜单列表li
    $(thiss).parents('li').addClass('current-menu-item');
}
// 核心函数：ajax加载
function ajaxloadPage(url, push, getData){
    if (!ajaxisLoad){
        if (ajaxscroll_top == true) { $('html,body').animate({scrollTop: 0}, 500)}// 返回顶部位置和速度
        ajaxisLoad = true; // 开启
        ajaxstarted = true; // 开始
        nohttp = url.replace("http://","").replace("https://",""); // 去除https或http
        firstsla = nohttp.indexOf("/"); // 是否存在 / 符号
        pathpos = url.indexOf(nohttp); // 是否存在完整链接
        path = url.substring(pathpos + firstsla); // 切割提取字符串
        if (push != 1) {
            if (typeof window.history.pushState == "function") { // 浏览器地址变更
                var stateObj = { foo: 1000 + Math.random()*1001 };
                history.pushState(stateObj, "ajax page loaded...", path);
            } else {}
        }
        if (!$('#' + ajaxcontent)) {}
        $('#' + ajaxcontent).append(ajaxloading_code); // 加载动画
        $('#' + ajaxcontent).fadeTo("slow", 0.4,function() { // 淡出效果
            $('#' + ajaxcontent).fadeIn("slow", function() { // 淡入效果
                $.ajax({
                    type: "GET", url: url, data: getData, cache: false, dataType: "html",
                    success: function(data) { // 加载成功后
                        var msger = data,titl1 = $(data).find("h1").eq(ajaxload_data.title-1).text(),titl2 = $(data).find("h2:first").text(),site_title = $('.site-title a').text();
                        window.document.title = titl1 == "" ? titl2 + " \u2502 " + site_title : titl1 + " \u2502 " + site_title;
                        ajaxisLoad = false; // 关闭ajax
                        datax = data.split('<title>');
                        titlesx = data.split('</title>');                        
                        if (datax.length == 2 || titlesx.length == 2) {  // 浏览器标题变更
                            data = data.split('<title>')[1];
                            titles = data.split('</title>')[0];
                            $(document).attr('title', ($("<div/>").html(titles).text()));
                        } else {}
                        if (ajaxtrack_analytics == true) {
                            if(typeof _gaq != "undefined") {
                                getData = (typeof getData == "undefined") ? "" : "?" + getData;
                                _gaq.push(['_trackPageview', path + getData]);
                            }
                        }
                        data = data.split('id="' + ajaxcontent + '"')[1];
                        data = data.substring(data.indexOf('>') + 1);
                        var depth = 1;
                        var output = '';
                        while(depth > 0) {
                            temp = data.split('</div>')[0];
                            i = 0;
                            pos = temp.indexOf("<div");
                            while (pos != -1) { i++; pos = temp.indexOf("<div", pos + 1) }
                            depth=depth+i-1;
                            output=output+data.split('</div>')[0] + '</div>'; //分割字符串
                            data = data.substring(data.indexOf('</div>') + 6);
                        }
                        document.getElementById(ajaxcontent).innerHTML = output;
                        $('#' + ajaxcontent).css("position", "absolute");
                        $('#' + ajaxcontent).css("left", "20000px");
                        $('#' + ajaxcontent).show();
                        ajaxloadPageInit("#" + ajaxcontent + " ");
                        if (ajaxreloadDocumentReady == true)  $(document).trigger("ready");
                        try { ajaxreload_code() } catch(err) {}
                        $('#' + ajaxcontent).hide();
                        $('#' + ajaxcontent).css("position", "");
                        $('#' + ajaxcontent).css("left", "");
                        $('#' + ajaxcontent).fadeTo("slow", 1, function() {});
                    },
                    error: function(jqXHR, textStatus, errorThrown) { // 加载错误时提示
                        ajaxisLoad = false;
                        document.title = "Error loading requested page!";
                        document.getElementById(ajaxcontent).innerHTML = ajaxloading_error_code;
                    }
                });
            });
        });
    }
}
// 后退时页面效果，用popstate
window.onpopstate = function(event) { if (ajaxstarted === true && ajaxcheck_ignore(document.location.toString()) == true) ajaxloadPage(document.location.toString(),1)};
//函数: ajax加载
function ajaxloadPageInit(scope){
    $(scope + "a").click(function(event){ // 点击事件绑定a标签
        if (this.href.indexOf(ajaxload_data.ajaxhome) >= 0 && ajaxcheck_ignore(this.href) == true){ //主页地址
            event.preventDefault();
            this.blur();
            var caption = this.title || this.name || "";
            var group = this.rel || false;
            try { ajaxclick_code(this) } catch(err) {}
            ajaxloadPage(this.href); // 核心函数
        }
    });
    $('.' + ajaxload_data.searchform).each(function(index) { // 搜索ajax
        if ($(this).attr("action")) {
            ajaxsearchPath = $(this).attr("action");
            $(this).submit(function() { submitSearch($(this).serialize()); return false });
        }
    });
    if ($('.' + ajaxload_data.searchform).attr("action")) {} else {}
}