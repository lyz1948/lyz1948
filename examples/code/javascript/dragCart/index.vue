<template lang="pug">
  .snippet-demo.drag-cart
    .top-title
      h2 拖拽购物车
    .row
      ul.book-list.fct.tac
        li.book-item(v-for="item in list", draggable="true", @dragstart="handleDragStart")
          img(src="../../../assets/images/logo.png", draggable="false", alt="")
          h3.title title: {{item.title}}
          p 价格:
            span.price {{item.price}}元
    .row
      .drop-box(ref="dropBox")

</template>

<script>
export default {
  name: 'dragCart',
  data () {
    return {
      list: [
        { title: '达洋猫绘本系列 第1辑（共7册）精装典藏', price: 12, img: './imgs/1.jpg' },
        { title: '小莲游莫奈花园系列绘本', price: 58.8, img: '../../../assets/images/logo.png' },
        { title: '弗洛拉和火烈鸟系列：全2册', price: 32, img: '../../../assets/images/logo.png' },
        { title: '绘本窗边的小豆豆', price: 18.8, img: '../../../assets/images/logo.png' }
      ],
      cartObj: {},
      total: 0,
      totalMoney: null
    }
  },
  methods: {
    handleDragStart (ev) {
      let target = ev.target
      let bookTitle, bookCount
      let title = target.querySelector('.title')
      let price = target.querySelector('.price')

      const box = this.$refs.dropBox

      ev.dataTransfer.setData('title', title.innerHTML)
      ev.dataTransfer.setData('price', parseFloat(price.innerHTML))

      // 拖拽对象进入目标区域，连续触发
      box.ondragover = (ev) => {
        ev.preventDefault()
      }

      box.ondrop = (ev) => {
        ev.preventDefault()
        let book, oTitle, iCount, fMoney
        const title = ev.dataTransfer.getData('title')
        const price = ev.dataTransfer.getData('price')

        if (!this.cartObj[title]) {
          book = document.createElement('p')
          book.classList.add('book-item')

          oTitle = document.createElement('h3')
          oTitle.classList.add('title')
          oTitle.innerHTML = title

          iCount = document.createElement('span')
          iCount.classList.add('count')
          iCount.innerHTML = 1

          fMoney = document.createElement('span')
          fMoney.classList.add('price')
          fMoney.innerHTML = price + '元'

          book.appendChild(oTitle)
          book.appendChild(fMoney)
          book.appendChild(iCount)

          box.appendChild(book)

          this.cartObj[title] = 1
        } else {
          bookTitle = box.querySelectorAll('.title')
          bookCount = box.querySelectorAll('.count')

          for (let i = 0; i < bookTitle.length; i++) {
            bookCount[i].innerHTML = parseInt(bookCount[i].innerHTML) + 1
          }
        }

        if (!this.total) {
          this.totalMoney = document.createElement('div')
          this.totalMoney.classList.add('total-money')
        }

        this.total += parseFloat(price) * 100
        this.totalMoney.innerHTML = ' 总计：' + this.total / 100 + '元'
        box.appendChild(this.totalMoney)
      }
    }
  }
}
</script>

<style lang="stylus">
.drag-cart
  overflow: hidden
.book-list
  margin-left: -1.25rem
.book-item
  position: relative
  float: left
  width: 12.5rem
  height: 18.75rem
  margin-left: 1.25rem
  padding: 0.625rem
  color: #fff
  font-size: 16px
  background-color: deeppink
  img
    z-index: -1
  .title
    margin: 0
  .count
    float: right
  .price
    position: absolute
    right: 10px
    bottom: 0
.drop-box
  position: relative
  width: 90%
  height: 400px
  border: 1px solid #ddd
  margin: 0 auto
  .book-item
    background-color: yellowgreen
.total-money
  position: absolute
  bottom: 0
  right: 0
  left: 0
  padding: 10px
  text-align: right
</style>
