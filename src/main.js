import Vue from 'vue'
import Vuesax from 'vuesax'
import App from './App.vue'
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';

import 'vuesax/dist/vuesax.css'

Amplify.configure(aws_exports);

Vue.config.productionTip = false

Vue.use(Vuesax)

new Vue({
  render: h => h(App),
}).$mount('#app');
