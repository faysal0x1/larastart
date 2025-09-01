<?php
//
//declare (strict_types = 1);
//
//namespace App\Traits;
//
//use Bavix\Wallet\External\Contracts\ExtraDtoInterface;
//use Bavix\Wallet\Interfaces\Wallet;
//use Bavix\Wallet\Internal\Exceptions\ExceptionInterface;
//use Bavix\Wallet\Models\Transaction;
//use Bavix\Wallet\Models\Transfer;
//use Bavix\Wallet\Services\AtomicServiceInterface;
//use Bavix\Wallet\Services\ConsistencyServiceInterface;
//use Bavix\Wallet\Services\PrepareServiceInterface;
//use Bavix\Wallet\Services\TransactionServiceInterface;
//use Bavix\Wallet\Services\TransferServiceInterface;
//use Bavix\Wallet\Traits\HasWallet;
//
///**
// * Trait HasFloatWallet.
// *
// * Extends the HasWallet trait to support float/decimal values.
// * This trait provides methods that accept float values and convert them
// * to the appropriate format for the Laravel Wallet package.
// *
// * @property \Bavix\Wallet\Models\Wallet $wallet
// * @property string $balance
// * @property int $balanceInt
// *
// * @psalm-require-extends \Illuminate\Database\Eloquent\Model
// * @psalm-require-implements \Bavix\Wallet\Interfaces\Wallet
// */
//trait HasFloatWallet
//{
//    use HasWallet;
//
//    /**
//     * Deposit funds into the wallet with float support.
//     *
//     * This method accepts float values and converts them to the appropriate format
//     * for the Laravel Wallet package.
//     *
//     * @param float|int|string $amount The amount to deposit.
//     * @param array<mixed>|null
// $meta Additional metadata for the transaction.
//     * @param bool $confirmed Whether the transaction is confirmed.
//     * @return Transaction The transaction object representing the deposit.
//     *
//     * @throws \Bavix\Wallet\Exceptions\AmountInvalid If the amount is invalid.
//     * @throws \Bavix\Wallet\Internal\Exceptions\RecordsNotFoundException If the wallet is not found.
//     * @throws \Bavix\Wallet\Internal\Exceptions\TransactionFailedException If the transaction fails.
//     * @throws ExceptionInterface If an exception occurs during the transaction process.
//     */
//    public function depositFloat(float | int | string $amount, ?array $meta = null, bool $confirmed = true): Transaction
//    {
//        // Convert float to string to preserve decimal precision
//        $amountString = $this->formatAmountForWallet($amount);
//
//        // Execute the deposit transaction within an atomic block to ensure data consistency.
//        return app(AtomicServiceInterface::class)->block(
//            $this,
//            // Create a new deposit transaction.
//            fn() => app(TransactionServiceInterface::class)
//                ->makeOne($this, Transaction::TYPE_DEPOSIT, $amountString, $meta, $confirmed)
//        );
//    }
//
//    /**
//     * Withdraw funds from the wallet with float support.
//     *
//     * This method accepts float values and converts them to the appropriate format
//     * for the Laravel Wallet package.
//     *
//     * @param float|int|string $amount The amount to withdraw.
//     * @param array<mixed>|null $meta Additional metadata for the transaction.
//     * @param bool $confirmed Whether the withdrawal is confirmed.
//     * @return Transaction The created transaction.
//     *
//     * @throws \Bavix\Wallet\Exceptions\AmountInvalid If the amount is invalid.
//     * @throws \Bavix\Wallet\Exceptions\BalanceIsEmpty If the balance is empty.
//     * @throws \Bavix\Wallet\Exceptions\InsufficientFunds If the amount exceeds the balance.
//     * @throws \Bavix\Wallet\Internal\Exceptions\RecordsNotFoundException If the wallet is not found.
//     * @throws \Bavix\Wallet\Internal\Exceptions\TransactionFailedException If the transaction fails.
//     * @throws ExceptionInterface If an exception occurs.
//     */
//    public function withdrawFloat(float | int | string $amount, ?array $meta = null, bool $confirmed = true): Transaction
//    {
//        // Convert float to string to preserve decimal precision
//        $amountString = $this->formatAmountForWallet($amount);
//
//        // Wrap the withdrawal in an atomic block to ensure consistency and prevent race conditions.
//        return app(AtomicServiceInterface::class)->block($this, function () use (
//            $amountString,
//            $meta,
//            $confirmed
//        ): Transaction {
//            /** @var Wallet $this */
//            // Check if the withdrawal is possible before attempting it.
//            app(ConsistencyServiceInterface::class)->checkPotential($this, $amountString);
//
//            // Perform the withdrawal.
//            return $this->forceWithdraw($amountString, $meta, $confirmed);
//        });
//    }
//
//    /**
//     * Force withdraw funds from the wallet with float support.
//     *
//     * This method creates a new withdrawal transaction and returns it. It wraps the transaction creation
//     * in an atomic block to ensure atomicity and consistency.
//     *
//     * @param float|int|string $amount The amount to withdraw.
//     * @param array<mixed>|null $meta Additional information for the transaction.
//     * @param bool $confirmed Whether the transaction is confirmed. Defaults to true.
//     * @return Transaction The created transaction.
//     *
//     * @throws \Bavix\Wallet\Exceptions\AmountInvalid If the amount is invalid.
//     * @throws \Bavix\Wallet\Internal\Exceptions\RecordsNotFoundException If the wallet is not found.
//     * @throws \Bavix\Wallet\Internal\Exceptions\TransactionFailedException If the transaction fails.
//     * @throws ExceptionInterface If an exception occurs.
//     */
//    public function forceWithdrawFloat(float | int | string $amount, ?array $meta = null, bool $confirmed = true): Transaction
//    {
//        // Convert float to string to preserve decimal precision
//        $amountString = $this->formatAmountForWallet($amount);
//
//        // Wrap the transaction creation in an atomic block to ensure atomicity and consistency.
//        return app(AtomicServiceInterface::class)->block(
//            $this,
//            function () use ($amountString, $meta, $confirmed): Transaction {
//                // Create a new withdrawal transaction.
//                return app(TransactionServiceInterface::class)->makeOne(
//                    $this,
//                    Transaction::TYPE_WITHDRAW,
//                    $amountString,
//                    $meta,
//                    $confirmed
//                );
//            }
//        );
//    }
//
//    /**
//     * Transfer funds to another wallet with float support.
//     *
//     * This method attempts to transfer funds from the host wallet to another wallet.
//     * It uses the AtomicServiceInterface to ensure atomicity and consistency of the transfer.
//     * The ConsistencyServiceInterface is used to check if the transfer is possible before attempting it.
//     *
//     * @param Wallet $wallet The wallet to transfer funds to.
//     * @param float|int|string $amount The amount to transfer.
//     * @param ExtraDtoInterface|array<mixed>|null $meta Additional information for the transaction.
//     * @return Transfer The created transaction.
//     *
//     * @throws \Bavix\Wallet\Exceptions\AmountInvalid If the amount is invalid.
//     * @throws \Bavix\Wallet\Exceptions\BalanceIsEmpty If the balance is empty.
//     * @throws \Bavix\Wallet\Exceptions\InsufficientFunds If the amount exceeds the balance.
//     * @throws \Bavix\Wallet\Internal\Exceptions\RecordsNotFoundException If the wallet is not found.
//     * @throws \Bavix\Wallet\Internal\Exceptions\TransactionFailedException If the transaction fails.
//     * @throws ExceptionInterface If an exception occurs.
//     */
//    public function transferFloat(Wallet $wallet, float | int | string $amount, ExtraDtoInterface | array | null $meta = null): Transfer
//    {
//        // Convert float to string to preserve decimal precision
//        $amountString = $this->formatAmountForWallet($amount);
//
//        // Wrap the transfer in an atomic block to ensure consistency and prevent race conditions.
//        return app(AtomicServiceInterface::class)->block($this, function () use ($wallet, $amountString, $meta): Transfer {
//            /** @var Wallet $this */
//            // Check if the transfer is possible before attempting it.
//            app(ConsistencyServiceInterface::class)->checkPotential($this, $amountString);
//
//            // Perform the transfer.
//            return $this->forceTransfer($wallet, $amountString, $meta);
//        });
//    }
//
//    /**
//     * Force transfer funds to another wallet with float support.
//     *
//     * This method is intended for use in scenarios where a transfer must be completed regardless of
//     * the usual validation checks (e.g., sufficient funds, wallet status). It is critical to use this
//     * method with caution as it can result in negative balances or other unintended consequences.
//     *
//     * @param Wallet $wallet The wallet to transfer funds to.
//     * @param float|int|string $amount The amount to transfer.
//     * @param ExtraDtoInterface|array<mixed>|null $meta Additional information for the transaction.
//     * @return Transfer The created transfer.
//     *
//     * @throws \Bavix\Wallet\Exceptions\AmountInvalid If the amount is invalid.
//     * @throws \Bavix\Wallet\Internal\Exceptions\RecordsNotFoundException If the wallet is not found.
//     * @throws \Bavix\Wallet\Internal\Exceptions\TransactionFailedException If the transaction fails.
//     * @throws ExceptionInterface If an exception occurs.
//     */
//    public function forceTransferFloat(Wallet $wallet, float | int | string $amount, ExtraDtoInterface | array | null $meta = null): Transfer
//    {
//        // Convert float to string to preserve decimal precision
//        $amountString = $this->formatAmountForWallet($amount);
//
//        // Wrap the transfer creation in an atomic block to ensure atomicity and consistency.
//        return app(AtomicServiceInterface::class)->block($this, function () use ($wallet, $amountString, $meta): Transfer {
//            // Create a new transfer transaction.
//            $transferLazyDto = app(PrepareServiceInterface::class)
//                ->transferLazy($this, $wallet, Transfer::STATUS_TRANSFER, $amountString, $meta);
//
//            // Apply the transfer transaction.
//            $transfers = app(TransferServiceInterface::class)->apply([$transferLazyDto]);
//
//            return current($transfers);
//        });
//    }
//
//    /**
//     * Safe transfer funds to another wallet with float support.
//     *
//     * This method attempts to transfer funds from this wallet to another wallet.
//     * If an error occurs during the process, null is returned.
//     *
//     * @param Wallet $wallet The wallet to transfer funds to.
//     * @param float|int|string $amount The amount to transfer.
//     * @param ExtraDtoInterface|array<mixed>|null $meta Additional information for the transaction.
//     * @return null|Transfer The created transaction, or null if an error occurred.
//     *
//     * @throws \Bavix\Wallet\Exceptions\AmountInvalid If the amount is invalid.
//     * @throws \Bavix\Wallet\Exceptions\BalanceIsEmpty If the balance is empty.
//     * @throws \Bavix\Wallet\Exceptions\InsufficientFunds If the amount exceeds the balance.
//     * @throws \Bavix\Wallet\Internal\Exceptions\RecordsNotFoundException If the wallet is not found.
//     * @throws \Bavix\Wallet\Internal\Exceptions\TransactionFailedException If the transaction fails.
//     * @throws ExceptionInterface If an exception occurs.
//     */
//    public function safeTransferFloat(Wallet $wallet, float | int | string $amount, ExtraDtoInterface | array | null $meta = null): ?Transfer
//    {
//        try {
//            return $this->transferFloat($wallet, $amount, $meta);
//        } catch (ExceptionInterface $e) {
//            return null;
//        }
//    }
//
//    /**
//     * Check if the user can withdraw funds based on the provided amount with float support.
//     *
//     * This method retrieves the math service instance and calculates the total balance of the wallet.
//     * It then checks if the withdrawal is possible using the consistency service.
//     *
//     * @param float|int|string $amount The amount to be withdrawn.
//     * @param bool $allowZero Flag to allow zero balance for withdrawal. Defaults to false.
//     * @return bool Returns true if the withdrawal is possible; otherwise, false.
//     */
//    public function canWithdrawFloat(float | int | string $amount, bool $allowZero = false): bool
//    {
//        // Convert float to string to preserve decimal precision
//        $amountString = $this->formatAmountForWallet($amount);
//
//        // Get the math service instance.
//        $mathService = app(\Bavix\Wallet\Internal\Service\MathServiceInterface::class);
//
//        // Get the wallet and calculate the total balance.
//        $wallet  = app(\Bavix\Wallet\Services\CastServiceInterface::class)->getWallet($this);
//        $balance = $mathService->add($this->getBalanceAttribute(), $wallet->getCreditAttribute());
//
//        // Check if the withdrawal is possible.
//        return app(ConsistencyServiceInterface::class)
//            ->canWithdraw($balance, $amountString, $allowZero);
//    }
//
//    /**
//     * Format amount for wallet operations.
//     *
//     * This method converts float, int, or string amounts to the appropriate format
//     * for the Laravel Wallet package. It ensures that decimal precision is preserved.
//     *
//     * @param float|int|string $amount The amount to format.
//     * @return string The formatted amount as a string.
//     */
//    protected function formatAmountForWallet(float | int | string $amount): string
//    {
//        // If it's already a string, return as is
//        if (is_string($amount)) {
//            return $amount;
//        }
//
//        // Use number_format to ensure proper decimal precision
//        // This prevents floating point precision issues
//        return number_format($amount, 4, '.', '');
//    }
//}
