/**
 * Plugin Name: Floating Window Music-Player
 * Plugin URI:  http://eric.cn.com/?p=1187
 * Author:      Eric
 * Author URI:  http://eric.cn.com/
 */
jQuery.cookie = function(a, c, b) {
  if ("undefined" != typeof c) {
    b = b || {}; null === c && (c = "", b.expires = -0x1); var d = "";
    b.expires && ("number" == typeof b.expires || b.expires.toUTCString) && ("number" == typeof b.expires ? (d = new Date, d.setTime(d.getTime() + 864E5 * b.expires)) : d = b.expires, d = "; expires=" + d.toUTCString());
    var e = b.path ? "; path=" + b.path: "", f = b.domain ? "; domain=" + b.domain: "";
    b = b.secure ? "; secure": "";
    window.document.cookie = [a, "=", encodeURIComponent(c), d, e, f, b].join("")
  } else {
    c = null;
    if (window.document.cookie && "" != window.document.cookie) for (b = window.document.cookie.split(";"), d = 0x0; d < b.length; d++) if (e = jQuery.trim(b[d]), e.substring(0x0, a.length + 0x1) == a + "=") {c = decodeURIComponent(e.substring(a.length + 0x1)); break}
    return c
  }
};
  var FwmList, audio = new Audio;
  $player = $("#FwmPlayer");
  $lrc = $("#FwmLrc");
  $play = $(".switch-player", $player);
  $bar = $(".musicbar", $play);
  $cover = $(".cover", $player);
  $songList = $(".song-list .list", $player);
  $albumList = $(".album-list", $player);
  $songFrom = $(".player .artist", $player);
  $songFrom2 = $(".player .moshi", $player);
  $songFrom3 = $(".player .geci", $player);
  $progress = $(".progress", $player);
  $qq = $(".switch-tencent", $player);
  $bd = $(".switch-baidu", $player);
  $wy = $(".switch-netease", $player);
  $xm = $(".switch-xiami", $player);
  songFrom55 = type = id = "";
  roundcolor = "#6c6971";
  lightcolor = "#81c300";
  cur = "current";
  des = "desaturate";
//是否已经加载播放器
  var PlayerIsLoaded = (typeof(localStorage.getItem('player_isload')) !="undefined" ? ((localStorage.getItem('player_isload')=='True' && parseInt(localStorage.getItem('player_runningtime'))+10 > Math.round(new Date().getTime()/1000)) ? true : false) : false);
//是否要加载播放器
  var PlayerIsLoad = (typeof(PlayerIsLoad) !="undefined" ? PlayerIsLoad : !PlayerIsLoaded);
  if (top.location != self.location || !PlayerIsLoad) $player.hide();
  else {var formatSecond = function(a) {return ("00" + Math.floor(a / 60)).substr( - 2) + ":" + ("00" + Math.floor(a % 60)).substr( - 2)}, FwmCicle = function() {$(".time", $player).text(" " + formatSecond(audio.currentTime) + "/" + formatSecond(audio.duration)); audio.currentTime < audio.duration / 2 ? $(".status", $player).css("background-image", "linear-gradient(90deg, " + roundcolor + " 50%, transparent 50%, transparent), linear-gradient(" + (90 + 180 / (audio.duration / 2) * audio.currentTime) + "deg, " + lightcolor + " 50%, " + roundcolor + " 50%, " + roundcolor + ")") : $(".status", $player).css("background-image", "linear-gradient(" + (90 + 180 / (audio.duration / 2) * audio.currentTime) + "deg, " + lightcolor + " 50%, transparent 50%, transparent), linear-gradient(270deg, " + lightcolor + " 50%, " + roundcolor + " 50%, " + roundcolor + ")")};
  PlayerIsLoaded=true;
  localStorage.setItem('player_isload','True');
  setInterval(function (){localStorage.setItem('player_runningtime',Math.round(new Date().getTime()/1000))},5000);
  window.onbeforeunload = function() {localStorage.setItem('player_isload','False');RootCookies.SetCookie("player_show", "no", -1)};
  window.onunload = function() {RootCookies.SetCookie("player_show", "no", -1)};
//自动隐藏
  jQuery(document).ready(function() {setTimeout(function() {$("#FwmPlayer").removeClass("show");$(".switch-player", $("#FwmPlayer")).attr("title", pollsL10n.show)},st)});
//是否开启歌词，移动端自动关闭
  if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {geci = "NO"; hasgeci = !1; auto = "NO"};
  "YES" != geci ? (songFrom33 = pollsL10n.close, hasgeci = !1) : (songFrom33 = pollsL10n.open, hasgeci = !0);
//是否随机歌曲
  random = "YES" != random ? 0 : 1;
  volume = $.cookie("player_volume") ? $.cookie("player_volume") : ".9";
  songTotal = songId = albumId = loop = mute = 0;
  ycgeci = showLrc = !0;
  musicfirsttip = !1;
  var cicleTime = null;
  $cover.html('<img src="wp-content/plugins/floating-window-music-player/inc/default.jpg">');
  $(".song", $player).html('<a href="http://eric.cn.com/" target="_blank">'+pollsL10n.Load+'</a>');
  $songFrom.html('<a href="http://eric.cn.com/" target="_blank">'+pollsL10n.wait+'</a>');
  $(".player .artist1", $player).html('<a href="http://eric.cn.com/" target="_blank">Eric音像馆</a>');
  $songFrom3.html('<i class="fa fa-times-circle" aria-hidden="true"></i> '+pollsL10n.lyrics+pollsL10n.Failed);
  var typeid = new Array("netease","tencent","xiami","baidu"),data = {}, FwmMedia = {
    play: function() {$player.addClass("playing");cicleTime = setInterval(FwmCicle, 800);hasLrc && (lrcTime = setInterval(FwmLrc.lrc.play, 500), $lrc.addClass("show"))},
    pause: function() {clearInterval(cicleTime);$player.removeClass("playing");hasLrc && FwmLrc.lrc.hide()},
    error: function() {clearInterval(cicleTime);$player.removeClass("playing");FwmTips.show(FwmLists[albumId].song_list[songId].song_title + pollsL10n.Failed);setTimeout(function() {FwmMedia.prev()}, 1E3);$(".loading,.loading2").hide()},
    seeking: function() {clearInterval(cicleTime);FwmTips.show(pollsL10n.Seek)},
    volumechange: function() {mute ? (FwmTips.show(pollsL10n.mute)) : (a = window.parseInt(100 * audio.volume), $(".volume-on", $player).width(a + "%"), FwmTips.show(pollsL10n.volume+"：" + a + "%"))},
    getInfos: function(a, b) {
      $cover.removeClass("coverplay");
      $bar.removeClass("animate");
      $(".player .down", $player).hide();
      songId = a;
      albumId = b;
      id = FwmLists[albumId].song_list[songId].song_id;
      audio.src = FwmLists[albumId].song_list[songId].mp3url;
      $(".player .down", $player).show();
      $(".player .down", $player).html("<i class='fa fa-download'  aria-hidden='true' title='" + pollsL10n.download + songFrom55 + "：" + FwmLists[albumId].song_list[songId].song_title + " - " + FwmLists[albumId].song_list[songId].singer + "'></i>");
      $bar.attr("title", pollsL10n.play + "：" + FwmLists[albumId].song_list[songId].song_title + " - " + FwmLists[albumId].song_list[songId].singer)
//下载键
      $(".down").click(function() {window.open(audio.src, "newwindow")});
//主页键
      $(".switch-info", $player).click(function() {window.open("http://eric.cn.com/?p=1187", "newwindow")});
      $(".song", $player).html("<span title='" +pollsL10n.song+ FwmLists[albumId].song_list[songId].song_title + "'> " + LimitStr(FwmLists[albumId].song_list[songId].song_title) + "</span>");
      $songFrom.html("<span title='" +pollsL10n.singer+ FwmLists[albumId].song_list[songId].singer + "'>" + LimitStr(FwmLists[albumId].song_list[songId].singer) + "</span>");
      $(".player .artist1", $player).html("<span title='" +pollsL10n.album+ FwmLists[albumId].song_list[songId].album + "'>" + LimitStr(FwmLists[albumId].song_list[songId].album) + "</span>");
      allmusic();
      var c = new Image;
      c.src = FwmLists[albumId].song_list[songId].pic;
      $cover.addClass("changing");
      loadblur(c.src);
      c.onload = function() {
        setTimeout(function() {$(".loading,.loading2").hide()}, 800);
        setTimeout(function() {$cover.removeClass("changing")}, 100);
        $.ajax({url: ajax_url,type: "GET",dataType: "script",data: {action: 'Fwm_api',do: 'color',url: c.src},success: function() {$(".loading,.loading2").hide();playercolor()},error: function() {$(".loading,.loading2").hide()}})
      };
      c.error = function() {setTimeout(function() {$(".loading,.loading2").hide()}, 800);c.src = "wp-content/plugins/floating-window-music-player/inc/default.jpg";setTimeout(function() {FwmTips.show(FwmLists[albumId].song_list[songId].song_title + pollsL10n.Failed)}, 4E3)};
      $cover.html('<img src="' + c.src + '" class="pic">');
//封面图键
      $(".pic").click(function() {window.open(c.src, "newwindow")});
      audio.volume = volume;
//是否自动播放
      - 1 != window.document.cookie.indexOf("player=") ? (FwmMedia.pause(), $lrc.hide(), setTimeout(function() {FwmTips.show(pollsL10n.Auto+pollsL10n.Stop)}, 3E3)) : "NO" != auto ? (FwmTips.show(pollsL10n.from + songFrom55 + "：" + FwmLists[albumId].song_list[songId].song_title + " - " + FwmLists[albumId].song_list[songId].singer), audio.play(), $cover.addClass("coverplay"), $bar.addClass("animate")) : (FwmMedia.pause(), $lrc.hide(), setTimeout(function() {FwmTips.show(pollsL10n.off+pollsL10n.Autoplay)}, 3E3));
      FwmLrc.load();
      RootCookies.SetCookie("player_show", "yes", 1)
    },
    getSongId: function(a) {return a >= songTotal ? 0 : 0 > a ? songTotal - 1 : a},
    next: function() {random ? FwmMedia.getInfos(window.parseInt(Math.random() * songTotal), albumId) : FwmMedia.getInfos(FwmMedia.getSongId(songId + 1), albumId)},
    prev: function() {random ? FwmMedia.getInfos(window.parseInt(Math.random() * songTotal), albumId) : FwmMedia.getInfos(FwmMedia.getSongId(songId - 1), albumId)},
    getalbumId: function(b) {return b >= albumTotal ? 0 : 0 > b ? albumTotal - 1 : b},
    anext: function() {suiji ? FwmMedia.getInfos(0, window.parseInt(Math.random() * albumTotal)) : FwmMedia.getInfos(0, FwmMedia.getalbumId(albumId + 1))},
    aprev: function() {suiji ? FwmMedia.getInfos(0, window.parseInt(Math.random() * albumTotal)) : FwmMedia.getInfos(0, FwmMedia.getalbumId(albumId - 1))}
  },
  FwmTipsTime = null,
  FwmTips = {show: function(a) {clearTimeout(FwmTipsTime);$("#FwmTips").text(a).addClass("show");this.hide()},hide: function() {FwmTipsTime = setTimeout(function() {$("#FwmTips").removeClass("show");0 == musicfirsttip && (musicfirsttip = !0, "open" == welcome && FwmTips.show(tips))}, 4E3)}};
  random ? ($songFrom2.html('<i class="random fa fa-random" aria-hidden="true"></i> '+pollsL10n.Shuffle)) : ($songFrom2.html('<i class="random fa fa-long-arrow-right" aria-hidden="true"></i> '+pollsL10n.Order));
  $lrc.hasClass("hide") ? ($songFrom3.html('<i class="fa fa-times-circle" aria-hidden="true"></i> '+pollsL10n.lyrics+pollsL10n.close)) : ($songFrom3.html('<i class="fa fa-times-circle" aria-hidden="true"></i> '+pollsL10n.lyrics+pollsL10n.open));
  audio.addEventListener("play", FwmMedia.play, !1);
  audio.addEventListener("pause", FwmMedia.pause, !1);
  audio.addEventListener("ended", FwmMedia.next, !1);
  audio.addEventListener("playing", FwmMedia.playing, !1);
  audio.addEventListener("volumechange", FwmMedia.volumechange, !1);
  audio.addEventListener("error", FwmMedia.error, !1);
  audio.addEventListener("seeking", FwmMedia.seeking, !1);
//隐藏/展开播放器键
  $play.click(function() {$player.toggleClass("show");$player.hasClass("show") ? ($play.attr("title", pollsL10n.hide)) : ($play.attr("title", pollsL10n.show))});
  $(function() {
    window.RootCookies = {};
    window.RootCookies.SetCookie = function(a, c, b) {
      var d = new Date;
      d.setTime(d.getTime() + 864E5 * b);
      window.document.cookie = a + "=" + window.escape(c) + (null == b ? "": ";expires=" + d.toGMTString()) + ";path=/"
    }
  });
//暂停键
  $(".pause", $player).click(function() {
    hasgeci = !1;
    $("li", $albumList).eq(albumId).addClass(cur).find(".artist").html(pollsL10n.Pause+" > ").parent().siblings().removeClass(cur).find(".artist").html("").parent();
    FwmTips.show(pollsL10n.from + songFrom55 + "：" + FwmLists[albumId].song_list[songId].song_title + " - " + FwmLists[albumId].song_list[songId].singer);
    setTimeout(function() {FwmTips.show(pollsL10n.SNext)}, 4E3);
    $cover.removeClass("coverplay");
    $bar.removeClass("animate");
    RootCookies.SetCookie("player", "no", 30);
    audio.pause()
  });
//播放键
  $(".play", $player).click(function() {
    hasgeci = !0;
    RootCookies.SetCookie("player", "no", -1);
    auto = "";
    $lrc.show();
    $("li", $albumList).eq(albumId).addClass(cur).find(".artist").html(pollsL10n.play + " > ").parent().siblings().removeClass(cur).find(".artist").html("").parent();
    FwmTips.show(pollsL10n.from + songFrom55 + "：" + FwmLists[albumId].song_list[songId].song_title + " - " + FwmLists[albumId].song_list[songId].singer);
    setTimeout(function() {FwmTips.show(pollsL10n.ANext)}, 4E3);
    $cover.addClass("coverplay");
    $bar.addClass("animate");
    audio.play()
  });
//上一首键
  $(".prev", $player).click(function() {RootCookies.SetCookie("player", "no", -1);hasgeci = !0;auto = "";$lrc.show();FwmMedia.prev();$(".loading,.loading2").show()});
//下一首键
  $(".next", $player).click(function() {RootCookies.SetCookie("player", "no", -1);hasgeci = !0;auto = "";$lrc.show();FwmMedia.next();$(".loading,.loading2").show()});
//上一专辑键
  $(".aprev", $player).click(function() {RootCookies.SetCookie("player", "no", -1);hasgeci = !0;auto = "";$lrc.show();FwmMedia.aprev();$(".loading,.loading2").show()});
//下一专辑键
  $(".anext", $player).click(function() {RootCookies.SetCookie("player", "no", -1);hasgeci = !0;auto = "";$lrc.show();FwmMedia.anext();$(".loading,.loading2").show()});
//播放模式键
  $(".moshi", $player).click(function() {random ? (random = 0, FwmTips.show(pollsL10n.Order), $songFrom2.html('<i class="random fa fa-retweet" aria-hidden="true"></i> '+pollsL10n.Order)) : (loop ?  (random = 1, audio.loop = false, loop = 0, FwmTips.show(pollsL10n.Shuffle), $songFrom2.html('<i class="random fa fa-random" aria-hidden="true"></i> '+pollsL10n.Shuffle))
 : (random = 0, audio.loop = true, loop = 1, FwmTips.show(pollsL10n.Single), $songFrom2.html('<i class="random fa fa-refresh" aria-hidden="true"></i> '+pollsL10n.Single)))});
//音量键
  $progress.click(function(a) {
    var c = $progress.width(),
    b = $progress.offset().left;
    volume = (a.clientX - b) / c;
    $.cookie("player_volume", volume, {path: "/",expires: 0});
    audio.volume = volume
  });
//静音键
  $(".mute", $player).click(function() {mute ? (audio.volume = volume, mute = 0, $(this).removeClass("fa-bell"), $(this).addClass("fa-bell-slash")) : (audio.volume = 0,  mute = 1, $(".volume-on", $progress).width("0%"),$(this).removeClass("fa-bell-slash"), $(this).addClass("fa-bell"))});
  var isDown = !1;
  $(".drag", $progress).mousedown(function() {isDown = !0;$(".volume-on", $progress).removeClass("ts5")});
  var startX, endX;
//快进/快退键
  $(".timestyle", $player).mousedown(function(event){startX = event.screenX;}).mousemove(function(event){if (event.which === 1) {endX = event.screenX;audio.currentTime += Math.round((endX - startX) / 678 * 100);setProgress(audio.currentTime);cicleTime = setInterval(FwmCicle, 800)}});
  $(".timestyle", $player).bind('touchstart', function(event){startX = event.originalEvent.targetTouches[0].screenX;}).bind('touchmove',function(event){endX = event.originalEvent.targetTouches[0].screenX;audio.currentTime += Math.round((endX - startX) / 678 * 100);setProgress(audio.currentTime);cicleTime = setInterval(FwmCicle, 800)});
  function setProgress(value){var currentSec = parseInt(value%60) < 10 ? '0' + parseInt(value%60) : parseInt(value%60);$(".time", $player).text(formatSecond(audio.currentTime) + "/" + formatSecond(audio.duration));}
  $(window).on({
    mousemove: function(a) {
      if (isDown) {
        var c = $progress.width(),
        b = $progress.offset().left;
        a = a.clientX;
        a >= b && a <= b + c && ($(".volume-on", $progress).width((a - b) / c * 100 + "%"), volume = (a - b) / c, audio.volume = volume)
      }
    },
    mouseup: function() {isDown = !1;$(".volume-on", $progress).addClass("ts5")}
  });
//播放列表键
  $(".switch-playlist").click(function() {$player.toggleClass("showAlbumList")});
  $songList.mCustomScrollbar();
//歌曲列表键
  $(".song-list .musicheader,.song-list .fa-angle-right", $player).click(function() {$player.removeClass("showSongList")});
//歌词模式键
  $(".geci", $player).click(function(){
    $lrc.toggleClass("hide");
    $lrc.hasClass("hide") ? (ycgeci = !1, hasLrc && $songFrom3.html('<i class="fa fa-times-circle" aria-hidden="true"></i> '+pollsL10n.lyrics+pollsL10n.close), FwmTips.show(pollsL10n.lyrics+pollsL10n.close), songFrom33 = pollsL10n.close) : (ycgeci = !0, hasLrc && $songFrom3.html('<i class="fa fa-check-circle" aria-hidden="true"></i> '+pollsL10n.lyrics+pollsL10n.open), FwmTips.show(pollsL10n.lyrics+pollsL10n.open), songFrom33 = pollsL10n.open)
  });
//切换QQ音乐键
  $qq.click(function() {
  qqid != "NO" && type != "tencent" && (id = qqid,songFrom55 = pollsL10n.qqm,type = "tencent",$qq.removeClass(des).attr("title", pollsL10n.play + "：" + pollsL10n.qqm),$bd.addClass(des).attr("title", pollsL10n.change + pollsL10n.bdm),$wy.addClass(des).attr("title", pollsL10n.change + pollsL10n.wym),$xm.addClass(des).attr("title", pollsL10n.change + pollsL10n.xmm),switchmusic())
  qqid == "NO" && $qq.attr("title", pollsL10n.qq)
  });
//切换百度音乐键
  $bd.click(function() {
  bdid != "NO" && type != "baidu" && (id = bdid,type = "baidu",songFrom55 = pollsL10n.bdm,$qq.addClass(des).attr("title", pollsL10n.change + pollsL10n.qqm),$bd.removeClass(des).attr("title", pollsL10n.play + "：" + pollsL10n.bdm),$wy.addClass(des).attr("title", pollsL10n.change + pollsL10n.wym),$xm.addClass(des).attr("title", pollsL10n.change + pollsL10n.xmm),switchmusic())
  bdid == "NO" && $bd.attr("title", pollsL10n.bd)
  });
//切换虾米音乐键
  $xm.click(function() {
  xmid != "NO" && type != "xiami" && (id = xmid,songFrom55 = pollsL10n.xmm,type = "xiami",$qq.addClass(des).attr("title", pollsL10n.change + pollsL10n.qqm),$bd.addClass(des).attr("title", pollsL10n.change + pollsL10n.bdm),$wy.addClass(des).attr("title", pollsL10n.change + pollsL10n.wym),$xm.removeClass(des).attr("title", pollsL10n.play + "：" + pollsL10n.xmm),switchmusic())
  xmid == "NO" && $xm.attr("title", pollsL10n.xm)
  });
//切换网易云音乐键
  $wy.click(function() {
  wyid != "NO" && type != "netease" && (id = wyid,songFrom55 = pollsL10n.wym,type = "netease",$qq.addClass(des).attr("title", pollsL10n.change + pollsL10n.qqm),$bd.addClass(des).attr("title", pollsL10n.change + pollsL10n.bdm),$wy.removeClass(des).attr("title", pollsL10n.play + "：" + pollsL10n.wym),$xm.addClass(des).attr("title", pollsL10n.change + pollsL10n.xmm),switchmusic())
  wyid == "NO" && $wy.attr("title", pollsL10n.wy)
  });
function switchmusic() {
    if(!PlayerIsLoad) return false;
    $player.removeClass("showSongList");
    $(".loading,.loading2").show();
    data = {action: 'Fwm_api', do: 'song', type: type, id: id, sj: suiji, from: pollsL10n.from+songFrom55};
    $.ajax({url: ajax_url,type: "GET",dataType: "script",data: data,success: function() {FwmTips.show(FwmLists[albumId].song_album + " - "+pollsL10n.success); FwmPlayer.playList.creat.album();$(".play", $player).click()},error: function(a, c, b) {FwmTips.show(pollsL10n.Playlist+pollsL10n.Failed)}})
musictooltip()
}
//随机选择来源
  typeid.sort(function(){return Math.random()>0.5?-1:1;});
  for (var i=0;i<4;i++) {
   type = typeid[i];
   switch(type) {
   case "tencent":songFrom55 = pollsL10n.qqm; id = qqid; break;
   case "baidu	":songFrom55 = pollsL10n.bdm; id = bdid; break;
   case "xiami":songFrom55 = pollsL10n.xmm; id = xmid; break;
   case "netease":songFrom55 = pollsL10n.wym; id = wyid; break;
   }
   if (id != "NO") {$(".switch-"+type,$player).removeClass(des); $(".switch-"+type,$player).attr("title", pollsL10n.play + "："+songFrom55);break}
  };
  data = {action: 'Fwm_api', do: 'song', type: type, id: id, sj: suiji, from: pollsL10n.from + songFrom55};
  $.ajax({url: ajax_url,type: "GET",dataType: "script",data: data,success: function() {FwmPlayer.playList.creat.album()},error: function(a, c, b) {FwmTips.show(pollsL10n.Playlist+pollsL10n.Failed)}});
  FwmPlayer.newplayList = {
    creat: {
      album: function() {
        var a = albumTotal = FwmLists.length, c = "";
        $(".musicheader", $albumList).text(name + "(" + a + pollsL10n.List + songFrom55 + ")");
        for (var b = 0; b < a; b++) c += '<li title="' + FwmLists[b].song_album + " - " + FwmLists[b].song_album1 + '"><i class="fa fa-angle-right" aria-hidden="true"></i><span class="index">' + (b + 1) + '</span><span class="artist"></span>' + FwmLists[b].song_album + " - " + FwmLists[b].song_album1 + "</li>";
        $(".list", $albumList).html("<ul>" + c + "</ul>").mCustomScrollbar();
        $("li", $albumList).click(function() {
          var a = $(this).index();
          $(this).hasClass(cur) ? FwmPlayer.newplayList.creat.song(a, !0) : FwmPlayer.newplayList.creat.song(a, !1);
          $player.addClass("showSongList")
        });
        songTotal = FwmLists[albumId].song_list.length
      },
      song: function(a, c) {
        songTotal = FwmLists[a].song_list.length;
        albumTotal = FwmLists.length;
        var b = "";
        $(".song-list .musicheader span", $player).text(FwmLists[a].song_album + "(" + songTotal + pollsL10n.Songs + songFrom55 + ")");
        for (var d = 0; d < songTotal; d++) b += '<li title="' + FwmLists[a].song_list[d].song_title + " - " + FwmLists[a].song_list[d].singer + '"><span class="index">' + (d + 1) + '</span><span class="artist"></span>' + LimitStr(FwmLists[a].song_list[d].song_title + " - " + FwmLists[a].song_list[d].singer, 22) + "</li>";
        $("ul", $songList).html(b);
        $songList.attr("data-album", a);
        $songList.mCustomScrollbar("update");
        c ? ($("li", $songList).eq(songId).addClass(cur).siblings().removeClass(cur), $songList.mCustomScrollbar("scrollTo", $("li.current", $songList).position().top - 120)) : $songList.mCustomScrollbar("scrollTo", "top");
        $("li", $songList).click(function() {
          hasgeci = !0;
          auto = "";
          $(".loading,.loading2").show();
          albumId = a;
          $(this).hasClass(cur) ? ($(".loading,.loading2").hide(), FwmTips.show(pollsL10n.from + songFrom55 + "：" + FwmLists[a].song_list[d].song_title + " - " + FwmLists[a].song_list[d].singer)) : (RootCookies.SetCookie("player", "no", -1), $(this).addClass(cur).siblings().removeClass(cur), songId = $(this).index(), FwmMedia.getInfos(songId, albumId))
        })
      }
    }
  };
  FwmPlayer.playList = {
    creat: {
      album: function() {
        var a = albumTotal = FwmLists.length,
        c = "";
        $(".musicheader", $albumList).text(name + "(" + a + pollsL10n.List + songFrom55 + ")");
        for (var b = 0; b < a; b++) c += '<li title="' + FwmLists[b].song_album + " - " + FwmLists[b].song_album1 + '"><i class="fa fa-angle-right" aria-hidden="true"></i><span class="index">' + (b + 1) + '</span><span class="artist"></span>' + FwmLists[b].song_album + " - " + FwmLists[b].song_album1 + "</li>";
        $(".list", $albumList).html("<ul>" + c + "</ul>").mCustomScrollbar();
        $("li", $albumList).click(function() {
          var a = $(this).index();
          $(this).hasClass(cur) ? FwmPlayer.playList.creat.song(a, !0) : FwmPlayer.playList.creat.song(a, !1);
          $player.addClass("showSongList")
        });
        songTotal = FwmLists[albumId].song_list.length;
        random ? FwmMedia.getInfos(window.parseInt(Math.random() * songTotal), albumId) : FwmMedia.getInfos(FwmMedia.getSongId(songId), albumId)
      },
      song: function(a, c) {
        songTotal = FwmLists[a].song_list.length;
        albumTotal = FwmLists.length;
        var b = "";
        $(".song-list .musicheader span", $player).text(FwmLists[a].song_album + "(" + songTotal + pollsL10n.Songs + songFrom55 + ")");
        for (var d = 0; d < songTotal; d++) b += '<li title="' + FwmLists[a].song_list[d].song_title + " - " + FwmLists[a].song_list[d].singer + '"><span class="index">' + (d + 1) + '</span><span class="artist"></span>' + LimitStr(FwmLists[a].song_list[d].song_title + " - " + FwmLists[a].song_list[d].singer, 22) + "</li>";
        $("ul", $songList).html(b);
        $songList.attr("data-album", a);
        $songList.mCustomScrollbar("update");
        c ? ($("li", $songList).eq(songId).addClass(cur).siblings().removeClass(cur), $songList.mCustomScrollbar("scrollTo", $("li.current", $songList).position().top - 120)) : $songList.mCustomScrollbar("scrollTo", "top");
        $("li", $songList).click(function() {
          hasgeci = !0;
          auto = "";
          $(".loading,.loading2").show();
          albumId = a;
          $(this).hasClass(cur) ? ($(".loading,.loading2").hide(), FwmTips.show(pollsL10n.from + songFrom55 + "：" + FwmLists[a].song_list[d].song_title + " - " + FwmLists[a].song_list[d].singer)) : (RootCookies.SetCookie("player", "no", -1), $(this).addClass(cur).siblings().removeClass(cur), songId = $(this).index(), FwmMedia.getInfos(songId, albumId))
        })
      }
    }
  };
  var hasLrc = !1,
  lrcTimeLine = [],
  lrcHeight = $lrc.height(),
  lrcTime = null,
  FwmLrc = {
    load: function() {
      hasgeci || $lrc.addClass("hide");
      FwmLrc.lrc.hide();
      hasLrc = !1;
      $lrc.html("");
      hasgeci ? $songFrom3.html('<i class="fa fa-check-circle" aria-hidden="true"></i> '+ pollsL10n.lyrics + songFrom33) : $songFrom3.html('<i class="fa fa-times-circle" aria-hidden="true"></i> '+ pollsL10n.lyrics  + songFrom33);
      $.ajax({url: ajax_url,type: "GET",dataType: "script",data: {action: 'Fwm_api',do: 'lyric',id: id,type: type},success: function() {0 <= cont.indexOf("[00") ? setTimeout(function() {FwmLrc.lrc.format(cont)},500) : ($songFrom3.html('<i class="fa fa-times-circle" aria-hidden="true"></i> '+pollsL10n.Nol))},error: function() {$songFrom3.html('<i class="fa fa-times-circle" aria-hidden="true"></i> '+pollsL10n.Nol)}})
    },
    lrc: {
      format: function(a) {
        function c(a) {
          var b = a.split(":");
          a = +b[0];
          var c = +b[1].split(".")[0],
          b = +b[1].split(".")[1];
          return 60 * a + c + Math.round(b / 1E3)
        }
        hasLrc = !0;
        a = a.replace(/\[[A-Za-z]+:(.*?)]/g, "").split(/[\]\[]/g);
        var b = "";
        lrcTimeLine = [];
        for (var d = 1; d < a.length; d += 2) {
          var e = c(a[d]);
          lrcTimeLine.push(e);
          b = 1 == d ? b + ('<li class="FwmLrc' + e + ' current">' + a[d + 1].replace("\n", "") + "</li>") : b + ('<li class="FwmLrc' + e + '">' + a[d + 1].replace("\n", "") + "</li>")
        }
        $lrc.html("<ul>" + b + "</ul>");
        setTimeout(function() {$lrc.addClass("show")},500);
        lrcTime = setInterval(FwmLrc.lrc.play, 500)
      },
      play: function() {var a = Math.round(audio.currentTime);0 < $.inArray(a, lrcTimeLine) ? (a = $(".FwmLrc" + a), a.hasClass(cur) || (a.addClass(cur).siblings().removeClass(cur), $lrc.animate({scrollTop: lrcHeight * a.index()}))) : Cont = ""},
      hide: function() {clearInterval(lrcTime);$lrc.removeClass("show")}
    }
  }
}
function LimitStr(a, c, b) {
//限制显示字符数
  c = c || 5;
  b = b || "...";
  for (var d = "",e = a.length,f = 0,g = 0; f < 2 * c && g < e; g++)
  f += 128 < a.charCodeAt(g) ? 2 : 1,
  d += a.charAt(g);
  g < e && (d += b);
  return d
}
function loadblur(a) {
  var c = "",
  b = $(".blur"),
  d = new Image;
  d.onload = function() {
    if (a == c) {
      var d = b.clone();
      b.parent().append(d.css({display: "none",top: -b.height() - 3 + "px"}).attr("src", a));
      d.fadeIn(1E3,function() {d.css("top", "0px");b.remove();b = d})
    }
  };
  c = d.src = a
}
function allmusic() {
  $("li", $albumList).eq(albumId).addClass(cur).find(".artist").html(pollsL10n.play + ">").parent().siblings().removeClass(cur).find(".artist").html("").parent();
  "" == !$("ul", $songList).html() && $("[data-album=" + albumId + "]").length && ($("[data-album=" + albumId + "]").find("li").eq(songId).addClass(cur).siblings().removeClass(cur), $songList.mCustomScrollbar("scrollTo", $("li.current", $songList).position().top - 120))
}
//自动变色
function playercolor() {
  musictooltip();
  $player.css({background: "rgba(" + ccont + ",.8)",color: "rgb(" + ccont1 + ")"});
  $play.css({background: "rgba(" + ccont + ",.8)"});
  $(".switch-sourse", $player).css({background: "rgba(" + ccont + ",.8)"});
  $lrc.css({background: "rgba(" + ccont + ",.8)",color: "rgb(" + ccont1 + ")"});
  $("#FwmTips").css({background: "rgba(" + ccont + ",.8)",color: "rgb(" + ccont1 + ")"})
}
//提示框
function musictooltip() {
    $('#FwmPlayer .player span,#FwmPlayer .player i,#FwmPlayer .player div,#FwmPlayer.showAlbumList .playlist li')['each'](function() {
        $('#tooltip')['remove']();
        if (this['title']) {
            var a = this['title'];
            $(this)['mouseover'](function(b) {
                this['title'] = '';
                $('body')['append']('<div id="tooltip">' + a + '</div>');
                $('#tooltip')['css']({left: b['pageX'] - 0xf + 'px',top: b['pageY'] + 0x1e + 'px',opacity: '0.9'})['fadeIn'](0xfa)
            })['mouseout'](function() {this['title'] = a;$('#tooltip')['remove']()
            })['mousemove'](function(b) {$('#tooltip')['css']({left: b['pageX'] - 0xf + 'px',top: b['pageY'] + 0x1e + 'px'})})
        }
    })
}
//播放/暂停键
$(window.document).ready(function() {$(window).keydown(function(a) {192 == a.keyCode && (auto = "", audio.paused ? $(".play", $player).click() : $(".pause", $player).click())})});
//显示源选择器
$player.mouseover(function(){source == "YES" && $(".switch-sourse", $player).addClass("open")}).mouseout(function(){$(".switch-sourse", $player).removeClass("open")});
$(window).scroll(function() {$(this).scrollTop() + $(this).height() == $(window.document).height() ? hasgeci && ycgeci && ($lrc.addClass("hide"), $songFrom3.html('<i class="fa fa-times-circle" aria-hidden="true"></i> '+pollsL10n.lyrics+pollsL10n.close), hasLrc && FwmTips.show(pollsL10n.lyrics+pollsL10n.close)) : ($lrc.hasClass("hide")) && hasgeci && ycgeci && ($lrc.removeClass("hide"), hasLrc && $songFrom3.html('<i class="fa fa-check-circle" aria-hidden="true"></i> '+pollsL10n.lyrics+pollsL10n.open), FwmTips.show(pollsL10n.lyrics+pollsL10n.open))});
window.console&&window.console.log&&(console.log("%c%s","color: #81d742; background: black; font-size: 30px","WordPress浮窗音乐播放器  \n作者:Eric               \n版本:"+ver+"              \n主页:http://eric.cn.com/"));
!PlayerIsLoad && window.console&&window.console.log&&(console.log("%c%s","color: #81d742; background: black; font-size: 30px","取消加载：其他页面已经加载"))