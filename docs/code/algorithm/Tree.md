# 树

## 二叉树和二叉搜索树

二  索 (BST)是二  的一种，但是它只  你在  节点存储(比 节点)小的值， 在  节点存储(比 节点)大(或者等于)的值

### 创建二叉树

```js
function BinarySearchTree() {

  const Node = function(key) {
    this.key = key
    this.left = null
    this.right = null
  }

  let root = null

  # 向树中插入一个新的键
  this.insert = function(key) {
    let newNode = new Node(key)
    if(root === null) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
  }

  # 在树中查找一个键，如果节点存在，则返回true;如果不存在，则返回false
  this.search = function(key) {
    return searchNode(root, key)
  }
  # 通过中序遍历方式遍历所有节点
  this.inOrderTraverse = function(callback) {
    inOrderTraverseNode(root, callback)
  }
  # 通过先序遍历方式遍历所有节点
  this.preOrderTraverse = function(callback) {
    preOrderTraverseNode(root, callback)
  }
  # 通过后序遍历方式遍历所有节点
  this.postOrderTraverse = function(callback) {
    postOrderTraverseNode(root, callback)
  }
  # 返回树种最小的值/键
  this.min = function() {
    return minNode(root)
  }
  # 返回树种最大的值/键
  this.max = function() {
    return this.maxNode(root)
  }
  # 从树种移除某个键
  this.remove = function(key) {

  }

  const insertNode = function(node, newNode) {
    if(newNode.key < node.key) {
      if(node.left === null) {
        node.left = newNode
      } else {
        insertNode(node.left, newNode)
      }
    } else {
      if(node.right === null) {
        node.right = newNode
      } else {
        insertNode(node.right, newNode)
      }
    }
  }

  # 中序遍历(从小到大)
  const inOrderTraverseNode = function(node, callback) {
    if(node !== null) {
      inOrderTraverseNode(node.left, callback)
      callback(node.key)
      inOrderTraverseNode(node.right, callback)
    }
  }

  # 先序遍历(先左后右)
  const preOrderTraverseNode = function(node, callback) {
    if(node !== null) {
      callback(node.key)
      preOrderTraverseNode(node.left, callback)
      preOrderTraverseNode(node.right, callback)
    }
  }

  # 后序遍历
  const postOrderTraverseNode = function(node, callback) {
    if(node !== null) {
      postOrderTraverseNode(node.left, callback)
      postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }

  # 查找一个特定的值
  const searchNode = function(node, key) {
    if(node === null) {
      return false
    }
    if(key < node.key) {
      return searchNode(node.left, key)
    } else if(key > node.key) {
      return searchNode(node.right, key)
    } else {
      return true
    }
  }
  const findMinNode = function(node) {
    if(node) {
      while(node && node.left !== null) {
        node = node.left
      }
      return node
    }
  }

  # 查找最新值
  const minNode = function(node) {
    if(node) {
      while(node && node.left !== null) {
        node = node.left
      }
      return node.key
    }
    return null
  }

  # 查找最大值
  const maxNode = function(node) {
    if(node) {
      while(node && node.right !== null) {
        node = node.right
      }
      return node.key
    }
    return null
  }

  # 移除一个节点
  const removeNode = function(node, key) {
    if(node === null) {
      return null
    }
    if(key < node.key) {
      node.left = removeNode(node.left, key)
      return node
    } else if(key > node.key) {
      node.right = removeNode(node.right, key)
      return node
    } else {
      # 情况1：该节点是一个叶节点
      if(node.left === null && node.right === null) {
        node = null
        return node
      }
      # 情况2：该节点有一个子节点
      if(node.left === null) {
        node = node.right
        return node
      } else if(node.right === null) {
        node = node.left
        return node
      }

      # 情况3：该节点有2个子节点
      var temp = findMinNode(node.right)
      node.key == temp.key
      node.right = removeNode(node.right, temp.key)
      return node
    }
  }
}

```

### 中序遍历

中序遍历是一种以上行顺序访问BST所有节点的遍历方 ，也就是以从最小到最大的顺序访
问所有节点。中序遍历的一种应用就是对 进行排序操作。

```js
  const inOrderTraverseNode = function(node, callback) {
    if(node !== null) {
      inOrderTraverseNode(node.left, callback)
      callback(node.key)
      inOrderTraverseNode(node.right, callback)
    }
  }
```

### 先序遍历

先序遍历是以优先于后代节点的顺序访问每个节点的。先序遍历的一种应用是打印一个结构化的文档
```js
const preOrderTraverseNode = function(node, callback) {
  if(node !== null) {
    callback(node.key)
    preOrderTraverseNode(node.left, callback)
    preOrderTraverseNode(node.right, callback)
  }
}
```

### 后序遍历

后序遍历则是先访问节点的后代节点，再访问节点本身。后序遍历的一种应用是计算一个目录和它的子目 中所有文件所占空间的大小

```js
const postOrderTraverseNode = function(node, callback) {
  if(node !== null) {
    postOrderTraverseNode(node.left, callback)
    postOrderTraverseNode(node.right, callback)
    callback(node.key)
  }
}
```

### Use Tree

```js
const tree = new BinarySearchTree()
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)

function printTreeNode(value) {
  console.log(value)
}

tree.inOrderTraverse(printTreeNode)
tree.preOrderTraverse(printTreeNode)
tree.postOrderTraverse(printTreeNode)
```
