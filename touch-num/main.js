'use strict'
function onInit(){
    startGame('easy');
}

function startGame(mode){
    var size = 0;
    switch (mode){
        case 'medium':
            size = 25;
            break;
        case 'hard':
            size = 36;
            break;
        case 'easy': 
        default:
            size = 16;
            break;
    }

    var div = document.querySelector('.myDynamicTable');
    var table = document.createElement('table');
    table.className= 'table';
    var tableBody = document.createElement('tbody');
    var numberOfRowCols = Math.sqrt(size);

    var allNums = Array(size).fill().map((_, i) => i * 1);
    shuffleArray(allNums);

    for (var i = 0; i < numberOfRowCols; i++) {
        var tr = document.createElement('tr');
        tableBody.appendChild(  tr   );
        for (var j = 0; j < numberOfRowCols; j++) {
            var td =  document.createElement('td');
            td.className = 'td';
            td.onclick =  function (evt) { choose(this); }
            var span = document.createElement('span');

            span.innerText =  allNums.pop();
            td.appendChild(span) 
                tr.appendChild(  td     ) ;
        }
    }
    table.appendChild (tableBody);
    div.appendChild (table);

}

function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function choose(cell){
    console.log('cell:', cell)
    cell.className += ' choose';
}