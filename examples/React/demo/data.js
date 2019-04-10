"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
let name = 'lyz';
class Page extends React.Component {
    render() {
        return (<div>
        Hello!  I am {name}
      </div>);
    }
}
react_dom_1.default.render(<Page />, document.getElementById('app'));
//# sourceMappingURL=data.js.map