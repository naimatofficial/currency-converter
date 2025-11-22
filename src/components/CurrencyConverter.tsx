/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback } from 'react';
import { useCurrency } from '../hooks/useCurrency';
import { CurrencyCard } from './CurrencyCard';

export const CurrencyConverter: React.FC = () => {
	const { rates, currencies, loading, error, convertCurrency, refreshRates } =
		useCurrency();

	const [fromAmount, setFromAmount] = useState<number>(1);
	const [toAmount, setToAmount] = useState<number>(0);
	const [fromCurrency, setFromCurrency] = useState<string>('USD');
	const [toCurrency, setToCurrency] = useState<string>('EUR');
	const [lastChanged, setLastChanged] = useState<'from' | 'to'>('from');

	const updateConversion = useCallback(() => {
		if (!rates[fromCurrency] || !rates[toCurrency]) return;

		if (lastChanged === 'from') {
			const converted = convertCurrency(fromAmount, fromCurrency, toCurrency);
			setToAmount(converted);
		} else {
			const converted = convertCurrency(toAmount, toCurrency, fromCurrency);
			setFromAmount(converted);
		}
	}, [
		fromAmount,
		toAmount,
		fromCurrency,
		toCurrency,
		lastChanged,
		rates,
		convertCurrency,
	]);

	useEffect(() => {
		if (currencies.length > 0) {
			if (!currencies.includes(fromCurrency)) setFromCurrency(currencies[0]);
			if (!currencies.includes(toCurrency))
				setToCurrency(currencies[1] || currencies[0]);
		}
	}, [currencies, fromCurrency, toCurrency]);

	useEffect(() => {
		updateConversion();
	}, [updateConversion]);

	const handleFromAmountChange = (amount: number) => {
		setFromAmount(amount);
		setLastChanged('from');
	};

	const handleToAmountChange = (amount: number) => {
		setToAmount(amount);
		setLastChanged('to');
	};

	const handleFromCurrencyChange = (currency: string) => {
		setFromCurrency(currency);
		setLastChanged('from');
	};

	const handleToCurrencyChange = (currency: string) => {
		setToCurrency(currency);
		setLastChanged('to');
	};

	const swapCurrencies = () => {
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);
		setLastChanged('from');
	};

	if (loading && currencies.length === 0) {
		return (
			<div className='converter-container'>
				<div className='loading'>Loading currencies...</div>
			</div>
		);
	}

	return (
		<div className='container'>
			<div className='converter-header'>
				<h1>💱 Currency Converter</h1>
				{/* <button
					onClick={refreshRates}
					className='refresh-btn'
					disabled={loading}
				>
					{loading ? 'Refreshing...' : '🔄 Refresh'}
				</button> */}
			</div>

			{error && <div className='error-message'>⚠️ {error}</div>}

			<div className='converter-content'>
				<CurrencyCard
					amount={fromAmount}
					currency={fromCurrency}
					onAmountChange={handleFromAmountChange}
					onCurrencyChange={handleFromCurrencyChange}
					currencies={currencies}
					label='From'
				/>

				<div className='swap-container'>
					<button
						onClick={swapCurrencies}
						className='swap-btn'
						title='Swap currencies'
					>
						⇅
					</button>
				</div>

				<CurrencyCard
					amount={toAmount}
					currency={toCurrency}
					onAmountChange={handleToAmountChange}
					onCurrencyChange={handleToCurrencyChange}
					currencies={currencies}
					label='To'
				/>
			</div>

			{rates[fromCurrency] && rates[toCurrency] && (
				<div className='conversion-rate'>
					1 {fromCurrency} = {convertCurrency(1, fromCurrency, toCurrency)}{' '}
					{toCurrency}
				</div>
			)}
		</div>
	);
};
