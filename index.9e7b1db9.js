const Pet = (props)=>{
    return React.createElement("div", {}, [
        React.createElement("h1", {}, props.dogName), 
    ]);
};
const App = ()=>{
    return React.createElement("div", {}, [
        React.createElement("h1", {
            class: "interesting title"
        }, "Hello World!"),
        React.createElement("h2", null, "Hello again"),
        React.createElement(Pet, {
            dogName: "a great big dog"
        }),
        React.createElement(Pet, {
            dogName: "a great big cat"
        }),
        React.createElement(Pet, {
            dogName: "grumpy pigeon"
        }), 
    ]);
};
ReactDOM.render(React.createElement(App), document.getElementById("root")); //will change in React18

//# sourceMappingURL=index.9e7b1db9.js.map
