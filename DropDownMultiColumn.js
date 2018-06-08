jQuery.fn.extend({
    DropDownMultiColumn: function (configuration) {

        var model = JSON.parse(configuration.model);
        var captionArr = configuration.captionArray;
        var displayProperty = configuration.displayProperty;
        var idIsVisible = configuration.idIsVisible === undefined ? true : configuration.idIsVisible;
        var tableCssClass = configuration.tableCssClass;

        var Input = this;
        var Table;
        var Rows;
        var inputPreviousValue = "";

        if (captionArr !== undefined && captionArr !== null) {

            var colCount = captionArr.length;

            if (model !== undefined && model !== null) {
                var displayPropertyIndex = getDisplayPropertyIndex();

                function getDisplayPropertyIndex() {
                    //var list = Object.getOwnPropertyNames(model[0]);
                    var list = captionArr;
                    for (var index in list) {
                        if (list[index] == displayProperty) {
                            return index;
                        }
                    }
                }

                var tab = $("<table></table>").addClass("table table-bordered table-hover table-container").addClass(tableCssClass).attr('id', '_table');
                var head = $("<thead></thead>");
                var body = $("<tbody></tbody>");

                var trHead = $("<tr></tr>");
                for (var i = 0; i < colCount; i++) {
                    var th;
                    if (i == 0 && !idIsVisible) {
                        th = $("<th></th>").text(captionArr[i]).css("visibility", "collapse");
                    }
                    else {
                        th = $("<th></th>").text(captionArr[i]);
                    }

                    trHead.append(th);
                }

                for (var i = 0; i < model.length; i++) {
                    var trBody = $("<tr></tr>");
                    for (var j = 0; j < colCount; j++) {
                        var td;
                        if (j == 0 && !idIsVisible) {
                            td = $("<td></td>").text(model[i][captionArr[j]]).css("visibility", "collapse");
                        }
                        else {
                            td = $("<td></td>").text(model[i][captionArr[j]]);
                        }
                        trBody.append(td);
                    }
                    body.append(trBody);
                }

                head.append(trHead);
                tab.append(head);
                tab.append(body);

                $("#_input").after(tab);


                $('#_table').hide();

                Input.focusin(function () {
                    $('#_table').show();
                    inputPreviousValue = Input.val();
                }).focusout(function focOut() {
                    if (!$('#_table').is(':hover')) {
                        $('#_table').hide();
                    }
                });

                $("#_table tbody tr").click(function () {
                    var value = ($(this).closest('tr').children('td')[0]).innerHTML;
                    var text = ($(this).closest('tr').children('td')[displayPropertyIndex]).innerHTML;
                    Input.val(text);
                    Input.attr("inputValue", value);
                    $('#_table').hide();
                });

                Rows = jQuery.extend({}, document.getElementById("_table").rows);

                Input.on('input', function (e) {
                    Table = document.getElementById("_table");
                    var searchValue = e.target.value;

                    if (inputPreviousValue.length < searchValue.length) {
                        removeRowsFromTable(searchValue);
                    }
                    else {
                        addRowsToTable(searchValue);
                    }
                });

                function removeRowsFromTable(searchValue) {
                    var allRows = document.getElementById("_table").rows;
                    var idArrToDel = [];
                    for (var i = 1; i < allRows.length; i++) {
                        var cells = allRows[i].getElementsByTagName('td');
                        var strToCheck = "";
                        for (var j = 1; j < cells.length; j++) {//from second td because first td is Id
                            strToCheck += cells[j].innerHTML + " ";
                        }

                        idArrToDel.push(rowToDelIndexArr(cells[0].innerHTML, strToCheck));
                    }

                    for (var i = 0; i < idArrToDel.length; i++) {
                        var id = idArrToDel[i];
                        if (id !== undefined) {
                            var index = getIndexById(id);
                            document.getElementById("_table").deleteRow(index);
                        }
                    }

                    function getIndexById(id) {
                        for (var i = 1; i < Table.rows.length; i++) {
                            var value = Table.rows[i].cells[0].innerHTML;
                            if (value == id) {
                                return i;
                            }
                        }
                    }

                    function rowToDelIndexArr(id, strToCheck) {
                        if (!strToCheck.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
                            return id;
                        }
                    }

                    inputPreviousValue = Input.val();
                }

                function addRowsToTable(searchValue) {
                    var idArrToAdd = [];
                    for (var i = 1; i < Rows.length; i++) {
                        var cells = Rows[i].getElementsByTagName('td');
                        var strToCheck = "";
                        for (var j = 1; j < cells.length; j++) {//from second td because first td is Id
                            strToCheck += cells[j].innerHTML + " ";
                        }

                        idArrToAdd.push(rowToAddIndexArr(cells[0].innerHTML, strToCheck));
                    }

                    function rowToAddIndexArr(id, strToCheck) {
                        if (strToCheck.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
                            return id;
                        }
                    }

                    for (var i = 0; i < idArrToAdd.length; i++) {
                        var id = idArrToAdd[i];
                        if (id !== undefined) {
                            var index = getIndexById(id);
                            var trToAdd = Rows[index];
                            $("#_table").append(trToAdd);
                        }
                    }

                    function getIndexById(id) {
                        for (var i = 1; i < Rows.length; i++) {
                            var value = Rows[i].cells[0].innerHTML;
                            if (value == id) {
                                return i;
                            }
                        }
                    }

                    inputPreviousValue = Input.val();
                }
            }
            else {
                console.log("model is null or undefined!!!");
            }
        }
        else {
            console.log("captionArray is null or undefined!!!");
        }
    }
});
