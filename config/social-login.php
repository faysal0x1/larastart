<?php


return [
	'enabled' => env('SOCIAL_LOGIN_ENABLED', true),

	'providers' => [
		'google' => [
			'enabled' => env('GOOGLE_LOGIN_ENABLED', true),
			'client_id' => env('GOOGLE_CLIENT_ID'),
			'client_secret' => env('GOOGLE_CLIENT_SECRET'),
			'redirect' => env('APP_URL') . '/auth/google/callback',
		],
		'facebook' => [
			'enabled' => env('FACEBOOK_LOGIN_ENABLED', true),
			'client_id' => env('FACEBOOK_CLIENT_ID'),
			'client_secret' => env('FACEBOOK_CLIENT_SECRET'),
			'redirect' => env('APP_URL') . '/auth/facebook/callback',
		],
		'github' => [
			'enabled' => env('GITHUB_LOGIN_ENABLED', true),
			'client_id' => env('GITHUB_CLIENT_ID'),
			'client_secret' => env('GITHUB_CLIENT_SECRET'),
			'redirect' => env('APP_URL') . '/auth/github/callback',
		],
	],
];