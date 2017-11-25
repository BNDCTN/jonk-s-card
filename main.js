var Vue = require('vue')
//var VueRouter = require('vue-router')
var hello = require('vue!./components/hello.vue')
var mainmenu = require('vue!./components/menu.vue')
var gallery = require('vue!./components/gallery.vue')
var about = require('vue!./components/about.vue')

var axios = require('axios')
var VueAxios = require('vue-axios')
var Vue2Filters = require('vue2-filters')
Vue.use(VueAxios, axios, Vue2Filters)

new Vue({
	el:'body',
	components:{
		mainmenu: mainmenu,
		hello: hello,
		gallery: gallery,
		about: about
	}
})




		
		