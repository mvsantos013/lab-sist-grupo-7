import Home from '@/frontend/pages/Home';
import ConfigDataverseClient from '@/frontend/pages/ConfigDataverseClient';
import Error from '@/frontend/pages/Error';
import Upload from '@/frontend/pages/Upload';

export const routes = [
  { path: '/', component: Home },
  { path: '/config', component: ConfigDataverseClient },
  { name: 'Error', path: '/error/:title/:text', component: Error, props: true },
  { name: 'Upload', path: '/upload', component: Upload, props: true },
];
