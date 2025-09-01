<?php
namespace App\Enums;

enum PaymentMethod: string
{
	case CREDIT_CARD = 'credit_card';
	case PAYPAL = 'paypal';
	case BANK_TRANSFER = 'bank_transfer';
	case CRYPTO = 'crypto';
	case SKRILL = 'skrill';
	case NETELLER = 'neteller';
	case VENMO = 'venmo';
	case CASHAPP = 'cashapp';

	public function getDisplayName(): string
	{
		return match($this) {
			self::CREDIT_CARD => 'Credit/Debit Card',
			self::PAYPAL => 'PayPal',
			self::BANK_TRANSFER => 'Bank Transfer',
			self::CRYPTO => 'Cryptocurrency',
			self::SKRILL => 'Skrill',
			self::NETELLER => 'Neteller',
			self::VENMO => 'Venmo',
			self::CASHAPP => 'Cash App',
		};
	}

	public function getIcon(): string
	{
		return match($this) {
			self::CREDIT_CARD => 'credit-card', // Lucide icon name
			self::PAYPAL => '/paypal.svg',
			self::BANK_TRANSFER => 'banknote', // Lucide icon name
			self::CRYPTO => '/crypto.svg',
			self::SKRILL => '/skrill.svg',
			self::NETELLER => '/neteller.svg',
			self::VENMO => '/venmo.svg',
			self::CASHAPP => '/cashapp.svg',
		};
	}

	public function isLucideIcon(): bool
	{
		return in_array($this, [self::CREDIT_CARD, self::BANK_TRANSFER]);
	}

	public static function getAll(): array
	{
		return array_map(function($case) {
			return [
				'id' => $case->value,
				'name' => $case->getDisplayName(),
				'icon' => $case->getIcon(),
				'isLucideIcon' => $case->isLucideIcon()
			];
		}, self::cases());
	}

	public static function getPopular(): array
	{
		$popularMethods = [
			self::CREDIT_CARD,
			self::PAYPAL,
			self::BANK_TRANSFER,
			self::CRYPTO
		];

		return array_map(function($case) {
			return [
				'id' => $case->value,
				'name' => $case->getDisplayName(),
				'icon' => $case->getIcon(),
				'isLucideIcon' => $case->isLucideIcon()
			];
		}, $popularMethods);
	}
}