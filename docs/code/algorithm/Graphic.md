# 图

## 创建图

```js
function Graphic() {
  let vertices = []
  let adjList = new Dictionary()

  this.addVertex = function(v) {
    vertices.push(v)
    adjList.set(v, [])
  }

  this.addEdge = function(v, w) {
    adjList.get(v).push(w)
    adjList.get(w).push(v)
  }

  this.toString = function() {
    let s = ''
    for(let i = 0; i < vertices.length; i++) {
      s += vertices[i] + '->'
      let neighbors = adjList.get(vertices[i])
      for(let j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + ''
      }
      s += '\n'
    }
    return s
  }

  const initialColor = function() {
    let colors = []
    for(let i = 0; i < vertices.length; i++) {
      colors[vertices[i]] = 'white'
    }
    return colors
  }

  // 广度搜索
  this.bfs = function(v, callback) {
    let colors = initialColor()
    let queue = new Queue()

    queue.enqueue(v)
    while(!queue.isEmpty()) {
      let u = queue.dequeue()
      let neighbors = adjList.get(u)
      colors[u] = 'gray'
      for(let i = 0; i < neighbors.length; i++) {
        let w = neighbors[i]
        if(colors[w] === 'white') {
          colors[w] = 'gray'
          queue.enqueue(w)
        }
      }
      colors[u] = 'black'
      callback && callback(u)
    }
  }
  // 广度搜索(改进版)
  this.BFS = function(v) {
    let colors = initialColor()
    let queue = new Queue()
    let d = []
    let pred = []
    queue.enqueue(v)

    for(let i = 0; i < vertices.length; i++) {
      d[vertices[i]] = 0
      pred[vertices[i]] = null
    }

    while(!queue.isEmpty()) {
      let u = queue.dequeue()
      let neighbors = adjList.get(u)
      colors[u] = 'gray'

      for(let i = 0; i < neighbors.length; i++) {
        let w = neighbors[i]
        if(colors[w] === 'white') {
          colors[w] = 'gray'
          d[w] = d[u] + 1
          pred[w] = u
          queue.enqueue(w)
        }
      }
      colors[u] = 'black'
    }
    return {
      distances: d,
      predecessors: pred
    }
  }

  // 深度优先搜索
  this.dfs = function(callback) {
    let colors = initialColor()

    for(let i = 0; i < vertices.length; i++) {
      if(colors[vertices[i]] === 'white') {
        dfsVisit(vertices[i], colors, callback)
      }
    }
  }
  const dfsVisit = function(u, colors, callback) {
    colors[u] = 'gray'
    callback && callback(u)

    let neighbors = adjList.get(u)
    for(let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i]
      if(colors[w] === 'white') {
        dfsVisit(w, colors, callback)
      }
    }
    colors[u] = 'black'
  }

  // 深度优先搜索(改进版)
  let time = 0
  this.DFS = function() {
    let colors = initialColor(),
        d = [],
        f = [],
        p = []
    time = 0
    for(var i = 0; i < vertices.length; i++) {
      f[vertices[i]] = 0
      d[vertices[i]] = 0
      p[vertices[i]] = null
    }
    for(i = 0; i < vertices.length; i++) {
      if(colors[vertices[i]] == 'white') {
        DFSVisit(vertices[i], colors, d, f, p)
      }
    }

    return {
      discovery: d,
      finished: f,
      predecessors: p
    }
  }

  const DFSVisit = function(u, colors, d, f, p) {
    console.log('discovered ' + u)
    colors[u] = 'gray'
    d[u] = ++time
    let neighbors = adjList.get(u)
    for(let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i]
      if(colors[w] == 'white') {
        p[w] = u
        DFSVisit(w, colors, d, f, p)
      }
    }
    colors[u] = 'black'
    f[u] = ++time
    console.log('explored ' + u)
  }
}

```

### Use Graphic

```js
const graphic = new Graphic()
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for(let i = 0; i < myVertices.length; i++) {
  graphic.addVertex(myVertices[i])
}

graphic.addEdge('A', 'B')
graphic.addEdge('A', 'C')
graphic.addEdge('A', 'D')
graphic.addEdge('C', 'D')
graphic.addEdge('D', 'G')
graphic.addEdge('D', 'H')
graphic.addEdge('B', 'E')
graphic.addEdge('B', 'F')
graphic.addEdge('E', 'I')
```

### 测试广度搜索

```js
graphic.bfs(myVertices[0], function(value) {
  console.log('Visited vertex: ' + value)
})

# Visited vertex: A
# Visited vertex: B
# Visited vertex: C
# Visited vertex: D
# Visited vertex: E
# Visited vertex: F
# Visited vertex: G
# Visited vertex: H
# Visited vertex: I
```

### 使用BFS寻找最短路径

```js
const shortestPathA = graphic.BFS(myVertices[0])
distances: [A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2 , I: 3],
predecessors: [A: null, B: "A", C: "A", D: "A", E: "B", F: "B", G:"C", H: "D", I: "E"]
```

```js

const fromVertex = myVertices[0]
for(let i = 1; i < myVertices.length; i++) {
  let toVertex = myVertices[i]
  let path = new Stack()
  for(let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
    path.push(v)
  }

  path.push(fromVertex)
  let s = path.pop()
  while(!path.isEmpty()) {
    s += ' - ' + path.pop()
  }
  console.log(s)
}
```
