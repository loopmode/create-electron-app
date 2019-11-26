import ElectronStore from 'electron-store';
import { FormValues } from './screens/create-project-screen/schema';

export const store = new ElectronStore<{ values: FormValues }>();
