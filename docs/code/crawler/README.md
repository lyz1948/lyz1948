# crawler

## cheerio

```js
'use strict'
var http = require('http') // http 网路
var cheerio = require('cheerio') // html 解析
var fs = require('fs') // 流

var queryHref = 'http://www.haha.mx/topic/1/new/' // 设置被查询的目标网址
var querySearch = 1 // 设置分页位置
var urls = []

var sumConut = 0
var reptCount = 0 // 重复的
var downCount = 0 // 实际下载的

/**
 * 根据url和参数获取分页内容
 * @param {String}： url
 * @param {int}： serach
 */
function getHtml(href, serach) {
  console.log('正在获取第 ' + serach + ' 页的图片')
  var pageData = ''
  var req = http.get(href + serach, function(res) {
    res.setEncoding('utf8')
    res.on('data', function(chunk) {
      pageData += chunk
    })

    res.on('end', function() {
      let $ = cheerio.load(pageData)
      var html = $('.joke-list-item .joke-main-content a img')

      for (var i = 0; i < html.length; i++) {
        var src = html[i].attribs.src
        // 筛选部分广告，不是真的段子
        if (src.indexOf('http://image.haha.mx') > -1) {
          urls.push(html[i].attribs.src)
        }
      }
      // 递归调用
      if (serach < pagemax) {
        getHtml(href, ++serach)
      } else {
        console.log('图片链接获取完毕！')
        sumConut = urls.length
        console.log('链接总数量：' + urls.length)
        console.log('开始下载......')
        downImg(urls.shift())
      }
    })
  })
}

/**
 * 下载图片
 * @param {String} imgurl：图片地址
 */
function downImg(imgurl) {
  var narr = imgurl.replace('http://image.haha.mx/', '').split('/')

  // 做一步优化，如果存在文件，则不下载
  var filename =
    './upload/topic1/' + narr[0] + narr[1] + narr[2] + '_' + narr[4]
  fs.exists(filename, function(b) {
    if (!b) {
      // 文件不存则进行 下载
      http.get(imgurl.replace('/small/', '/big/'), function(res) {
        var imgData = ''
        //一定要设置response的编码为binary否则会下载下来的图片打不开
        res.setEncoding('binary')

        res.on('data', function(chunk) {
          imgData += chunk
        })

        res.on('end', function() {
          var savePath =
            './upload/topic1/' + narr[0] + narr[1] + narr[2] + '_' + narr[4]
          fs.writeFile(savePath, imgData, 'binary', function(err) {
            if (err) {
              console.log(err)
            } else {
              console.log(narr[0] + narr[1] + narr[2] + '_' + narr[4])
              if (urls.length > 0) {
                downImg(urls.shift())
                downCount++
                console.log('剩余图片数量' + urls.length)
              }
            }
          })
        })
      })
    } else {
      // 统计重复的图片
      console.log('该图片已经存在重复.')
      reptCount++
      if (urls.length > 0) {
        downImg(urls.shift())
      }
    }
  })

  if (urls.length <= 0) {
    console.log('下载完毕')
    console.log('重复图片：' + reptCount)
    console.log('实际下载：' + downCount)
  }
}

var pagemax = 2 // 获取到多少页的内容
var startindex = 5 // 从多少页开始获取

function start() {
  console.log('开始获取图片连接')
  getHtml(queryHref, startindex)
}

start()
```

## 使用 Promise

```js
var http = require('http')
var Promise = require('bluebird')
var cheerio = require('cheerio')
var baseUrl = 'http://www.imooc.com/learn/'

function printChapter(courseData) {
  courseData.forEach(function(course) {
    console.log(course.num + ' 人学过 ' + course.h2)
  })

  courseData.forEach(function(course) {
    course.chapterList.forEach(function(item) {
      console.log(item.chapterTitle)
      item.videos.forEach(function(video) {
        console.log('[' + video.videoTitle + ']' + video.videoId)
      })
    })
  })
}

function filterChapters(html) {
  var $ = cheerio.load(html)
  var h2 = $('#main .hd h2')
    .text()
    .trim()
  var chapterDom = $('.chapter')
  var courseData = {
    h2: h2,
    chapterList: []
  }
  chapterDom.each(function(item) {
    var chapter = $(this)
    var chapterTitle = chapter.find('strong').text()
    var videos = chapter.children('li')
    var chapterData = {
      chapterTitle: chapterTitle,
      videos: []
    }
    videos.each(function(item) {
      var video = $(this).find('.J-media-item')
      var videoTitle = video.text()
      var videoId = video.attr('href').split('video/id')[1]

      chapterData.videos.push({
        videoTitle: videoTitle,
        videoId: videoId
      })
    })
    courseData.chapterList.push(chapterData)
  })
  return courseData
}

function getPageAsync(url) {
  return new Promise(function(resolve, reject) {
    http
      .get(url, function(res) {
        var html = ''
        res.on('data', function(data) {
          html += data
        })
        res.on('end', function() {
          resolve(html)
        })
      })
      .on('error', function(e) {
        reject(e)
        console.log('数据出错！')
      })
  })
}
var videoIds = [134]
// var videoIds = [728, 637, 348, 259, 197, 134, 75]
var fetchCourseArr = []
videoIds.forEach(function(id) {
  fetchCourseArr.push(getPageAsync(baseUrl + id))
})
Promise.all(fetchCourseArr).then(function(pages) {
  var coursesData = []
  pages.forEach(function(html) {
    var courses = filterChapters(html)
    coursesData.push(courses)
  })

  coursesData.sort(function(a, b) {
    return a.number < b.number
  })

  printChapter(coursesData)
})
```
