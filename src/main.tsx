import { render } from 'preact';
import App from './App';
import './styles/tailwind.css';
import './styles/global.css';

render(<App />, document.getElementById('root') as HTMLElement);
