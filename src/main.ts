import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import baseComponents from './components';
import { initializeApp } from 'firebase/app';
// import upperFirst from 'lodash/upperFirst';
// import camelCase from 'lodash/camelCase';

// var firebaseConfig = {
//   apiKey: '',
//   authDomain: '',
//   projectId: '',
//   storageBucket: '',
//   messagingSenderId: '',
//   appId: '',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyDUT2czoCzlNTzVm00PznQ30lv4tOjwjzo',
  authDomain: 'fir-797a4.firebaseapp.com',
  databaseURL: 'https://fir-797a4.firebaseio.com',
  projectId: 'fir-797a4',
  storageBucket: 'fir-797a4.appspot.com',
  messagingSenderId: '316546696005',
  appId: '1:316546696005:web:16a72562c3e60d9075742c',
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.config.performance = true;

Object.keys(baseComponents.components).forEach((key) => {
  const component = (baseComponents as any).components[key];
  app.component(key, component);
});

app.use(store, key).use(ElementPlus).use(router).mount('#app');
