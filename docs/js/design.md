# JS中的设计模式

面向委托设计

1. 在prototype的委托中，把状态保存在委托者上
2. 尽量避免prototype链中使用相同的命名

```js
var Task = {
  setID: function(ID) { this.id = ID; },
  outputID: function() { console.log( this.id ); }
}

// 让 Pone 委托 Task
var Pone = Object.create( Task );
Pone.prepareTask = function(ID,Label) {
  this.setID( ID );
  this.label = Label;
};

Pone.outputTaskDetails = function() {
  this.outputID();
  console.log( this.label );
};

var Ptwo = Object.create( Task )
Ptwo.introduce = function( ID, name, age ) {
  this.setID( ID )
  this.name = name
  this.age = age
}

Ptwo.showMe = function() {
  this.outputID();
  console.log( this.name )
}
```

`类`继承的经典的写法
```js
function Foo( who ) {
  this.me = who
}

Foo.prototype.indentify = function() {
  return 'I am ' + this.me
}

function Bar( who ) {
  Foo.call( this, who )
}

Bar.prototype = Object.create( Foo.prototype )

Bar.prototype.speak = function() {
  alert("Hello, " + this.indentify() + ".")
}

var b1 = new Bar( 'b1' )
var b2 = new Bar( 'b2' )

b1.speak()
b2.speak()
```

下面用对象关联的方法来编写完全相同功能的代码

```js
Foo = {
  init: function(who) {
    this.me = who
  },
  indentify: function() {
    return 'I am ' + this.me
  }
}

Bar = Object.create(Foo)

Bar.speak = function() {
  alert( 'Hell, ' + this.indentify() + '.')
}

var b1 = Object.create( Bar )
b1.init( 'b1' )
var b2 = Object.create( Bar )
b2.init()

b1.speak()
b2.speak()
```

- 上面这段代码同样使用`prototype`把b1委托给Bar并把Bar委托给Foo,和上段一代码实现的功能是一样的。

```js
var Widget = {
  init: function(width, height) {
    this.width = width || 60
    this.height = height || 30
    this.$elem = null
  },
  insert: function(where) {
    if(this.$elem) {
      this.$elem.css({
        width: this.width + 'px',
        height: this.height + 'px'
      }).appendTo(where)
    }
  }
}

var Button = Object.create(Widget)

Button.setup = function(width, height, label) {
  // 委托调用
  this.init(width, height)
  this.label = label || 'Default'
  this.$elem = $('button').text(this.label)
}

Button.build = function(where) {
  this.insert(where)
  this.$elem.click(this.onClick.bind(this))
}

Button.onClick = function(evt) {
  console.log('Button ' + this.label + 'clicked!')
}

$(document).read(function() {
  var $body = $(document.body)

  var btn1 = Object.create(Button)
  btn1.setup(100, 40, 'Hello')

  var btn2 = Object.create(Button)
  btn2.setup(150, 40, 'Word')

  btn1.build($body)
  btn2.build($body)
})
```

反类

```js
var LoginController = {
  errors: [],
  getUser: function() {
    return document.getElementById('username').value
  },
  getPwd: function() {
    return document.getElementById('password').value
  },
  validateEntry: function(user, pwd) {
    user = user || this.getUser()
    pwd = pwd || this.getPwd()

    if(!(user && pwd)) {
      return this.failure('Place enter a username & password')
    }
    else if(pwd.length < 5) {
      return this.failure('Password must be 5+ characters')
    }
    return true
  },
  showDialog: function(title, msg) {},
  failure: function(err) {
    this.errors.push(err)
    this.showDialog('Error', 'Login invalid' + err)
  }
}

var AuthController = Object.create(LoginController)

AuthController.errors = []

AuthController.checkAuth = function() {
  var user = this.getUser()
  var pwd = this.getPwd()

  if(this.validateEntry(user, pwd)) {
    this.server('/check-auth', {
      user: user,
      pwd: pwd
    })
    .then(this.accepted.bind(this))
    .fail(this.rejected.bind(this))
  }
}

AuthController.server = function(url, data) {
  return $.ajax({
    url: url,
    data: data
  })
}
AuthController.accepted = function() {
  this.showDialog('success', 'Authenicated')
}
AuthController.rejected = function(err) {
  this.failure('Auth Failed' + err)
}

var controller1 = Object.create( AuthController )
var controller2 = Object.create( AuthController )
```
