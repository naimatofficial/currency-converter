import { useState, useEffect, useCallback } from 'react';
import type {
	// CurrencyData,
	CurrencyRate,
	// ConvertedAmount,
} from '../types/currency';

import {
	CURRENCY_API_URL,
	CURRENCY_API_KEY,
	STORAGE_KEYS,
	isCacheValid,
	saveToCache,
	getFromCache,
	roundCurrency,
} from '../utils/currencyUtils';

export const useCurrency = () => {
	const [rates, setRates] = useState<{ [key: string]: CurrencyRate }>({});
	const [currencies, setCurrencies] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchLatestRates = useCallback(
		async (forceRefresh = false): Promise<void> => {
			if (!forceRefresh && isCacheValid()) {
				const cachedRates = getFromCache<{ [key: string]: CurrencyRate }>(
					STORAGE_KEYS.RATES
				);
				const cachedCurrencies = getFromCache<string[]>(
					STORAGE_KEYS.CURRENCIES
				);

				if (cachedRates && cachedCurrencies) {
					setRates(cachedRates);
					setCurrencies(cachedCurrencies);
					return;
				}
			}

			setLoading(true);
			setError(null);

			try {
				const [ratesResponse, currenciesResponse] = await Promise.all([
					fetch(`${CURRENCY_API_URL}/latest?apikey=${CURRENCY_API_KEY}`),
					fetch(`${CURRENCY_API_URL}/currencies?apikey=${CURRENCY_API_KEY}`),
				]);

				if (!ratesResponse.ok || !currenciesResponse.ok) {
					throw new Error('Failed to fetch currency data');
				}

				const ratesData = await ratesResponse.json();
				const currenciesData = await currenciesResponse.json();

				const ratesMap: { [key: string]: CurrencyRate } = {};
				const currencyList: string[] = [];

				// Process rates
				Object.entries(ratesData.data).forEach(
					([code, data]: [string, any]) => {
						ratesMap[code] = {
							code,
							value: data.value,
						};
						currencyList.push(code);
					}
				);

				// Process currencies
				Object.keys(currenciesData.data).forEach((code) => {
					if (!currencyList.includes(code)) {
						currencyList.push(code);
					}
				});

				currencyList.sort();

				setRates(ratesMap);
				setCurrencies(currencyList);

				saveToCache(ratesMap, STORAGE_KEYS.RATES);
				saveToCache(currencyList, STORAGE_KEYS.CURRENCIES);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');

				// Fallback to cache even if expired
				const cachedRates = getFromCache<{ [key: string]: CurrencyRate }>(
					STORAGE_KEYS.RATES
				);
				const cachedCurrencies = getFromCache<string[]>(
					STORAGE_KEYS.CURRENCIES
				);

				if (cachedRates && cachedCurrencies) {
					setRates(cachedRates);
					setCurrencies(cachedCurrencies);
				}
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	const convertCurrency = useCallback(
		(amount: number, fromCurrency: string, toCurrency: string): number => {
			if (!rates[fromCurrency] || !rates[toCurrency]) {
				return amount;
			}

			if (fromCurrency === toCurrency) {
				return roundCurrency(amount);
			}

			// Convert via USD base
			const amountInUSD = amount / rates[fromCurrency].value;
			const convertedAmount = amountInUSD * rates[toCurrency].value;

			return roundCurrency(convertedAmount);
		},
		[rates]
	);

	useEffect(() => {
		fetchLatestRates();
	}, [fetchLatestRates]);

	const refreshRates = () => fetchLatestRates(true);

	return {
		rates,
		currencies,
		loading,
		error,
		convertCurrency,
		refreshRates,
	};
};
