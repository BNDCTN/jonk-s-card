<template>
<h1>{{ currentSlide }}</h1>

<div class="slideContainer" v-on:load="changeSlide">
	<!--component class="slideShow" v-bind:is='currentSlide' 
	transition="switch" v-on:load="changeSlide"></component-->

		<first class="slideShow" v-if="currentSlide == 'first'" transition="switch"
		 v-on:load="changeSlide"></first>

		<second class="slideShow" v-if="currentSlide=='second'" transition="switch"
		 v-on:load="changeSlide"></second>

		<third class="slideShow" v-if="currentSlide == 'third'" transition="switch"
		 v-on:load="resetSlide"></third>

</div>

</template>

<script>
	module.exports = {
	data: 
		function (){ 
			return{
				currentSlide: 'first',
				pics:['first','second','third'],
				access: true,
				i: 0
			}
		},
	components:{
				first: {
					template: '<img src="components/gallery/0.jpg" alt="1"></img>'
				},
				second: {
					template: '<img src="components/gallery/1.jpg" alt="2"></img>'
				},
				third: {
					template: '<img src="components/gallery/2.jpg" alt="3"></img>'
				}
	},
	methods:{
				changeSlide: function (){
					setTimeout(this.carousel, 15000);
				},
				carousel: function(){
					if (this.i==2) this.reset();
					else {
	    			this.i++;
	    			this.currentSlide=this.pics[this.i];}
				},
				resetSlide: function () {
					this.i = -1;
					this.changeSlide();
				}
	},
	computed:{


	}
}


</script>


<style>

h1{
	display:block;
	position: absolute;
	width: 500px;
	height: 100px;
	top: 50%;
	left: 50%;
	margin: -50px 0 0 -250px;
	font-size: 54px;
	line-height: 64px;
	font-family: 'Open Sans', sans-serif;
	font-weight: 300;
	color: #ccc;
	text-align: center;
}

.switch-transition{
-webkit-transition: all 2s ease-in-out;
-moz-transition: all 2s ease-in-out;
-o-transition: all 2s ease-in-out;
transition: all 2s ease-in-out;
}

.switch-enter{
	margin-left: 100%;
}
	
.switch-leave{
	margin-left: -100%;
}



.slideContainer{
	margin-top: -80px;
	width:100%;
	height: 100%;
	overflow: hidden;
	display: inline-block;
	position: relative;
	z-index: -1;
	background: #333;
}

.slideShow{
	//margin-top: -80px;
	width: 100%;
	height: 100%;
	//display: inline;
	position: absolute;
	z-index: -1;
}

</style>