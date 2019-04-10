"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
class Child extends React.Component {
    updateName() {
        this.props.changeName('abc');
    }
    render() {
        return (<div>
        Hello React! I am a {this.props.name}
        <br />
        <button onClick={this.updateName.bind(this)}>点我改变名字</button>
      </div>);
    }
}
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: 'lyz' };
    }
    _changeName(name) {
        this.setState({
            name
        });
    }
    render() {
        return (<Child name={this.state.name} changeName={this._changeName.bind(this)}/>);
    }
}
react_dom_1.default.render(<Page />, document.getElementById('app'));
//# sourceMappingURL=props.js.map