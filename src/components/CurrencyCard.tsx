import React from 'react';

interface CurrencyCardProps {
	amount: number;
	currency: string;
	onAmountChange: (amount: number) => void;
	onCurrencyChange: (currency: string) => void;
	currencies: string[];
	label: string;
	disabled?: boolean;
}

export const CurrencyCard: React.FC<CurrencyCardProps> = ({
	amount,
	currency,
	onAmountChange,
	onCurrencyChange,
	currencies,
	label,
	disabled = false,
}) => {
	return (
		<div className='currency-card'>
			<label className='currency-label'>{label}</label>
			<div className='currency-input-group'>
				<input
					type='number'
					value={amount || ''}
					onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
					className='currency-input'
					placeholder='0.00'
					disabled={disabled}
					min='0'
					step='0.01'
				/>
				<select
					value={currency}
					onChange={(e) => onCurrencyChange(e.target.value)}
					className='currency-select'
				>
					{currencies.map((curr) => (
						<option key={curr} value={curr}>
							{curr}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
