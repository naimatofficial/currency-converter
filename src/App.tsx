import { CopyrightFooter } from './components/CopyrightFooter';
import { CurrencyConverter } from './components/CurrencyConverter';
import { OpenSourceMessage } from './components/OpenSourceMessage';
import { SocialLinks } from './components/SocialLinks';
import './styles/index.css';
import './styles/links.css';

function App() {
	return (
		<main className='main'>
			<CurrencyConverter />

			<div className=''>
				<SocialLinks />
			</div>

			<div className=''>
				<OpenSourceMessage />
			</div>

			<CopyrightFooter />
		</main>
	);
}

export default App;
