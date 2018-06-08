This is dropdownlist control with multiple column to display.
Written in JavaScript as JQuery extension.
Script requires jQuery and Bootstrap.

How to use:

1) Add jQuery
2) Add Bootstrap
3) Add dropDownMultiColumn script
4) Add to html input

<input type="text" class="form-control" id="_input" placeholder="Search" />

5) In script section call DropDownMultiColumn function as jQuery extension and pass to this function object with data

var _model = collection of data in json format

var config = {};

config.model = _model; //json collection
config.captionArray = ["ColNameId","ColName1", "ColName2", "ColName3"]; // array with name of column captions to display, the first item must be name for Id column
config.tableCssClass = "someCssClass"; // css clas for dropped table
config.displayProperty = "ColName2"; // name of property to display in input
config.idIsVisible = true; // bool is Id column visible in dropped table or not
    
$("#_input").DropDownMultiColumn(config);
$("#_input").attr("inputValue"); // call it to get selected value
