<?php
/**
 * Plugin Name: Floating Window Music-Player
 * Plugin URI:  http://eric.cn.com/?p=1187
 * Text Domain: floating-window-music-player
 * Domain Path: /languages
 * Version:     3.0.5
 * Author:      Eric
 * Author URI:  http://eric.cn.com/
 * Description: The plug-in supports Netease, QQ, Xiami and Baidu Music online playing. This plug-in is based on the NC code-based suspension player plug-in core code enhancement, since the preparation of access to music website songs, lyrics and change the lyrics background color API interface. Increase in the original basis of support Netease cloud music features: support QQ music; support Xiami music; support Baidu music; expanded player when open and automatically hide after a delay; switch of automatically hidden time; switch of album randomly; switch of loading icon; switch of allowing the mobile terminal play; switch of integrated anti-AJAX refresh; switch of JQuery library based; button of change player source; button of maximum volume & mute; button of view album cover; button of pre / next album; button of singles Loop; player font with the song cover into a contrasting color; custom CSS; button of fast forward / rewind; support for language localization.
 */

define('Fwm_Player_URL', plugins_url('', __FILE__));
define('Fwm_Player_PATH', dirname(__FILE__));
define('Fwm_Player_VER', '3.0.5');
define('FwmTD', 'floating-window-music-player');
require Fwm_Player_PATH . '/inc/option.php';
require Fwm_Player_PATH . '/inc/API.php';
add_action('wp_footer', 'Fwm_Player_footer');
register_activation_hook(__FILE__, 'Fwm_Player_plugin_activate');
add_action('admin_init', 'Fwm_Player_plugin_redirect');
function Fwm_Player_plugin_activate() {add_option('Fwm_Player_do_activation_redirect', true);}
function Fwm_Player_plugin_redirect() {
    if (get_option('Fwm_Player_do_activation_redirect', false)) {
        delete_option('Fwm_Player_do_activation_redirect');
        wp_redirect(admin_url('admin.php?page=Fwm_Player_options'));
    }
}
add_action( 'init', 'myplugin_load_textdomain' );
function myplugin_load_textdomain() { load_plugin_textdomain( FwmTD, false, dirname( plugin_basename( __FILE__ ) ) . '/languages' ); }
function Fwm_addPluginLinks($links, $file) {
    $file == plugin_basename(__FILE__) && array_unshift($links, '<a href="options-general.php?page=Fwm_Player_options">'.__('Setting',FwmTD).'</a>');
    return $links;
}
add_filter('plugin_action_links', 'Fwm_addPluginLinks', 10, 2);