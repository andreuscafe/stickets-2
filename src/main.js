import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

let app = ''; 

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAuLIyYYrQ17Q64o0Ox1-f9jD6Fr9UdO2I",
	authDomain: "stickets-4cc28.firebaseapp.com",
	databaseURL: "https://stickets-4cc28.firebaseio.com",
	projectId: "stickets-4cc28",
	storageBucket: "stickets-4cc28.appspot.com",
	messagingSenderId: "832069775299"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		new Vue({
			store,
			router,
			render: h => h(App)
		}).$mount('#app')
	}
})

