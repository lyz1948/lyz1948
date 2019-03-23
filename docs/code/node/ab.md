# ab测压

## Appache ab

```bash
ab -n1000 -c10 http://loacalhost:3001/
```

-n1000 请求数1000个 默认值：1个
-c10 并发数10个 默认值：1个
`http://loacalhost:3001/` 测试地址，注意：后面要加上‘/’斜线
-t 测试进行的总时间
-p post时候的测试文件
-w 以HTML表格的形式输出结果

在60秒内发请求，一次100个请求

```bash
ab -t 60 -c 100 -T "text/plain" -p p.txt 测试的网址
```

输出的内容
```bash
Server Software:        Microsoft-IIS/7.5  //服务器
Server Hostname:        editor.qjzone.com  // 主机域名
Server Port:            80                 // 端口号
```

```bash
Document Path:          /panoview.aspx     // 页面路径
Document Length:        140 bytes          // HTTP响应数据的正文长度
```

```bash
Concurrency Level:      100                // 并发数
Time taken for tests:   63.080 seconds     // 所有这些请求处理完成所花费的时间
Complete requests:      1280               // 完成请求数
Failed requests:        0                  // 失败请求数
Non-2xx responses:      1280
Total transferred:      806400 bytes       // 网络总传输量
Total body sent:        218040
HTML transferred:       179200 bytes       // HTML内容传输量
Requests per second:    20.29 [#/sec] (mean)  // 吞吐量-每秒请求数
Time per request:       4928.109 [ms] (mean)  // 服务器收到请求，响应页面要花费的时间
Time per request:       49.281 [ms] (mean, across all concurrent requests) // 并发的每个请求平均消耗时间 
Transfer rate:          12.48 [Kbytes/sec] received   //平均每秒网络上的流量，可以帮助排除是否存在网络流量过大导致响应时间延长的问题
                        3.38 kb/s sent
                        15.86 kb/s total
```

```bash
Connection Times (ms) // 网络上消耗的时间的分解
              min  mean[+/-sd] median   max
Connect:       31   46  84.2     47    3042
Processing:  4196 4544 811.1   4290    7441
Waiting:       31 2400 1480.1   2340    7272
Total:       4243 4590 814.9   4323    7472
```

```bash
Percentage of the requests served within a certain time (ms)
  50%   4323  // 50％ 的用户响应时间小于 4323 毫秒 
  66%   4401
  75%   4446
  80%   4446  // 80％ 的用户响应时间小于 4446 毫秒 
  90%   4508
  95%   7350
  98%   7426
  99%   7441 // 99％ 的用户响应时间小于 7441 毫秒
 100%   7472 (longest request)
```
