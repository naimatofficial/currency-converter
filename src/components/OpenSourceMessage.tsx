import React from 'react';

export const OpenSourceMessage: React.FC = () => {
	const handleContributionClick = () => {
		window.open(
			'https://github.com/naimatofficial/currency-converter',
			'_blank'
		);
	};

	return (
		<div className='opensource-message'>
			<h3>💝 Love This Project?</h3>
			<p>
				This project is open source and built with passion for the developer
				community. Your contributions, ideas, and feedback are welcome to make
				it even better!
			</p>
			<p>
				Let's collaborate and create something amazing together. Whether you're
				fixing bugs, adding new features, or improving documentation, every
				contribution matters.
			</p>
			<button className='contribution-btn' onClick={handleContributionClick}>
				🤝 Contribute on GitHub
			</button>
		</div>
	);
};
