<template lang="pug">
	.snippet-wrap.sharp.clearfix
		.top-title
			h2 形状图
		.row
			.wrap
				.sharp-item(v-for="(item, index) in 9", :key="index")

		.row
			.picture
				img(src='http://cdn.ykpine.com/images/orange.jpeg', alt='')

			.demo.demo30
				| Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus sed nisi dicta. Tempore cupiditate!
			.demo.demo31
				| Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus sed nisi dicta. Tempore cupiditate!
			.demo.demo32
				| Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus sed nisi dicta. Tempore cupiditate!
			.demo.demo33
				| Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus sed nisi dicta. Tempore cupiditate!
			.demo.demo34
				| Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus sed nisi dicta. Tempore cupiditate!
			.tab TRAPEZOID

			.row
				.circle.pie
				.circle.pie1(style='animation-delay: -40s') 20%
				.circle.pie1(style='animation-delay: -60s') 60%
		</div>
</template>

<script>
export default {
  name: 'sharp'
}
</script>

<style scoped>
.sharp  {width: 960px}
.sharp-item{width: 150px; height: 150px; margin: 10px 0 0 10px; background: #2CBF1F;}
.sharp-item:nth-of-type(1){border-radius: 50% 100%;}
.sharp-item:nth-of-type(2){border-radius: 0 100%;}
.sharp-item:nth-of-type(3){border-radius: 100% 100% 0 0;}
.sharp-item:nth-of-type(4){border-radius: 0 100% 0 0;}
.sharp-item:nth-of-type(5){width: 0; height: 0; border: 40px solid transparent; border-left-color: red; border-right-color: blue; border-top-color: yellow; border-bottom-color: orange;}
.sharp-item:nth-of-type(6){width: 40px; height: 40px; border: 20px solid transparent; border-left-color: #ff00ff; border-right-color: #cd7832; border-top-color: #f60; border-bottom-color: #f60;}
.sharp-item:nth-of-type(7){border-radius: 0 0 80px 80px; height: 40px;}
.sharp-item:nth-of-type(8){width: 120px; border-radius: 10px; position: relative;}
.sharp-item:nth-of-type(8)::before{content: ""; border: 12px solid #fff; border-left-color: transparent; border-right-color: #2CBF1F; border-top-color: transparent; border-bottom-color: transparent; position: absolute; left: -24px; top: 30%;}

.sharp-item:nth-of-type(9){width: 60px; height: 80px; margin-right: 20px; position: relative; background: none;}
.sharp-item:nth-of-type(9)::before{-webkit-transform: rotate(45deg); left: 16px;}
.sharp-item:nth-of-type(9)::after{-webkit-transform: rotate(-45deg);}
.sharp-item:nth-of-type(9)::before,
.sharp-item:nth-of-type(9)::after{width: 100%; height: 100%;content: ""; border-radius: 100px 100px 0 0;  position: absolute; background: red;}
.sharp-item:nth-of-type(1) {border-radius: 80% 100% 80% 0;}

.demo {
	width: 200px;
	height: 120px;
	margin: 0 40px 20px 0;
	padding: 10px;
	color: #fff;
	float: left;
}

.picture {
	margin-left: 60px;
	width: 150px;
	height: 150px;
	margin: 50px;
	transform: rotate(45deg);
	overflow: hidden;
}

.picture>img {
	max-width: 100%;
	height: 100%;
	transform: rotate(-45deg) scale(1.42);
}

.demo30 {
	background: #58a;
	/* 解决浏览器不兼容的回退做法 */
	background: linear-gradient(-45deg, transparent 15px, #58a 0);
}

.demo31 {
	background: #58a;
	/* 解决浏览器不兼容的回退做法 */
	background: linear-gradient(-45deg, transparent 15px, #655 0) right, linear-gradient(45deg, transparent 15px, #58a 0) left;
	background-size: 50% 100%;
	background-repeat: no-repeat;
}

.demo32 {
	background: #58a;
	/* 解决浏览器不兼容的回退做法 */
	background: linear-gradient(-45deg, transparent 15px, #58a 0) left, linear-gradient(45deg, transparent 15px, #58a 0) right;
	background-size: 50% 100%;
	background-repeat: no-repeat;
}

.demo33 {
	padding-left: 30px;
	background: #58a;
	background: linear-gradient(135deg, transparent 15px, #58a 0) top left, linear-gradient(-135deg, transparent 15px, #58a 0) top right, linear-gradient(-45deg, transparent 15px, #58a 0) bottom right, linear-gradient(45deg, transparent 15px, #58a 0) bottom left;
	background-size: 50% 50%;
	background-repeat: no-repeat;
}

.demo34 {
	background: #58a;
	background: radial-gradient(circle at top left, transparent 15px, #58a 0) top left, radial-gradient(circle at top right, transparent 15px, #58a 0) top right, radial-gradient(circle at bottom right, transparent 15px, #58a 0) bottom right, radial-gradient(circle at bottom left, transparent 15px, #58a 0) bottom left;
	background-size: 50% 50%;
	background-repeat: no-repeat;
}

.tab {
	position: relative;
	display: inline-block;
	padding: .5em 1em .35em;
	color: white;
}

.tab::before {
	content: '';
	/* 用伪元素来生成一个矩形 */
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: -1;
	background: #58a;
	/*transform: perspective(.5em) rotateX(5deg); */
	-webkit-transform: scaleY(1.3) perspective(.5em) rotateX(5deg);
	-webkit-transform-origin: bottom;
}

	.circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    float: left;
    margin-right: 20px;
  }

  .pie {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: yellowgreen;
    background-image: linear-gradient(to right, transparent 50%, #655 0);
  }

  @keyframes spin {
    to {
      transform: rotate(.5turn);
    }
  }

  @keyframes bg {
    50% {
      background: #655;
    }
  }

  .pie::before {
    content: '';
    display: block;
    margin-left: 50%;
    height: 100%;
    border-radius: 0 100% 100% 0 / 50%;
    background-color: inherit;
    transform-origin: left;
    animation: spin 3s linear infinite, bg 6s step-end infinite;
  }

  .pie1 {
    position: relative;
    width: 100px;
    line-height: 100px;
    border-radius: 50%;
    background: yellowgreen;
    background-image: linear-gradient(to right, transparent 50%, #655 0);
    color: transparent;
    text-align: center;
  }

  .pie1::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    border-radius: 0 100% 100% 0 / 50%;
    background-color: inherit;
    transform-origin: left;
    animation: spin 50s linear infinite, bg 100s step-end infinite;
    animation-play-state: paused;
    animation-delay: inherit;
  }
</style>
