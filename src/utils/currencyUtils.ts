export const CURRENCY_API_URL = 'https://api.currencyapi.com/v3';
export const CURRENCY_API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

export const STORAGE_KEYS = {
	RATES: 'currency_rates',
	TIMESTAMP: 'currency_timestamp',
	CURRENCIES: 'currency_list',
};

export const CACHE_TTL = 23 * 60 * 60 * 1000; // 23 hours

export const roundCurrency = (amount: number): number => {
	return Math.round(amount * 100) / 100;
};

export const isCacheValid = (): boolean => {
	const timestamp = localStorage.getItem(STORAGE_KEYS.TIMESTAMP);
	if (!timestamp) return false;

	return Date.now() - parseInt(timestamp) < CACHE_TTL;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveToCache = (data: any, key: string): void => {
	localStorage.setItem(key, JSON.stringify(data));
	localStorage.setItem(STORAGE_KEYS.TIMESTAMP, Date.now().toString());
};

export const getFromCache = <T>(key: string): T | null => {
	const cached = localStorage.getItem(key);
	return cached ? JSON.parse(cached) : null;
};
