<?php
/**
 * Plugin Name: Bulk Remove Menu Items
 * Plugin URI: 
 * Description: Select and remove many items at once from the built in WordPress menu system.
 * Version: 1.0.0
 * Author: Ryan Welcher
 * Author URI: http://www.ryanwelcher.com
 * Test Domain: brmi
 * Domain Path : /lang
 * License: GPL2
 *
 * Copyright 2014  Ryan Welcher  (email : me@ryanwelcher.com)
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2, as 
 * published by the Free Software Foundation.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

//stop directly accessing this file
defined('ABSPATH') or die("No script kiddies please!");

/**
 * main class
 *
 * 
 */
class RW_Bulk_Remove_Menu_Items {

	/**
	 * Sets up the hooks
	 * @return void
	 */
	public function init() {
		add_filter('wp_edit_nav_menu_walker', array($this, 'filter_wp_edit_nav_menu_walker') );
		add_action('admin_enqueue_scripts', array( $this, 'action_admin_enqueue_scripts') );
	}


	/**
	 * Filter the Walker class that will be used on nav-menus.php admin page
	 * @param  string $walker_class The name of the Walker class to be used
	 * @return string               The name of the Custom Walker class to be used
	 */
	public function filter_wp_edit_nav_menu_walker( $walker_class ) {
		return 'Walker_Nav_Menu_Edit_Advanced';
	}


	/**
	 * Loads our scripts ony on the nav-menus.php page
	 *
	 * Looks for SCRIPT_DEBUG to allow for proper debugging if needed.
	 * 
	 * @param  string $hook The name of the admin page file
	 * @return void
	 */
	public function action_admin_enqueue_scripts( $hook ) {
		if('nav-menus.php' == $hook) {
			$path = ( defined( 'SCRIPT_DEBUG') && SCRIPT_DEBUG ) ? plugin_dir_url( __FILE__ ) . '/js/brmi-admin.js' : plugin_dir_url( __FILE__ ) . '/js/brmi-admin.min.js';
			wp_enqueue_script( 'awpm_admin_scripts', $path );
			wp_localize_script( 'awpm_admin_scripts', 'BRMI_TEXTS', array( 'button_text' => __('Remove Menu Items','brmi') ) );
		}
	}
}


$rw_bulk_remove_items = new RW_Bulk_Remove_Menu_Items();
$rw_bulk_remove_items->init();

require plugin_dir_path( __FILE__ ) . 'classes/class-walker-nav-menu-edit-advanced.php';