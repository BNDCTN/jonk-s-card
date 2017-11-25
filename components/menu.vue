<template>
<nav id="navbar">

	<li v-for="item in items"  v-on:click="onClick(item)"> {{item.name}} </li>	

</nav>
 
</template>


<script>
	module.exports = {
	data: 
		function (){ 
			return{
				items: [
				{
					name:'Gallery',
					link: '#'
				}, 
				{
					name:'Business card',
					link: '#'
				}
				]
			}
		},
	methods: 
	{ 
		onClick: function (e) {
			if (e.name == 'Gallery')
					document.getElementById('gallery').scrollIntoView(top);
			else if (e.name == 'Contacts')
					window.scrollDown(0, 50);
			}
	}
}
</script>


<style>
#navbar ul{
        display: block;
        background-color: #e90;
        position: absolute;
        //top: 100%;
      }
#navbar li:hover ul { display: block; }
#navbar, #navbar ul{
        margin: 0;
        padding: 0;
        list-style-type: none;
      }
#navbar {	
        height: 80px;
        background-color: #fff;
        //padding-left: 50%;		
        min-width: 470px;
		opacity: 0.75;
		line-height: 50;
		background: -webkit-linear-gradient(rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%);
		background: -o-linear-gradient(rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%);
		background: linear-gradient(rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%); 
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000', GradientType=0 );
      }
#navbar li {
		width: 15%;
		height: 100%;
        float: left;
        left:35%;
        position: relative;
		line-height: 80px;
        display: block;
		padding: 0;
        color: #ccc;
		font-size: 20px;
		font-family: 'Open Sans', sans-serif;
		font-weight: 100;
		text-decoration: none;
        text-align: center;
        transition:  all 1s;
      	}
#navbar ul li { float: none; }
#navbar li:hover { background-color: #eee; color: #777; }
#navbar ul li:hover { background-color: #666; }
</style>