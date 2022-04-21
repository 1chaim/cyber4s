const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';

let clickedCell;
let table;
let pieces = [];

function onSelectCell(event,row,col) {
        console.log(row);
      console.log(col);

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove('possible-move')
        }
    }
    for (let piece of pieces) {
        if (piece.row === row && piece.col === col) {
            console.log(piece);
            let possibleMoves = piece.getPossibleMoves();
            // if the spot on the board contains a chess-piece (and not an empty spot) -> 
            // -> then check && highlight the possible-moves for that chess-piece
            for (let possibleMove of possibleMoves)
                table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
        }
    }

    if (clickedCell !== undefined) {
        clickedCell.classList.remove('cell-click')
    }
    clickedCell = event.currentTarget
    clickedCell.classList.add('cell-click')

}

//adding images
let addImage = (cell, type, name) => {
    const image = document.createElement('img');
    image.src = 'images/' + type + '/' + name + '.png'
    cell.appendChild(image)
}
// adding pieces
// let addImageByIndex = (cell, type, index) => {
//     if (index === 0 || index === 7) {
//         addImage(cell, type, 'rook')
//     } else if (index === 1 || index === 6) {
//         addImage(cell, type, 'knight')
//     } else if (index === 2 || index === 5) {
//         addImage(cell, type, 'bishop')
//     } else if (index === 3) {
//         addImage(cell, type, 'king')
//     } else if (index === 4) {
//         addImage(cell, type, 'queen')
//     }
// }


class Piece {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }
    getPossibleMoves() {
        let relativeMoves;
        if (this.type === 'rook') {
            relativeMoves = this.getRookRelativeMoves();
        } if (this.type === 'knight') {
            relativeMoves = this.getKnightRelativeMoves();
        } if (this.type === 'bishop') {
            relativeMoves = this.getBishopRelativeMoves();
        } if (this.type === 'queen') {
            relativeMoves = this.getQueenRelativeMoves();
        } if (this.type === 'king') {
            relativeMoves = this.getKingRelativeMoves();
        } if (this.type === 'pawn') {
            relativeMoves = this.getPawnRelativeMoves();
        }
        // console.log(relativeMoves)


        let absoluteMoves = [];
        for (let relativeMove of relativeMoves) {
            console.log(relativeMove)
            const absoluteRow = this.row + relativeMove[0];
            const absoluteCol = this.col + relativeMove[1];
            console.log([absoluteRow,absoluteCol])
            absoluteMoves.push([absoluteRow, absoluteCol])
        }
        // console.log(absoluteMoves)

        let filteredMoves = [];
        for (let absoluteMove of absoluteMoves) {
            const absoluteRow = absoluteMove[0];
            const absoluteCol = absoluteMove[1];
            if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteRow <= 7) {
                filteredMoves.push(absoluteMove)
            }

        }
        console.log([filteredMoves])

        return filteredMoves;

    }



    getRookRelativeMoves() {
        let result = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            result.push([i, 0])
            result.push([0, i])
            result.push([-i, 0])
            result.push([0, -i])
        }
        return result;
    }
    getKnightRelativeMoves() {
        let result = [];
        result.push([2, 1])
        result.push([2, -1])
        result.push([-2, 1])
        result.push([-2, -1])
        result.push([1, 2])
        result.push([-1, 2])
        result.push([1, -2])
        result.push([-1, -2])

        return result;
    }
    getBishopRelativeMoves() {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
                result.push([i, i])
                result.push([-i, -i])
                result.push([i, -i])
                result.push([-i, i])
            
        }
        return result;
    }
    getQueenRelativeMoves() {
        let result = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                result.push([i, j])
                result.push([-i, -j])
                result.push([i, -j])
                result.push([-i, j])
                result.push([i, 0])
                result.push([0, i])
                result.push([-i, 0])
                result.push([0, -i])
            }
        }
        return result;
    }
    getKingRelativeMoves() {
        let result = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                result.push([1, 1])
                result.push([1, 0])
                result.push([1, -1])
                result.push([-1, 1])
                result.push([-1, 0])
                result.push([-1, -1])
                result.push([0, 1])
                result.push([0, -1])
            }
        }
        return result;
    }
    getPawnRelativeMoves() {
        return ([[1, 0]])
    }




}

function getInitialBoard() {
    let listPieces = [];
    addPieces(listPieces, 0,BLACK_PLAYER);
    addPieces(listPieces, 7, WHITE_PLAYER);

    for (let i = 0; i < BOARD_SIZE; i++) {
        listPieces.push(new Piece(1, i, PAWN, BLACK_PLAYER));
        listPieces.push(new Piece(6, i, PAWN, WHITE_PLAYER));
    }
    return listPieces;
}
//create pieces 
function addPieces(result, row, player) {
    result.push(new Piece(row, 0, ROOK, player));
    result.push(new Piece(row, 1, KNIGHT, player));
    result.push(new Piece(row, 2, BISHOP, player));
    result.push(new Piece(row, 3, QUEEN, player));
    result.push(new Piece(row, 4, KING, player));
    result.push(new Piece(row, 5, BISHOP, player));
    result.push(new Piece(row, 6, KNIGHT, player));
    result.push(new Piece(row, 7, ROOK, player));
}


function createChessBoard() {
    let body = document.querySelector('body');
     table = document.createElement('table');
    body.appendChild(table);

    for (let row = 0; row < BOARD_SIZE; row++) {
        const rowElement = table.insertRow();
        // table.appendChild(row);

        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = rowElement.insertCell();
            // tr.appendChild(cell);

            if ((row + col) % 2 === 1) {
                cell.className = 'cell'
                cell.classList.add('bla')
            } else {
                cell.className = 'cell'
                cell.classList.add('whi')
            
            }

            // cell.addEventListener('click', onSelectCell);
            cell.addEventListener('click', (event) => onSelectCell(event, row, col));

            // if (row === 0) {
            //     addImageByIndex(cell, BLACK_PLAYER, col)
            // } else if (row === 7) {
            //     addImageByIndex(cell, WHITE_PLAYER, col)
            // } else if (row === 1) {
            //     addImage(cell, BLACK_PLAYER, 'pawn')
            // } else if (row === 6) {
            //     addImage(cell, WHITE_PLAYER, 'pawn')

            // }
        }
    }
    pieces = getInitialBoard();

    for (let piece of pieces) {
        addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
    }
}

window.addEventListener('load', createChessBoard);























//     board = [
//         [{ type: 'rook', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'queen', color: 'black' }, { type: 'king', color: 'black' }, { type: 'bishop', color: 'black' }, { type: 'knight', color: 'black' }, { type: 'rook', color: 'black' }]
//         [{ type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }, { type: 'pawn', color: 'black' }]
//         ['', '', '', '', '', '', '', '']
//         ['', '', '', '', '', '', '', '']
//         ['', '', '', '', '', '', '', '']
//         ['', '', '', '', '', '', '', '']
//         [{ type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }, { type: 'pawn', color: 'white' }]
//         [{ type: 'rook', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'queen', color: 'white' }, { type: 'king', color: 'white' }, { type: 'bishop', color: 'white' }, { type: 'knight', color: 'white' }, { type: 'rook', color: 'white' }]
//     ]

//     function avelibleSpotToMoveTo (board, i, j) {
//         let Piece =board [i][j]

//         switch (Piece.type) {

//             case 'knight': {
//                 while (i < BOARD_SIZE && j > 0) {
//                     const spots = [];
//                     i += 2;
//                     j++ || j--;
//                     const spot = [i][j]
//                     spots.push[spot]

//                 }
//                 while (i > 0 && j < 8) {
//                     const spots = [];
//                     i -= 2
//                     j++ || j--;
//                     const spot = [i][j]
//                     spots.push[spot]
//                 }
//                 while (i > 0 && j > 0) {
//                     const spots = [];
//                     i--
//                     j--
//                     const spot = [i][j]
//                     spots.push[spot]
//                 }
//                 while (i < 8 && j < 8) {
//                     const spots = [];
//                     i++
//                     j++
//                     const spot = [i][j]
//                     spots.push[spot]
//                 }
//             }

//             case 'rook': {
//                 while (i < 8 && j > 0) {
//                     const spots = [];
//                     i++
//                     j--
//                     const spot = [i][j]
//                     spots.push[spot]
//                 }
//                 while (i > 0 && j < 8) {
//                     const spots = [];
//                     i--
//                     j++
//                     const spot = [i][j]
//                     spots.push[spot]
//                 }
//                 while (i > 0 && j > 0) {
//                     const spots = [];
//                     i--
//                     j--
//                     const spot = [i][j]
//                     spots.push[spot]
//                 }
//                 while (i < 8 && j < 8) {
//                     const spots = [];
//                     i++
//                     j++
//                     const spot = [i][j]
//                     spots.push[spot]
//                 }
//             }
//         }



//    }