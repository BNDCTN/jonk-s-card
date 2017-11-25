<template>

	<div id="layer">
		<center>
			<section class="TopBar" v-on:click="inFocus">
			<div class="container">
					<button v-on:click="showcategories =!showcategories"><i class="ion-navicon"></i></button>
					<h2>Gallery</h2>
					<input type="text" placeholder="Searching" v-model="input">
			</div>
			</section>


			<div class="listCategories" transition="slide" v-show="showcategories">
				<center>
					<ul>
						<li v-on:click="chooseAndHide(category, showcategories)" v-for="category in categories"> {{category}} </li>					
					</ul>
				</center>
			</div>
		
			<div class="toRootPage" v-if="nodeFolder" v-on:click="gotoRoot">
				<i class="ion-ios-arrow-left"></i>
			</div>

	<section class="pictures">
		<section class="screen">					
				<section id="maxPic" v-if="showPicture" transition="showMAXphoto">
				<div class="maximized">
				
				<button class="maxButton" id="maxLeft" v-on:click="prevPic(chosenPicId)">
					<i class="ion-ios-arrow-left"></i></button>

					<p id="picInfo"> {{chosenPicId.name}} </p>
					<img v-if="showPicture" 
					v-bind:src=chosenPicId.path alt={{chosenPicId.name}} 
					v-on:click='trigger' transition="nextphoto"></img>	

				<button class="maxButton" id="maxRight" v-on:click="nextPic(chosenPicId)">
					<i class="ion-ios-arrow-right"></i></button>

				</div>				
				</section>



				<section id="minPix" transition="showLISTphoto" v-if="!showPicture">

					<section class="navigation">
								<button class="prevnextButton" id="Left" v-on:click="prevPage">
								<i class="ion-ios-arrow-left"></i></button>


								<button class="navButton" v-for="page in leftpages" v-on:click="currentPage=page"
								>{{page+1}}</button>

								<button class="navButton" v-if="currentPage > 3">..</button>

								<button class="navButton" v-for="page in leftpages" 
								v-if="currentPage > 2" v-on:click="currentPage-=page">{{currentPage-1}}</button>

								<button class="navButton" v-bind:style='{
								"margin-left": "0px",
								"margin-right": "0px",
								"box-shadow": "0px 0px 3px 3px rgba(200,200,200,0.25)",
								"color": "#0b5",
								"background": "#fff",
								}'>{{currentPage}}</button>

								<button class="navButton" v-for="page in rightpages" 
								v-if="currentPage < (pages - 1)" v-on:click="currentPage+=page">{{currentPage+1}}</button>

								<button class="navButton" v-if="currentPage < pages - 2">..</button>

								<button class="navButton" v-for="page in rightpages" v-if="(page + currentPage) >= (pages-1)" 
								v-on:click="currentPage+=page">{{page+currentPage+1}}</button>

								<button class="prevnextButton" id="Right" v-on:click="nextPage"
								><i class="ion-ios-arrow-right"></i></button>
					</section>
						
						<div class="picture" v-on:click="chooseFile(file)" v-for="file in filesArray | filterBy input"> 
							<section class="tittle">
								{{file.type}}
							</section>
							<section class="content">
								<img class="frame" v-bind:src=file.path alt={{file.name}} v-if="file.type==='File'"></img>
								<img class="frame folder" v-bind:src=curtain(file) v-else></img>
							</section>
							<section class="category">
								{{file.name}} 
							</section>
						</div>

				</section>


		</section>
	</section>
	</center>
		
	</div>

</template>




<script>
module.exports = {
	data: function() {
	return {
	showcategories: false, 
	input: '',
	rootFolder: 'components/gallery/',
	curFolder: '',
	categories: ['All', 'File', 'Folder'],
	showPicture: false,
	chosenPicId: {id: -1, name:'', category: '', path:''},
	files: [],
	currentPage: 1,
	picsonPage: 6,

	}},
	created: function() {
      		this.freezeLoad(this.loadContent(this.rootFolder));
    },
	computed: {
			pages: function(){
				return Math.ceil((this.files.length)/(this.picsonPage));
			},
			filesArray: function(){
				var load = [];
				var first = this.currentPage * this.picsonPage - 6;
				var last = first + this.picsonPage;
				for (var i=first; ; i++){
					if (i==this.files.length || i==last) break;
				load.push(this.files[i]);	
				}
				return load;
			},
			leftpages: function(){
				if (this.currentPage-1 >= 1) return 1;
				else
				return this.currentPage-1;
			},
			rightpages: function(){
				if (this.pages>1)
				return this.pages - this.currentPage;
			else return 1;
			},
			buttonsLock:  function(page){
      		// the getter should return the desired value
      		//$get: function () {
      		if (page===1 || page===this.currentPage-2 || page===this.currentPage-1 || page===this.currentPage ||
      			page===this.currentPage+1 || page===this.currentPage+2 ||  page===this.pages)
      			
           	return true;
           	else return false;
			},
			filterQuery: function () {
    			var self = this;
    			return self.files.filter(function (files) {
     			return files.name.indexOf(self.input) !== -1;
    			})
  			},
			frameWidth: function () {
				return screen.width/4.5;
			},
			screenHeight: function () {
				return document.documentElement.clientHeight;
			},
			nodeFolder: function(){
				return this.rootFolder.indexOf(this.curFolder);

			}
	},
	methods: {
	inFocus: function(){
	document.getElementById('gallery').scrollIntoView(top);
	console.log(this.leftpages);
	console.log(this.rightpages);
	},
	
	choosePic:function(chosenPic){
	this.showPicture=true;
	this.chosenPicId=chosenPic;
	document.getElementById('gallery').scrollIntoView(top);
	},

	chooseFol:function(fol){
	document.getElementById('gallery').scrollIntoView(top);
	this.curFolder = fol.path;
	var files = this.loadContent(fol.path);
	this.freezeLoad(files);
	},

	chooseFile:function(file){
		if (file.type=="Folder") this.chooseFol(file);
		else this.choosePic(file);
	},

	nextPic:function(thisPic){
	//this.showPicture=false;
	if(thisPic.id<this.files.length-1){
	this.showPicture=true;
	this.chosenPicId=this.files[thisPic.id+1];
	}
	document.getElementById('gallery').scrollIntoView(top);
	},

	prevPic:function(thisPic){
	if(thisPic.id>0){
	this.showPicture=true;
	this.chosenPicId=this.files[thisPic.id-1];
	}
	document.getElementById('gallery').scrollIntoView(top);
	},
	
	chooseCategory: function(input){
	if (input=='Всі') this.input='';
	else this.input = input;
	},
	
	chooseAndHide: function(input, show){
	this.chooseCategory(input);
	this.showcategories=!show;
	},

	trigger: function(){
		this.showPicture= !(this.showPicture);
	},

	prevPage: function(){
			if(this.currentPage>1)
		this.currentPage--;
	},
	nextPage: function(){
		if(this.currentPage<this.pages)
		this.currentPage++;
	},
	gotoRoot: function(){
		this.curFolder=this.rootFolder;
		this.freezeLoad(this.loadContent(this.rootFolder));
	},
	compareFiles: function (a,b) {
	  	if (a.type > b.type)
	    return -1;
	  	if (a.type < b.type)
	    return 1;
	  	return 0;
	},
	curtain: function (file){
		var src = "";
		var arr = this.loadContent(file.path);
		src = 'components/assets/folder.png';
/*
		setTimeout(()=>{
			if (arr.length>1)
			{
			arr.sort(this.compareFiles==-1);
			src = arr[0].path;
			}
			console.log(src);
		},50)
*/
		return src;
	},
	freezeLoad: function(files){
    	setTimeout(()=>{
		if (files!=null) {
		this.files = files;
    	this.files.shift();
		this.files.sort(this.compareFiles);
		for (var i=0; i< this.files.length; i++){
			this.files[i].id = i;
		}}},100);
	},
	loadContent: function(folder){
 		var i=0;
        var uRL = folder;
        var files = [];
        $.ajax({url: uRL, success: function(data){
     	$(data).find("td > a").each(function(){
        // will loop through 
        var filename = $(this).attr("href");
        if (filename.indexOf('jpg') !== -1 || filename.indexOf('png') !== -1)
        {  	
        files.push({id: 0, name:filename,	type: 'File', path: uRL+filename});    	
    	}
        else
        { 
        files.push({id: 0, name:filename,	type: 'Folder', path: uRL+filename});      
    	}
     	});
  		}});
        return files;
    	}
	}
}


</script>


<style>

#layer{
	background-color: #eee;
	display: block;
	position: relative;
	width: 100%;
	left: 50%;
	margin: 0 0 0 -50%;
	height: 100vh;
	padding: 0px;
}

.listCategories{
	width:300px;
	background-color: #fff;
	display: block;
	position: absolute;
	margin: 0;
	z-index: 2;
	//margin-top: -41px;
	border-radius: 0px 5px 5px 0px;
	//border-top: 1px solid #ddd;
	box-shadow: inset 0 0 0 1px rgba(255,255,255,0.5), 0 3px 10px 0px rgba(0,0,0,0.25);
}

.listCategories ul {
	 list-style-type: none;
	 margin: 0;
	 padding: 0;
	 width: 80%;
}

.listCategories li{
	font-size: 24px;
	line-height: 55px;
	color: #999;
	border-bottom: 1px solid #ddd;
}

.listCategories li:hover{
		border: 1px 0 1px 0 solid #ddd;
		//box-shadow: inset 0 0 2px 2px rgba(150,150,150,0.25), 0 1px 10px -3px rgba(0,0,0,0.50);
		background: #eee;
}

.slide-transition{
transition: all .3s cubic-bezier(0.65, 0.05, 0.36, 1);
}

.slide-enter, .slide-leave{
	margin-left: -100%;
}

.TopBar{
	height: 80px;
	width: 100%;
	background-color: #fff;
	border-bottom: 1px solid #ddd;
}

.TopBar button:hover{
	opacity: 1;
	}
.TopBar button:active{
	opacity: 0.5;
	}

.TopBar button{
	width:50px;
	height:50px;	
	position: relative;
    margin: 15px 0 0 -65px;
	font-size: 36px;	
	color: #777;
	border: none;
	background: none;
	float: left;
	opacity: 0.5;
	outline: none;	
}

.TopBar h2{
	position: relative;
	font-size: 24px;
	line-height: 80px;
	color: #777;
	font-family: 'Open Sans', sans-serif;
	font-weight: normal;
	margin: 0 0 0 0;
	float: left;
}

.TopBar input{
	background-color: #fafafa;
	position: relative;
	width: 340px;
	height: 30px;
	font-size: 16px;
    text-decoration: none;
    margin: 25px 0 0 0;
    float:right;
    padding-left: 5px; 
    border: 1px solid #ccc;	
}

.navButton{
	width: 50px;
	height: 30px;
	font-size: 15px;
	background: #eee;
	margin-top: 20px;
	margin-left: 1px;
	margin-right: 1px;
	color: #aaa;
	border-radius: 5px; 
	border: 1px solid #ccc;
	outline: none;	
}

.prevnextButton{
	width: 60px;
	height: 40px;
	font-size: 20px;
	background: #eee;
	margin-top: 15px;
	color: #aaa;
	border-radius: 5px; 
	border: 1px solid #ccc;
	outline: none;	
}

.prevnextButton:hover{
	box-shadow: 0px 0px 3px 3px rgba(200,200,200,0.25);
	color: #0b5;
	background: #fff;
}

#Left{
	margin-left: 95;
	float: left;
}

#Right{
	margin-right: 95;
	float: right;
}

.pictures{
	display: block;
	overflow: hidden;
	position: relative;
}

.screen{
	background: #ddd;
	max-width: 1048px;
	margin: 0;
	padding: 0;
	overflow: hidden;
	box-sizing: border-box;
}

.picture{
	position: relative;
	background-color: #ccc;
	display: inline-block;
	color: #777;
	//min-width: 320px;
	left: -1%;
	margin-left: 2%; 
	margin-bottom: 2%;
	border-radius: 5px; 
	box-shadow: inset 0px 0px 30px 30px rgba(255,255,255,0.5), 1px 1px 1px 1px rgba(0,0,0,0.25);
}

.category{
	height: 20px;
	margin: 10px;
}
.toRootPage{
	position: absolute;
	display: block;
	background: #ddd;
	opacity: 0.2;
	width: 10%;
	height: 90vh;
	line-height:100%;
	vertical-align: middle;
	font-size: 24px;
	z-index: 1;
}

.toRootPage:hover{
	opacity: 0.5;
}

.frame{
	width:320px;
	height:240px;
	overflow: hidden;
	object-fit: cover;
	background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
.frame.folder{
    //filter: blur(5px);
}

.navigation{
	height: 70px;
}

.picture:hover { background-color: #fff;
	box-shadow: inset 0 0 0 1px rgba(255,255,255,0.5), 0 3px 10px 0px rgba(0,0,0,0.25);
 }

.frame:hover{
	//width:100%;
	//height: 90%;
}
//.frame:hover { z-index: -1; }

.maximized{
	max-width: 1048px;
	max-height: 700px;
	box-sizing: border-box;
	display: block;
	text-align: center;
	position: relative;
}

.maximized img{
	max-width: 1040px;
	max-height: 700px;
	overflow: hidden;
	//padding: 1px;
}

#maxPic{
	//border: 1px solid red;
	width: 100%;
}

#picInfo{
	position: absolute;
	display: inline-block;
	margin-top: 20px;
	margin-left: 20px;
	font-size: 20px;
	color: #fff;
	//z-index: 1;
	opacity: 0.5;
}

.maxButton{
	font-size: 100px;
	color: #fff;
	width: 110px;
	background: none;
	border: none;
	opacity: 0.5;
	text-align: center;

	display: inline;
	vertical-align: middle;
	position: absolute;
	height: 100%;
	//background: #000;
	opacity: 0.5;
	outline: none;
}

#maxLeft{
	margin-left: 0px; 
}
#maxRight{
	margin-left: -110px;
}

#picInfo:hover, .maxButton:hover{
	opacity: 0.75;
}

.nextphoto-transition{
-webkit-transition: all 1s ease-in-out;
-moz-transition: all 1s ease-in-out;
-o-transition: all 1s ease-in-out;
transition: all 1s ease-in-out;
}

.nextphoto-enter{
	//margin-left: 100%;
	opacity: 1;
}
	
.nextphoto-leave{
	//margin-left: -100%;
	opacity: 0;
}

.showMAXphoto-transition{
-webkit-transition: all .75s ease-in-out;
-moz-transition: all .75s ease-in-out;
-o-transition: all .75s ease-in-out;
transition: all .75s ease-in-out;

	//position: absolute;

}

.showMAXphoto-enter{
	margin-top: -63%;
}
.showMAXphoto-leave{
	margin-top: -63%;
}

.showLISTphoto-transition{
-webkit-transition: all .75s ease-in-out;
-moz-transition: all .75s ease-in-out;
-o-transition: all .75s ease-in-out;
transition: all .75s ease-in-out;

	//position: absolute;
}

.showLISTphoto-enter{
	margin-top: 100vh;
	//opacity: 0;
}
.showLISTphoto-leave{
	margin-top: 100vh;
	//opacity: 0;
}


</style>