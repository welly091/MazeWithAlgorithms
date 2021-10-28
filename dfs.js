const dfsVisited = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));
const speedDFS = 50;
let stack = []; 
dfsVisited[0][0] = true; //Starting point

const dfs = (row, column) =>{
    if(row == cellsVertical-1 && column == cellsHorizontal -1 ) return;
    if(row - 1 >= 0 && horizontals[row-1][column] == true && dfsVisited[row-1][column] == false){//Up
        dfsVisited[row-1][column] = true;
        console.log("Up " + (row-1) + column);
        stack.push([row-1,column]);
    }
    if(column - 1 >= 0 && verticals[row][column-1] == true && dfsVisited[row][column-1] == false){//Left
        dfsVisited[row][column-1] = true;
        console.log("Left " + row + (column - 1));
        stack.push([row,column-1]);
    }
    if(row +1 < cellsVertical  && horizontals[row][column] == true && dfsVisited[row+1][column] == false ){//Down
        dfsVisited[row+1][column] = true;
        console.log("Down " + (row+1) +" " + column);
        stack.push([row+1,column]);
    }
    if(column  < cellsHorizontal && verticals[row][column] == true && dfsVisited[row][column+1] == false){//Right
        dfsVisited[row][column+1] = true;
        console.log("Right " + row + " "+(column+1) );
        stack.push([row,column+1]);
    }
    setTimeout(function(){
    let temp = stack.pop();
    
    let tempX = temp[0];
    let tempY = temp[1];
            
    World.add(world, Bodies.rectangle(unitLengthX  * tempY + unitLengthX / 2, unitLengthY  * tempX + unitLengthY / 2, unitLengthX * .8, unitLengthY * .8, {isStatic:true, render:{fillStyle: 'yellow'}}));
    dfs(tempX,tempY);
    }, speedDFS);
}
