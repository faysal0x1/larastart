<?php
namespace App\Enums;

enum PaymentMethodConfig: string {
case BKASH   = 'bkash';
case OPAY    = 'opay';
case UPI     = 'upi';
case EASY_PAISA = 'easy_paisa';
case PIX     = 'pix';
case GOPAY     = 'gopay';

case USDT    = 'usdt';
case LTC     = 'ltc';
case TRX     = 'trx';
case Binance = 'binance';
case Bybit   = 'bybit';

    public function getConfig(): array {
        return match ($this) {
            self::BKASH => [
                'id'           => 'bkash',
                'name'         => 'bKash',
                'icon'         => 'Smartphone',
                'color'        => 'bg-pink-500',
                'category'     => 'Mobile Banking',
                'recipient'    => [
                    'number' => '01736311865',
                    'name'   => 'Agent Account',
                    'type'   => 'Agent',
                ],
                'instructions' => [
                    'Open bKash app or dial *247#',
                    'Select \'Cash Out\'',
                    'Enter Agent number: 01736311865',
                    'Enter the BDT amount shown',
                    'Enter your bKash PIN to confirm',
                    'Save the transaction ID from SMS',
                ],
                'fields'       => [
                    [
                        'name'        => 'sender_number',
                        'label'       => 'Your bKash Number',
                        'type'        => 'text',
                        'placeholder' => '01XXXXXXXXX',
                        'required'    => true,
                    ],
                    [
                        'name'        => 'transaction_id',
                        'label'       => 'Transaction ID',
                        'type'        => 'text',
                        'placeholder' => 'Enter TrxID from SMS',
                        'required'    => true,
                    ],
                    [
                        'name'        => 'amount_sent',
                        'label'       => 'Amount Sent (BDT)',
                        'type'        => 'number',
                        'placeholder' => 'Amount in BDT',
                        'required'    => true,
                    ],
                ],
            ],

            self::OPAY => [
                'id'           => 'opay',
                'name'         => 'Opay',
                'icon'         => 'Smartphone',
                'color'        => 'bg-orange-500',
                'category'     => 'Mobile Banking',
                'recipient'    => [
                    'number' => '7010332671',
                    'name'   => 'Plampay',
                    'type'   => 'Merchant',
                ],
                'instructions' => [
                    'Open your opay app',
                    'Then select send money/Transfer',
                    'Enter this opay number : 7010332671',
                    'Select plampay',
                    'Enter amount and confirm transaction',
                    'Once transfer is successful. You will get a notification in your app and save this.',
                ],

            ],

            self::UPI => [
                'id'           => 'upi',
                'name'         => 'Upi',
                'icon'         => 'Smartphone',
                'color'        => 'bg-red-500',
                'category'     => 'Mobile Banking',
                'recipient'    => [
                    'number' => '********',
                    'name'   => 'UPI',
                    'type'   => 'Agent',
                ],
                'instructions' => [
                    'Comming Soon',
                ],

            ],

            // land mark

            self::EASY_PAISA => [
                'id'           => 'easy_paisa',
                'name'         => 'Easy Paisa',
                'icon'         => 'Smartphone',
                'color'        => 'bg-red-500',
                'category'     => 'Mobile Banking',
                'recipient'    => [
                    'number' => '********',
                    'name'   => 'Easy Paisa',
                    'type'   => 'Agent',
                ],
                'instructions' => [
                    'Comming Soon',
                ],

            ],

            self::PIX  => [
                'id'           => 'pix',
                'name'         => 'Pix',
                'icon'         => 'Smartphone',
                'color'        => 'bg-purple-500',
                'category'     => 'Mobile Banking',
                'recipient'    => [
                    'number' => '********',
                    'name'   => 'PIX',
                    'type'   => 'Agent',
                ],
                'instructions' => [
                    'Comming Soon',
                ],

            ],
            
            self::GOPAY => [
                'id'           => 'gopay',
                'name'         => 'Gopay',
                'icon'         => 'Smartphone',
                'color'        => 'bg-red-500',
                'category'     => 'Mobile Banking',
                'recipient'    => [
                    'number' => '********',
                    'name'   => 'Gopay',
                    'type'   => 'Agent',
                ],
                'instructions' => [
                    'Comming Soon',
                ],

            ], 
            
            

            // End Land Mark

            self::USDT    => [
                'id'           => 'usdt',
                'name'         => 'USDT',
                'icon'         => 'Coins',
                'color'        => 'bg-green-600',
                'category'     => 'Crypto',
                'recipient'    => [
                    'network' => 'BSC (BEP20) / ETH (ERC20)',
                    'address' => '0xbd3ec6f5d1f15c24af08a45e0a8b285b2bcf1570',
                    'name'    => 'USDT Wallet',
                    'type'    => 'Cryptocurrency',
                ],
                'instructions' => [
                    'Open your crypto wallet (Binance, Bybit, etc.)',
                    'Select USDT as the cryptocurrency',
                    'Choose BSC (BEP20) or ETH (ERC20) network',
                    'Enter the wallet address: 0xbd3ec6f5d1f15c24af08a45e0a8b285b2bcf1570',
                    'Enter the USD amount shown',
                    'Confirm the transaction and save the transaction ID',
                ],
                'fields'       => [
                    [
                        'name'        => 'transaction_id',
                        'label'       => 'Transaction ID',
                        'type'        => 'text',
                        'placeholder' => 'Enter crypto transaction hash',
                        'required'    => true,
                    ],
                    [
                        'name'        => 'network_used',
                        'label'       => 'Network Used',
                        'type'        => 'select',
                        'placeholder' => 'Select network',
                        'required'    => true,
                        'options'     => [
                            ['value' => 'bsc', 'label' => 'BSC (BEP20)'],
                            ['value' => 'eth', 'label' => 'ETH (ERC20)'],
                        ],
                    ],
                    // [
                    //     'name'        => 'wallet_type',
                    //     'label'       => 'Wallet Used',
                    //     'type'        => 'text',
                    //     'placeholder' => 'e.g., Binance, Bybit, etc.',
                    //     'required'    => true,
                    // ],
                ],
            ],

            self::LTC     => [
                'id'           => 'ltc',
                'name'         => 'LTC',
                'icon'         => 'Coins',
                'color'        => 'bg-gray-600',
                'category'     => 'Crypto',
                'recipient'    => [
                    'network' => 'LTC',
                    'address' => 'LREypeCMqvKjD6awimbmSLSaBRkjGnxkTf',
                    'name'    => 'LTC Wallet',
                    'type'    => 'Cryptocurrency',
                ],
                'instructions' => [
                    'Open your crypto wallet (Binance, Bybit, etc.)',
                    'Select LTC (Litecoin) as the cryptocurrency',
                    'Enter the wallet address: LREypeCMqvKjD6awimbmSLSaBRkjGnxkTf',
                    'Enter the USD amount shown',
                    'Confirm the transaction and save the transaction ID',
                ],
                'fields'       => [
                    [
                        'name'        => 'transaction_id',
                        'label'       => 'Transaction ID',
                        'type'        => 'text',
                        'placeholder' => 'Enter crypto transaction hash',
                        'required'    => true,
                    ],
                    // [
                    //     'name'        => 'amount',
                    //     'label'       => 'Amount Sent',
                    //     'type'        => 'number',
                    //     'placeholder' => 'Enter your sent amount',
                    //     'required'    => true,
                    // ],

                ],
            ],

            self::TRX     => [
                'id'           => 'trx',
                'name'         => 'TRX',
                'icon'         => 'Coins',
                'color'        => 'bg-red-600',
                'category'     => 'Crypto',
                'recipient'    => [
                    'network' => 'Tron (TRC20)',
                    'address' => 'TLNcrELaRaBvncysdaVXVnJ6z5FUVNJ7Dx',
                    'name'    => 'TRX Wallet',
                    'type'    => 'Cryptocurrency',
                ],
                'instructions' => [
                    'Open your crypto wallet (Binance, Bybit, etc.)',
                    'Select TRX (Tron) as the cryptocurrency',
                    'Choose Tron (TRC20) network',
                    'Enter the wallet address: TLNcrELaRaBvncysdaVXVnJ6z5FUVNJ7Dx',
                    'Enter the USD amount shown',
                    'Confirm the transaction and save the transaction ID',
                ],
                'fields'       => [
                    [
                        'name'        => 'transaction_id',
                        'label'       => 'Transaction ID',
                        'type'        => 'text',
                        'placeholder' => 'Enter crypto transaction hash',
                        'required'    => true,
                    ],
                    //    [
                    //         'name'        => 'amount',
                    //         'label'       => 'Amount Sent',
                    //         'type'        => 'number',
                    //         'placeholder' => 'Enter your sent amount',
                    //         'required'    => true,
                    //     ],
                ],
            ],

            self::Binance => [
                'id'           => 'binance',
                'name'         => 'Binance',
                'icon'         => 'Coins',
                'color'        => 'bg-red-600',
                'category'     => 'Crypto',
                'recipient'    => [

                    'number' => '153300608',
                    'name'   => 'Binnance',
                    'type'   => 'Cryptocurrency',
                ],

                'instructions' => [
                    'Open your binance account ',
                    'Enter the binance id: 153300608',
                    'Select usdt',
                    'Enter the usdt amount',
                    'Confirm the transaction and save the order id.',

                ],
                'fields'       => [
                    
                    [
                        'name'        => 'order_id',
                        'label'       => 'Order Id',
                        'type'        => 'number',
                        'placeholder' => 'Enter your order Id',
                        'required'    => true,
                    ],
                ],
            ],

            self::Bybit   => [
                'id'           => 'bybit',
                'name'         => 'Bybit',
                'icon'         => 'Coins',
                'color'        => 'bg-red-600',
                'category'     => 'Crypto',
                'recipient'    => [

                    'number' => '220928117',
                    'name'   => 'ByBit',
                    'type'   => 'Cryptocurrency',
                ],
                'instructions' => [
                    'Open your bybit account',
                    'Select Internal transfer',
                    'Enter the bybit Uid : 220928117',
                    'Enter the usdt amount Shown',
                    'Confirm the transaction and save the transaction hash',

                ],
                'fields'       => [
                    [
                        'name'        => 'transaction_id',
                        'label'       => 'Transaction hash',
                        'type'        => 'text',
                        'placeholder' => 'Enter crypto transaction hash',
                        'required'    => true,
                    ],

                ],
            ],
        };
    }

    public static function getAll(): array {
        $methods = [];
        foreach (self::cases() as $case) {
            $methods[$case->value] = $case->getConfig();
        }
        return $methods;
    }

    public static function getPopular(): array {
        // Return popular payment methods (customize as needed)
        $popular = [self::BKASH, self::OPAY, self::UPI];
        $methods = [];
        foreach ($popular as $case) {
            $methods[$case->value] = $case->getConfig();
        }
        return $methods;
    }

    public static function getByCategory(string $category): array {
        $methods = [];
        foreach (self::cases() as $case) {
            $config = $case->getConfig();
            if ($config['category'] === $category) {
                $methods[$case->value] = $config;
            }
        }
        return $methods;
    }

    public function isPopular(): bool {
        return in_array($this, [self::BKASH, self::OPAY, self::UPI]);
    }
}
