import './assets/rem'

import Vue from 'vue'
import App from './App'
import router from './router'

import {
			Button,Swipe, SwipeItem,NavBar,Icon ,Sticky,Tabbar, TabbarItem ,
			PullRefresh,Toast,Loading ,Area,Grid, GridItem,ActionSheet 
	} from 'vant';

Vue.use(Button).use(Swipe).use(SwipeItem).use(NavBar).use(Icon).use(Sticky).use(Tabbar)
    .use(TabbarItem).use(PullRefresh).use(Toast).use(Loading).use(Area).use(Grid).use(GridItem)
      .use(ActionSheet)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
