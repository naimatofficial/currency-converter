export interface CurrencyRate {
	code: string;
	value: number;
}

export interface CurrencyData {
	meta: {
		last_updated_at: string;
	};
	data: {
		[key: string]: {
			code: string;
			value: number;
		};
	};
}

export interface CurrencyResponse {
	data: CurrencyData;
}

export interface ConvertedAmount {
	amount: number;
	currency: string;
}
