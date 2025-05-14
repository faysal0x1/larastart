<?php

/**
 * Helper functions for client detection
 *
 * This file contains functions to detect client IP address, browser, operating system,
 * device information, and other client-related data.
 */

if (!function_exists('get_client_ip')) {
	/**
	 * Get the client's real IP address by checking various server variables
	 *
	 * @return string The client's IP address or 'UNKNOWN'
	 */
	function get_client_ip() {
		$ipaddress = '';
		if (isset($_SERVER['HTTP_CLIENT_IP']))
			$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
		else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
		else if (isset($_SERVER['HTTP_X_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
		else if (isset($_SERVER['HTTP_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
		else if (isset($_SERVER['HTTP_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_FORWARDED'];
		else if (isset($_SERVER['REMOTE_ADDR']))
			$ipaddress = $_SERVER['REMOTE_ADDR'];
		else
			$ipaddress = 'UNKNOWN';

		// Handle comma-separated IPs (from proxies)
		if (strpos($ipaddress, ',') !== false) {
			$ipaddress = trim(explode(',', $ipaddress)[0]);
		}

		return $ipaddress;
	}
}

if (!function_exists('get_client_browser')) {
	/**
	 * Get the client's browser information
	 *
	 * @return string The client's browser user agent or 'UNKNOWN'
	 */
	function get_client_browser() {
		$browser = '';
		if (isset($_SERVER['HTTP_USER_AGENT']))
			$browser = $_SERVER['HTTP_USER_AGENT'];
		else
			$browser = 'UNKNOWN';
		return $browser;
	}
}

if (!function_exists('get_client_os')) {
	/**
	 * Get the client's operating system information
	 *
	 * @return string The client's operating system or 'UNKNOWN'
	 */
	function get_client_os() {
		$os = '';
		if (isset($_SERVER['HTTP_USER_AGENT']))
			$os = $_SERVER['HTTP_USER_AGENT'];
		else
			$os = 'UNKNOWN';
		return $os;
	}
}

if (!function_exists('get_client_device_type')) {
	/**
	 * Determine the client's device type (mobile, tablet, desktop)
	 *
	 * @return string The client's device type
	 */
	function get_client_device_type() {
		$userAgent = get_client_browser();

		$mobileKeywords = [
			'Android', 'iPhone', 'iPod', 'webOS', 'BlackBerry', 'Windows Phone', 'Opera Mini',
			'IEMobile', 'Mobile', 'Smartphone', 'PalmSource', 'PalmOS', 'Symbian', 'SymbianOS',
			'SymbOS', 'SonyEricsson', 'Nokia', 'MOT-', 'SAMSUNG', 'Samsung', 'SAMSUNG-', 'SEC-',
			'LG-', 'LGE-', 'LGMS', 'HTC_', 'HTC/', 'HTC ', 'hiptop', 'avantgo'
		];

		$tabletKeywords = [
			'iPad', 'Tablet', 'PlayBook', 'Xoom', 'Kindle', 'SM-T', 'GT-P', 'Nexus 7',
			'Nexus 10', 'KFAPWI', 'RCT6', 'MediaPad'
		];

		// Check if mobile
		foreach ($mobileKeywords as $keyword) {
			if (stripos($userAgent, $keyword) !== false) {
				// Check if it's a tablet (some tablets have mobile keywords)
				foreach ($tabletKeywords as $tabletKeyword) {
					if (stripos($userAgent, $tabletKeyword) !== false) {
						return 'tablet';
					}
				}
				return 'mobile';
			}
		}

		// Check if tablet
		foreach ($tabletKeywords as $keyword) {
			if (stripos($userAgent, $keyword) !== false) {
				return 'tablet';
			}
		}

		// Default to desktop
		return 'desktop';
	}
}

if (!function_exists('get_client_os_details')) {
	/**
	 * Get more detailed information about the client's operating system
	 *
	 * @return array An array containing the OS name and version
	 */
	function get_client_os_details() {
		$userAgent = get_client_browser();
		$osArray = [
			'/windows nt 10/i'      => 'Windows 10',
			'/windows nt 6.3/i'     => 'Windows 8.1',
			'/windows nt 6.2/i'     => 'Windows 8',
			'/windows nt 6.1/i'     => 'Windows 7',
			'/windows nt 6.0/i'     => 'Windows Vista',
			'/windows nt 5.2/i'     => 'Windows Server 2003/XP x64',
			'/windows nt 5.1/i'     => 'Windows XP',
			'/windows xp/i'         => 'Windows XP',
			'/windows nt 5.0/i'     => 'Windows 2000',
			'/windows me/i'         => 'Windows ME',
			'/win98/i'              => 'Windows 98',
			'/win95/i'              => 'Windows 95',
			'/win16/i'              => 'Windows 3.11',
			'/macintosh|mac os x/i' => 'Mac OS X',
			'/mac_powerpc/i'        => 'Mac OS 9',
			'/linux/i'              => 'Linux',
			'/ubuntu/i'             => 'Ubuntu',
			'/iphone/i'             => 'iPhone',
			'/ipod/i'               => 'iPod',
			'/ipad/i'               => 'iPad',
			'/android/i'            => 'Android',
			'/blackberry/i'         => 'BlackBerry',
			'/webos/i'              => 'Mobile'
		];

		$osName = 'Unknown OS';
		foreach ($osArray as $regex => $value) {
			if (preg_match($regex, $userAgent)) {
				$osName = $value;
				break;
			}
		}

		// Try to detect version for some common operating systems
		$version = '';
		if (strpos($osName, 'Android') !== false) {
			preg_match('/Android\s([0-9\.]+)/i', $userAgent, $matches);
			if (isset($matches[1])) {
				$version = $matches[1];
			}
		} elseif (strpos($osName, 'Mac OS X') !== false) {
			preg_match('/Mac OS X\s([0-9_\.]+)/i', $userAgent, $matches);
			if (isset($matches[1])) {
				$version = str_replace('_', '.', $matches[1]);
			}
		} elseif (strpos($osName, 'iPhone') !== false || strpos($osName, 'iPad') !== false || strpos($osName, 'iPod') !== false) {
			preg_match('/OS\s([0-9_\.]+)/i', $userAgent, $matches);
			if (isset($matches[1])) {
				$version = str_replace('_', '.', $matches[1]);
			}
		}

		return [
			'name' => $osName,
			'version' => $version
		];
	}
}

if (!function_exists('get_client_browser_details')) {
	/**
	 * Get detailed information about the client's browser
	 *
	 * @return array An array containing the browser name and version
	 */
	function get_client_browser_details() {
		$userAgent = get_client_browser();
		$browserArray = [
			'/msie/i'       => 'Internet Explorer',
			'/edge/i'       => 'Edge',
			'/edg/i'        => 'Edge',
			'/firefox/i'    => 'Firefox',
			'/safari/i'     => 'Safari',
			'/chrome/i'     => 'Chrome',
			'/opera/i'      => 'Opera',
			'/opr/i'        => 'Opera',
			'/netscape/i'   => 'Netscape',
			'/maxthon/i'    => 'Maxthon',
			'/konqueror/i'  => 'Konqueror',
			'/mobile/i'     => 'Mobile Browser'
		];

		$browserName = 'Unknown Browser';
		foreach ($browserArray as $regex => $value) {
			if (preg_match($regex, $userAgent)) {
				$browserName = $value;
				break;
			}
		}

		// Try to detect version
		$version = '';
		if (preg_match('/MSIE\s([0-9\.]+)/i', $userAgent, $matches)) {
			$version = $matches[1];
		} elseif (preg_match('/Edge\/([0-9\.]+)/i', $userAgent, $matches)) {
			$version = $matches[1];
		} elseif (preg_match('/Edg\/([0-9\.]+)/i', $userAgent, $matches)) {
			$version = $matches[1];
		} elseif (preg_match('/Firefox\/([0-9\.]+)/i', $userAgent, $matches)) {
			$version = $matches[1];
		} elseif (preg_match('/Chrome\/([0-9\.]+)/i', $userAgent, $matches)) {
			$version = $matches[1];
		} elseif (preg_match('/Safari\/([0-9\.]+)/i', $userAgent, $matches)) {
			$version = $matches[1];
		} elseif (preg_match('/Opera[\s\/]([0-9\.]+)/i', $userAgent, $matches)) {
			$version = $matches[1];
		} elseif (preg_match('/OPR\/([0-9\.]+)/i', $userAgent, $matches)) {
			$version = $matches[1];
		}

		return [
			'name' => $browserName,
			'version' => $version
		];
	}
}

if (!function_exists('get_client_full_details')) {
	/**
	 * Get comprehensive client information in a structured format
	 *
	 * @return array All client details including IP, browser, OS, and device type
	 */
	function get_client_full_details() {
		$browser = get_client_browser_details();
		$os = get_client_os_details();

		return [
			'ip' => get_client_ip(),
			'user_agent' => get_client_browser(),
			'browser' => [
				'name' => $browser['name'],
				'version' => $browser['version'],
			],
			'os' => [
				'name' => $os['name'],
				'version' => $os['version'],
			],
			'device_type' => get_client_device_type(),
			'time' => date('Y-m-d H:i:s'),
		];
	}
}