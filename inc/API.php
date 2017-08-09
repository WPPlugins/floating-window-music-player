<?php
if ( ! defined( 'ABSPATH' ) ) exit;
function Fwm_Player_footer() {
  echo '<script>name="' . get_option(Fwm_player_name) . '";tips="' . get_option(Fwm_player_tips) . '";wyid="' . get_option(Fwm_player_wyid) . '";qqid="' . get_option(Fwm_player_qqid) . '";bdid="' . get_option(Fwm_player_bdid) . '";xmid="' . get_option(Fwm_player_xmid) . '";ajax_url="' . admin_url('admin-ajax.php') . '";move="' . get_option(Fwm_player_move) . '";geci="' . get_option(Fwm_player_geci) . '";auto="' . get_option(Fwm_player_auto) . '";suiji="' . get_option(Fwm_player_suiji) . '";random="' . get_option(Fwm_player_random) . '";source="' . get_option(Fwm_player_source) . '";ver="' . Fwm_Player_VER . '";welcome="open";st="' . get_option(Fwm_player_st)*1000 . '";</script>';
  wp_enqueue_style( 'player', Fwm_Player_URL.'/inc/player.css','',Fwm_Player_VER);?>
  <div id="FwmPlayer" class="show" oncontextmenu="return false">
    <div class="player">
      <div class="blur-img"><img class="blur"></div>
      <div class="infos">
        <div class="songstyle">
          <i class="fa fa-music" aria-hidden="true"></i>
          <span class="song"></span>
          <span class="timestyle" title="<?php _e('Drag left / right to forward / rewind', FwmTD)?>"><span class="time">00:00/00:00</span></span>
        </div>
        <div class="artiststyle">
          <i class="fa fa-user" aria-hidden="true"></i>
          <span class="artist"></span>
          <span class="moshi" title="<?php _e('Playback mode', FwmTD)?>"><i class="random fa fa-random" aria-hidden="true"></i></span>
        </div>
        <div class="artiststyle">
          <i class="fa fa-folder" aria-hidden="true"></i>
          <span class="artist1"></span>
          <span class="geci" title="<?php _e('Lyrics mode', FwmTD)?>"></span>
        </div>
      </div>
      <div class="control">
        <i class="aprev fa fa-fast-backward" title="<?php _e('Previous album', FwmTD)?>" aria-hidden="true"></i>
        <i class="prev fa fa-backward" title="<?php _e('Previous song', FwmTD)?>" aria-hidden="true"></i>
        <div class="status">
          <b><i class="play fa fa-play" title="<?php _e('Play', FwmTD)?>" aria-hidden="true"></i><i class="pause fa fa-pause" title="<?php _e('Pause', FwmTD)?>" aria-hidden="true"></i></b>
        </div>
        <i class="anext fa fa-fast-forward" title="<?php _e('Next album', FwmTD)?>" aria-hidden="true"></i>
        <i class="next fa fa-forward" title="<?php _e('Next song', FwmTD)?>" aria-hidden="true"></i>
      </div>
      <div class="musicbottom">
        <div class="volume">
          <i class="mute fa fa-bell-slash" title="<?php _e('Mute', FwmTD)?>" aria-hidden="true"></i>
          <div class="progress">
            <div class="volume-on ts5"><i class="drag fa fa-circle-o" aria-hidden="true" title="<?php _e('Volume', FwmTD)?>"></i></div>
          </div>
        </div>
        <i class="switch-info fa fa-home" title="<?php _e('Homepage of Music Player', FwmTD)?>" aria-hidden="true"></i>
        <i class="down"><i class="fa fa-download" title="<?php _e('Download', FwmTD)?>" aria-hidden="true"></i></i>
        <div class="switch-playlist"><i class="fa fa-list-ul" title="<?php _e('Playlist', FwmTD)?>" aria-hidden="true"></i></div>
      </div>
      <div class="cover" title="<?php _e('View song cover', FwmTD)?>"></div>
    </div>
    <div class="playlist">
      <div class="playlist-bd">
        <div class="album-list">
          <div class="musicheader"></div><div class="list"></div>
        </div>
        <div class="song-list">
          <div class="musicheader"><i class="fa fa-angle-right" aria-hidden="true"></i><span></span></div>
          <div class="list "><ul></ul></div>
        </div>
      </div>
    </div>
    <div class="switch-player" title="<?php _e('Hide the player', FwmTD)?>">
      <span class="musicbar inline m-l-sm">
        <span class="bar1 a1 bg-primary lter"></span>
        <span class="bar2 a2 bg-info lt"></span>
        <span class="bar3 a3 bg-success"></span>
        <span class="bar4 a4 bg-warning dk"></span>
        <span class="bar5 a5 bg-danger dker"></span>
      </span>
    </div>
    <div class="switch-sourse">
        <div><img src="//s1.music.126.net/music.ico" width="18" class="switch-netease desaturate" title="<?php _e('Change to ', FwmTD);_e('Netease Music', FwmTD)?>"/></div>
        <div><img src="//y.qq.com/favicon.ico" width="18" class="switch-tencent desaturate" title="<?php _e('Change to ', FwmTD);_e('QQ Music', FwmTD)?>"/></div>
        <div><img src="//g.alicdn.com/de/music-static/favicon.ico" width="18" class="switch-xiami desaturate" title="<?php _e('Change to ', FwmTD);_e('Xiami Music', FwmTD)?>"/></div>
        <div><img src="//www.baidu.com/favicon.ico" width="18" class="switch-baidu desaturate" title="<?php _e('Change to ', FwmTD);_e('Baidu Music', FwmTD)?>"/></div>
</div>
  </div>
  <div id="FwmTips"></div>
  <div id="FwmLrc"></div>
  <div class="loading">
    <div class="loading2">
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
    </div>
  </div>
<?php
  if ( !is_admin() && get_option(Fwm_player_css) !='') echo '<style type="text/css">'.get_option('Fwm_player_css').'</style>';
  wp_enqueue_script( 'mCustomScrollbar', '//cdn.bootcss.com/malihu-custom-scrollbar-plugin/2.8.7/jquery.mCustomScrollbar.min.js','','2.8.7');
  wp_enqueue_script( 'mousewheel', '//cdn.bootcss.com/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js','','3.1.13');
  wp_enqueue_script( 'player', Fwm_Player_URL.'/js/player.js','',Fwm_Player_VER);
    wp_localize_script('player', 'pollsL10n', array(
	'close' => __('Close', FwmTD),
	'open' => __('Open', FwmTD),
	'Shuffle' => __('Shuffle:  On', FwmTD),
	'Order' => __('Shuffle: Off', FwmTD),
	'volume' => __('Volume', FwmTD),
	'song' => __('Song：', FwmTD),
	'singer' => __('Singer：', FwmTD),
	'album' => __('Album：', FwmTD),
	'hide' => __('Hide the player', FwmTD),
	'show' => __('Expand the player', FwmTD),
	'Single' => __('Single cycle', FwmTD),
	'albums' => __('Album cycle', FwmTD),
	'mute' => __('Mute', FwmTD),
	'download' => __('Downoad from ', FwmTD),
	'play' => __('Current Playing', FwmTD),
	'change' => __('Change to ', FwmTD),
	'qq' => __('There is no set QQ Music content', FwmTD),
	'bd' => __('There is no set Baidu Music content', FwmTD),
	'wy' => __('There is no set Netease Music content', FwmTD),
	'xm' => __('There is no set Xiami Music content', FwmTD),
	'qqm' => __('QQ Music', FwmTD),
	'bdm' => __('Baidu Music', FwmTD),
	'wym' => __('Netease Music', FwmTD),
	'xmm' => __('Xiami Music', FwmTD),
	'Playlist' => __('Playlist', FwmTD),
	'Failed' => __(' Get Failed', FwmTD),
	'success' => __(' Get Success', FwmTD),
	'Autoplay' => __('Autoplay', FwmTD),
	'Stop' => __('Stop playing', FwmTD),
	'Auto' => __('Auto ', FwmTD),
	'off' => __('Turn off ', FwmTD),
	'SNext' => __('Stop playing Next time', FwmTD),
	'ANext' => __('Auto playing Next time', FwmTD),
	'from' => __('Playing from ', FwmTD),
	'Pause' => __('Pause', FwmTD),
	'Nol' => __('No lyric', FwmTD),
	'List' => __(' Song Lists from ', FwmTD),
	'Songs' => __(' Songs from ', FwmTD),
	'Seek' => __('Song Seeking', FwmTD),
	'Load' => __('Loading songs', FwmTD),
	'wait' => __('Please wait..', FwmTD),
	'lyrics' => __('Lyrics:', FwmTD)
    ));
  }
  add_action( 'wp_ajax_Fwm_api', 'Fwm_api' );
  add_action( 'wp_ajax_nopriv_Fwm_api', 'Fwm_api' );
  function Fwm_api() {
    $do = sanitize_text_field($_GET['do']);
    $id = sanitize_text_field($_GET['id']);
    $type = sanitize_text_field($_GET['type']);
    $ti = get_option(Fwm_player_tips);
    switch ($do) {
      case 'color':
        $url = sanitize_text_field($_GET['url']);
        $imageInfo = getimagesize($url);
        $imgType = strtolower(substr(image_type_to_extension($imageInfo[2]), 1));
        $imageFun = 'imagecreatefrom' . ($imgType == 'jpg' ? 'jpeg' : $imgType);
        $i = $imageFun($url);
        $rColorNum = $gColorNum = $bColorNum = $total = 0;
        for ($x = 0; $x < imagesx($i); $x++) {
            for ($y = 0; $y < imagesy($i); $y++) {
                $rgb = imagecolorat($i, $x, $y);
                $r = $rgb >> 16 & 0xff;
                $g = $rgb >> 8 & 0xff;
                $b = $rgb & 0xff;
                $rColorNum += $r;
                $gColorNum += $g;
                $bColorNum += $b;
                $total++;
            }
        }
        $rgb = array();
        $rgb['r'] = round($rColorNum / $total);
        $rgb['g'] = round($gColorNum / $total);
        $rgb['b'] = round($bColorNum / $total);
        echo "var ccont = '" . $rgb['r'] . "," . $rgb['g'] . "," . $rgb['b'] . "';";
        $R = (abs(255 - $rgb['r']*2) < 100) ? abs($rgb['r'] - 100) : (255 - $rgb['r']);
        $G = (abs(255 - $rgb['g']*2) < 100) ? abs($rgb['g'] - 100) : (255 - $rgb['g']);
        $B = (abs(255 - $rgb['b']*2) < 100) ? abs($rgb['b'] - 100) : (255 - $rgb['b']);
        echo "var ccont1 = '" . $R . "," . $G . "," . $B . "';";
        break;
      case 'song':
        echo "var FwmLists =[";
        $sj = get_option(Fwm_player_suiji);
        $name = get_option(Fwm_player_name);
        $from = sanitize_text_field($_GET['from']);
        switch ($type) {
            case 'tencent':
                $songlist = explode('|', $id);
                $c = count($songlist);
                !$songlist[$c-1] && $c = $c -1;
                for ($i = 0; $i < $c; $i++) {
                    $songid = explode('*', $songlist[$i]);
                    $response = json_decode(Fwm_Player_get_curl('http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n=' . $songid[1] . '&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w=' . $songid[0]), true);
                    $songs[$songid[0]] = $response['data']['song']['list'];
                    $userplaylist[] = array("song_album_id" => $songid[0], "song_album" => $songid[0], "song_album1" => $from, "song_list" => "");
                }
                $sj == "YES" && shuffle($userplaylist);
                for ($i = 0; $i < $c; $i++) {
                    $albumlist = $userplaylist[$i];
                    $song_lists = array();
                    foreach ($songs[$albumlist['song_album_id']] as $tracks) {$str = explode('|', $tracks['f']);$song_lists[] = array("song_id" => $str[0], "song_title" => $tracks['fsong'], "singer" => $tracks['fsinger'], "album" => $tracks['albumName_hilight'], "pic" => '//imgcache.qq.com/music/photo/album_300/' . intval($str[4]) % 100 . '/300_albumpic_' . $str[4] . '_0.jpg', "mp3url" => '//ws.stream.qqmusic.qq.com/' . $str[0] . '.m4a?fromtag=46');}
                    $albumlist['song_list'] = $song_lists;
                    print_r(json_encode($albumlist));
                    echo ",";
                }
                $userplaylist[] = array("song_album_id" => "all", "song_album" => "总榜", "song_album1" => $from, "song_list" => "");
                $userplaylist[] = array("song_album_id" => "newsong", "song_album" => "新歌榜", "song_album1" => $from, "song_list" => "");
                for ($i = $c; $i < ($c+2); $i++) {
                    $albumlist = $userplaylist[$i];
                    $song_lists = array();
                    $data = Fwm_Player_get_curl("http://music.qq.com/musicbox/shop/v3/data/hit/hit_" . $userplaylist[$i]['song_album_id'] . ".js");
                    $songs = substr(mb_convert_encoding($data, 'utf-8', mb_detect_encoding($data, array('UTF-8', 'GBK', 'LATIN1', 'BIG5'))), 36, -50);
                    $str = '{"song_list":[';
                    $songid = explode(',', $songs);
                    for ($x = 0; $x < count($songid); $x++) {
                        $data = explode(':', ltrim($songid[$x]));
                        $data[0] = $data[0] == '{id' ? '{"id"' : '"' . $data[0] . '"';
                        if ($data[0] == '"url"') {
                            $da = explode('.', $data[3]);
                            $data[1] = '"' . substr($da[0], 2) . '"';
                        }
                        if (isset($data[1])) $str .= $data[0] . ":" . $data[1];
                        else $str .= substr($data[0],1,-1);
                        if ($x < count($songid) - 1) $str .= ",";
                    }
                    $str .= "]}";
                    $songs = json_decode($str, true);
                    foreach ($songs['song_list'] as $tracks) {$song_lists[] = array("song_id" => $tracks['id'], "song_title" => $tracks['songName'], "singer" => $tracks['singerName'], "album" => $tracks['albumName'], "pic" => '//imgcache.qq.com/music/photo/album_300/' . intval($tracks['albumId']) % 100 . '/300_albumpic_' . $tracks['albumId'] . '_0.jpg', "mp3url" => '//ws.stream.qqmusic.qq.com/' . $str[0] . '.m4a?fromtag=46');}
                    $albumlist['song_list'] = $song_lists;
                    print_r(json_encode($albumlist));
                    echo $i < ($c+1) ? "," : "";
                }
                break;
            case 'baidu':
                $userplaylist[] = array("song_album_id" => 1, "song_album" => "新歌榜", "song_album1" => $from, "song_list" => "");
                $userplaylist[] = array("song_album_id" => 2, "song_album" => "热歌榜", "song_album1" => $from, "song_list" => "");
                $userplaylist[] = array("song_album_id" => 11, "song_album" => "摇滚榜", "song_album1" => $from, "song_list" => "");
                $userplaylist[] = array("song_album_id" => 12, "song_album" => "爵士榜", "song_album1" => $from, "song_list" => "");
                $userplaylist[] = array("song_album_id" => 21, "song_album" => "欧美金曲榜", "song_album1" => $from, "song_list" => "");
                $userplaylist[] = array("song_album_id" => 22, "song_album" => "经典老歌榜", "song_album1" => $from, "song_list" => "");
                $userplaylist[] = array("song_album_id" => 23, "song_album" => "情歌对唱榜", "song_album1" => $from, "song_list" => "");
                $userplaylist[] = array("song_album_id" => 24, "song_album" => "影视金曲榜", "song_album1" => $from, "song_list" => "");
                $userplaylist[] = array("song_album_id" => 25, "song_album" => "网络歌曲榜", "song_album1" => $from, "song_list" => "");
                $sj == "YES" && shuffle($userplaylist);
                for ($i = 0; $i < 9; $i++) {
                    $albumlist = $userplaylist[$i];
                    $song_lists = array();
                    $songs = json_decode(Fwm_Player_get_curl("http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&method=baidu.ting.billboard.billList&offset=0&type=" . $userplaylist[$i]['song_album_id'] . "&size=" . $id), true);
                    foreach ($songs['song_list'] as $tracks) {
                        $data = json_decode(Fwm_Player_get_curl('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=' . $tracks['song_id']), true);
                        $json = explode('?', strstr($data['bitrate']['file_link'], 'baidu'));
                        $song_lists[] = array("song_id" => $tracks['song_id'], "song_title" => $tracks['title'], "singer" => $tracks['artist_name'], "album" => $tracks['album_title'], "pic" => $tracks['pic_big'], "mp3url" => 'http://musicdata.'.$json[0]);
                    }
                    $albumlist['song_list'] = $song_lists;
                    print_r(json_encode($albumlist));
                    echo $i < 8 ? "," : "";
                }
                break;
            case 'xiami':
                $songlist = explode('|', $id);
                $c = count($songlist);
                !$songlist[$c-1] && $c = $c -1; 
                for ($i = 0; $i < $c; $i++) {
                    $songid = explode('*', $songlist[$i]);
                    $response = json_decode(substr(Fwm_Player_get_curl('http://www.xiami.com/song/playlist/id/' . $songid[1] . '/type/' . $songid[2] . '/cat/json?callback=?'), 3, -1), true);
                    $songs[$songid[1]] = $response['data']['trackList'];
                    $userplaylist[] = array("song_album_id" => $songid[1], "song_album" => $songid[0], "song_album1" => $from, "song_list" => "");
                }
                $sj == "YES" && shuffle($userplaylist);
                for ($i = 0; $i < $c; $i++) {
                    $albumlist = $userplaylist[$i];
                    $song_lists = array();
                    foreach ($songs[$albumlist['song_album_id']] as $tracks) {$song_lists[] = array("song_id" => $tracks['songId'], "song_title" => $tracks['songName'], "singer" => $tracks['artist'], "album" => $tracks['album_name'], "pic" => $tracks['album_pic'], "mp3url" => Fwm_Player_ipcxiami($tracks['location']));}
                    $albumlist['song_list'] = $song_lists;
                    print_r(json_encode($albumlist));
                    echo $i < $c - 1 ? "," : "";
                }
                break;
            case 'netease':
                $userplaylist = array();
                $response = json_decode(Fwm_Player_get_curl("http://music.163.com/api/user/playlist/?offset=0&limit=1001&uid=" . $id), true);
                foreach ($response['playlist'] as $tracks) {$userplaylist[] = array("song_album_id" => $tracks['id'], "song_album" => $tracks['name'], "song_album1" => $from, "song_list" => "");}
                $userplaylist[0]['song_album'] = $name . '音乐库';
                $sj == "YES" && shuffle($userplaylist);
                $c = count($userplaylist);
                for ($i = 0; $i < $c; $i++) {
                    $albumlist = $userplaylist[$i];
                    $song_lists = array();
                    $songs = json_decode(Fwm_Player_get_curl("http://music.163.com/api/playlist/detail?id=" . $userplaylist[$i]['song_album_id']), true);
                    foreach ($songs['result']['tracks'] as $tracks) {$song_lists[] = array("song_id" => $tracks['id'], "song_title" => $tracks['name'], "singer" => $tracks['artists'][0]['name'], "album" => $tracks['album']['name'], "pic" => $tracks['album']['picUrl'], "mp3url" => 'http://music.163.com/song/media/outer/url?id='.$tracks['id']);}
                    $albumlist['song_list'] = $song_lists;
                    print_r(json_encode($albumlist));
                    echo $i < $c - 1 ? "," : "";
                }
                break;
        }
        echo "]";
        break;
      case 'lyric':
        switch ($type) {
            case 'tencent':
                $xmlfile = file_get_contents('http://music.qq.com/miniportal/static/lyric/' . intval($id) % 100 . '/' . $id . '.xml');
                $str = substr(strstr(str_replace(PHP_EOL, '', mb_convert_encoding($xmlfile, 'utf-8', mb_detect_encoding($xmlfile, array('UTF-8', 'GBK', 'LATIN1', 'BIG5')))), '[0'), 0, -11);
                break;
            case 'baidu':
                $str = json_decode(str_replace('\\n', '', Fwm_Player_get_curl('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid=' . $id)), true);
                $str = $str['lrcContent'];
                break;
            case 'xiami':
                $arr = json_decode(substr(Fwm_Player_get_curl('http://www.xiami.com/song/playlist/id/' . $id . '/type/0/cat/json?callback=?'), 3, -1), true);
                $json = explode(PHP_EOL, Fwm_Player_get_curl($arr['data']['trackList'][0]['lyric_url']));
                $str = '';
                for ($i = 0; $i < count($json); $i++) {$str .= substr($json[$i], 0, -1);}
                break;
            case 'netease':
                $str = json_decode(str_replace('\\n', '', Fwm_Player_get_curl('http://music.163.com/api/song/lyric?os=pc&id=' . $id . '&lv=-1&kv=-1&tv=-1')), true);
                $str = $str['lrc']['lyric'];
                break;
        }
        echo 'var cont ="[00:00.01]~键：播放/暂停 ' . $ti . $str . '";';
        break;
    }
    wp_die();
  }
  function Fwm_Player_get_curl($url) { 
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $httpheader[] = "Accept:application/json";
    $httpheader[] = "Accept-Encoding:gzip,deflate,sdch";
    $httpheader[] = "Accept-Language:zh-CN,zh;q=0.8";
    $httpheader[] = "Cookie:appver=1.5.0.75771";
    $httpheader[] = "Connection:close";
    curl_setopt($ch, CURLOPT_HTTPHEADER, $httpheader);
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (MSIE 9.0; Windows NT 6.1; Trident/5.0)");
    curl_setopt($ch, CURLOPT_ENCODING, "gzip");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $ret = curl_exec($ch);
    curl_close($ch);
    return $ret;
  }
  function Fwm_Player_ipcxiami($location) {
    $count = (int) substr($location, 0, 1);
    $url = substr($location, 1);
    $line = floor(strlen($url) / $count);
    $loc_5 = strlen($url) % $count;
    $loc_6 = array();
    $loc_7 = 0;
    $loc_8 = $loc_9 = $loc_10 = '';
    while ($loc_7 < $loc_5) {$loc_6[$loc_7] = substr($url, ($line + 1) * $loc_7, $line + 1);$loc_7++;}
    $loc_7 = $loc_5;
    while ($loc_7 < $count) {$loc_6[$loc_7] = substr($url, $line * ($loc_7 - $loc_5) + ($line + 1) * $loc_5, $line);$loc_7++;}
    $loc_7 = 0;
    while ($loc_7 < strlen($loc_6[0])) {$loc_10 = 0;while ($loc_10 < count($loc_6)) {$loc_8 .= @$loc_6[$loc_10][$loc_7];$loc_10++;}$loc_7++;}
    $loc_9 = str_replace('^', 0, urldecode($loc_8));
    return $loc_9;
  }
?>