<template lang="pug">
  .snippet-wrap
    #wrapper.pos-r
      #header header
      #main
        .left left
        .right
          .right-inner right
      #footer footer
</template>

<style scoped>
#wrapper{height: 500px; overflow: hidden; margin: 20px auto; font-size: 30px;}
#wrapper{text-align: center;}
#wrapper{display: flex; flex-direction: column;}
#header{height: 50px; background-color: #F360C4;}
#footer{height: 80px; background-color: #232530;}
#main{flex: 1; display: flex;}
#main .left{width: 200px; background-color: #3CE8E6;}
#main .right{flex: 1; overflow-y: auto;}
#main .right-inner{min-height: 1000px;}
</style>
