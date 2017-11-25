<template>
	<div id="layer">
		<center>
			<section class="TopBar" v-on:click="inFocus">
				<div class="container">
					<h3>About</h3>
				</div>
			</section>
		</center>

			<section class="info">
				<div class="name">
					{{designer.name}}
				</div>
				<div class="photo">
					<!--section class="tittle">Photo</section-->
						<section class="contactscontent">
							<center>
								<img class="facebook" v-bind:src=designer.photoPath alt={{designer.photoPath}}></img>
							</center>
						</section>
				</div>
			

				<div class="contacts">
					<section class="tittle">Contacts</section>
					<section class="contactscontent">
					<section class="element">
					<div class="contactnames">phone: </div>
					<div class="contactarray"> {{designer.phoneNo.join(', ')}} </div>
					</section>
					<br>
					<div class="marger"></div>
					<section class="element">	
					<div class="contactnames">email: </div>
					<div class="contactarray"> {{designer.email.join(', ')}} </div>
					</section>
					</section>
				</div>

				<div class="contacts">
					<section class="tittle">Links</section>
					<section class="linkscontent">
						<a href='https://www.facebook.com/' target="_blank">
						<i class="ion-social-facebook-outline"></i></a>
						<a href='https://www.instagram.com/' target="_blank">
						<i class="ion-social-instagram-outline"></i></a>		
					</section>
				</div>

			</section>
	



	</div>
			<section class="BottomBar">
				<h5>Demo version</h5>
			</section>
</template>


<script>
	module.exports = {
		data: function() { 
			return {
				designer: {
					name: 'Serhii Benedyshyn',
					age: 24,
					email: ['srhiibenedyshyn@gmail.com','benedyshyn@ukr.net'],
					phoneNo: ['+380 093 8787040', '+380 068 0552836'],
					photoPath: './components/about/1.jpg'
				}
			}
		},
		methods: {

			inFocus: function(){
				
				document.getElementById('about').scrollIntoView(top);
			}

		}
}
</script>


<style>
h3{
	position: relative;
	font-size: 24px;
	line-height: 80px;
	color: #777;
	font-family: 'Open Sans', sans-serif;
	font-weight: normal;
	margin: 0 0 0 0;
	float: left;
}
h5{
	position: relative;
	font-size: 12px;
	line-height: 60px;
	color: #ccc;
	font-family: 'Open Sans', sans-serif;
	font-weight: normal;
	margin: 0 0 0 0;
}
.marger{
	height: 1px;
	border-bottom: 1px solid #ddd;
}

.info{
	background: #fff;
	border: 1px solid #ddd;
	width: 1048px;
	position: relative;
	color: #777;
	font-family: 'Open Sans', sans-serif;
	font-weight: normal;
	padding: 40px 80px 40px 80px;
	left: 50%;
	margin: 50px 0 0 -524px;
	box-sizing: border-box;
}
.name{
	border-bottom: 1px solid #ddd;
	width: 100%;
	height: 30px;
	font-size: 24px;
	position: relative;
	text-align: left;
	float: left;
	display: block;
	margin-bottom: 20px;
}
.contacts{
	box-sizing: border-box;
	margin-top: 20px;
	width: 480px;
	font-size: 18px;
	position: relative;
	text-align: left;
	//min-height: 240px;
	//float: left;
	line-height: 30px;
}

.tittle{
	border-bottom: 1px solid #ddd;
}
.contactscontent{
	border-bottom: 1px solid #ddd;
	border-left: 1px solid #ddd;
	border-right: 1px solid #ddd;
	padding: 0px 20px 0px 20px;
	min-height: 100px;
	display: inline-block;
	//width: 480px;
}

.contactnames{
	box-sizing: border-box;
	position: relative;
	text-align: right;
	float: left;
	width: 80px;
	margin-right: 20px;
	padding: 20px 0px 20px 0px;
}

.contactarray{
	box-sizing: border-box;
	position: relative;
	text-align: left;
	float: right;
	width: 338px;
	padding: 20px 0px 20px 0px;
}

.element{
	display: inline-block;
}

.photo{
	float: right;
	overflow: hidden;
	font-size: 18px;
	margin-top: -20px;
}

.facebook{
	position: relative;
	padding: 20px 0px 20px 0px;
	height: 240px;
	width: 240px;
}

.linkscontent{
	background: #fff;
	border-bottom: 1px solid #ddd;
	border-left: 1px solid #ddd;
	border-right: 1px solid #ddd;
	color: #777;
	font-size: 36px;
	font-family: 'Open Sans', sans-serif;
	font-weight: normal;
	padding: 20px;
}

.linkscontent a{
	margin: 10px;
}

.BottomBar{
	height: 60px;
	position: relative;

	width: 100%;
	background-color: #fff;
	border-bottom: 1px solid #ddd;
	margin: -60px 0px 0px 0px;
	display: table;

	text-align: center;
}

</style>
