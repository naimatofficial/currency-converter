import React from 'react';

interface SocialLink {
	name: string;
	url: string;
	icon: string;
	username: string;
	color: string;
}

export const SocialLinks: React.FC = () => {
	const socialLinks: SocialLink[] = [
		{
			name: 'GitHub',
			url: 'https://github.com/naimatofficial',
			icon: 'github',
			username: '@naimatofficial',
			color: '#333',
		},
		{
			name: 'Twitter',
			url: 'https://x.com/@iamnaimatullah1',
			icon: 'twitter',
			username: '@iamnaimatullah1',
			color: '#1DA1F2',
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/iamnaimatullah',
			icon: 'linkedin',
			username: '@iamnaimatullah',
			color: '#0077B5',
		},
		{
			name: 'Instagram',
			url: 'https://instagram.com/naimatofficial1',
			icon: 'instagram',
			username: '@naimatofficial1',
			color: '#E4405F',
		},
		{
			name: 'YouTube',
			url: 'https://youtube.com/@devnaimat',
			icon: 'youtube',
			username: '@devnaimat',
			color: '#FF0000',
		},
		// {
		// 	name: 'Portfolio',
		// 	url: 'https://frontenddevportfolio.com',
		// 	icon: 'globe',
		// 	username: 'My Portfolio',
		// 	color: '#667eea',
		// },
	];

	const getIconClass = (iconName: string) => {
		const iconMap: { [key: string]: string } = {
			github: 'fab fa-github',
			twitter: 'fa-brands fa-twitter',
			linkedin: 'fab fa-linkedin',
			instagram: 'fab fa-instagram',
			youtube: 'fab fa-youtube',
			globe: 'fas fa-globe',
		};
		return iconMap[iconName] || 'fas fa-link';
	};

	return (
		<div className='social-links'>
			<h3>Follow Me on Social Media</h3>
			<div className='social-icons'>
				{socialLinks.map((social) => (
					<a
						key={social.name}
						href={social.url}
						className='social-icon'
						target='_blank'
						rel='noopener noreferrer'
						style={{ '--social-color': social.color } as React.CSSProperties}
					>
						<i className={getIconClass(social.icon)}></i>
						<span className='social-username'>{social.username}</span>
					</a>
				))}
			</div>
			<p>Let's connect and build amazing things together! 🚀</p>
		</div>
	);
};
