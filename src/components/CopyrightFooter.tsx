import React from 'react';

export const CopyrightFooter: React.FC = () => {
	const currentYear = new Date().getFullYear();

	const techStack = [
		{ name: 'React', icon: '⚛️' },
		{ name: 'Node', icon: '🗄️' },
		{ name: 'Vite', icon: '⚡' },
		{ name: 'CSS3', icon: '🎨' },
		{ name: 'API Integrations', icon: '🔌' },
	];

	const handleEmailClick = () => {
		window.location.href = 'mailto:naimatullah.dev@gmail.com';
	};

	return (
		<div className='copyright-footer'>
			<div className='copyright-text'>
				<span>Copyright © {currentYear}</span>
				<span className='copyright-heart'>❤️</span>
				<span>
					Developed by <span className='developer-name'>Naimat Ullah</span>
				</span>
			</div>

			<div className='copyright-subtext'>Full Stack Developer</div>

			<div className='tech-stack'>
				{techStack.map((tech, index) => (
					<span key={index} className='tech-badge'>
						{tech.icon} {tech.name}
					</span>
				))}
			</div>
			{/* 
			<div style={{ marginTop: '15px' }}>
				<button
					onClick={handleEmailClick}
					className='contribution-btn'
					style={{
						padding: '8px 20px',
						fontSize: '14px',
						background: 'rgba(255, 255, 255, 0.1)',
					}}
				>
					📧 Hire Me
				</button>
			</div> */}
		</div>
	);
};
