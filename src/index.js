import config from './config.js';
import { createCards } from '../components/card-list.js';

const { project } = config;
const app = document.getElementById('app');

app.append(createCards(project));
