const speedBFS = 50;

//Create a list that represents all unit. 
//"False" means not passed yet. "True" means already passed.
const bfsVisited = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));


//Create a Queue that store all possible routes
let queue = []; 
bfsVisited[0][0] = true; //Starting point

const bfs = (row, column) =>{
    if(row == cellsVertical-1 && column == cellsHorizontal -1 ) return;
    
    if(row - 1 >= 0 && horizontals[row-1][column] == true && bfsVisited[row-1][column] == false){//Up
        bfsVisited[row-1][column] = true;
        console.log("Up " + (row-1) + column);
        queue.push([row-1,column]);
    }
    if(column - 1 >= 0 && verticals[row][column-1] == true && bfsVisited[row][column-1] == false){//Left
        bfsVisited[row][column-1] = true;
        console.log("Left " + row + (column - 1));
        queue.push([row,column-1]);
    }
    if(row +1 < cellsVertical  && horizontals[row][column] == true && bfsVisited[row+1][column] == false ){//Down
        bfsVisited[row+1][column] = true;
        console.log("Down " + (row+1) +" " + column);
        queue.push([row+1,column]);
    }
    if(column  < cellsHorizontal && verticals[row][column] == true && bfsVisited[row][column+1] == false){//Right
        bfsVisited[row][column+1] = true;
        console.log("Right " + row + " "+(column+1) );
        queue.push([row,column+1]);
    }
    setTimeout(function(){
    let temp = queue.shift();
    
    let tempX = temp[0];
    let tempY = temp[1];
            
    World.add(world, Bodies.rectangle(unitLengthX  * tempY + unitLengthX / 2, unitLengthY  * tempX + unitLengthY / 2, unitLengthX * .8, unitLengthY * .8, {isStatic:true, render:{fillStyle: 'yellow'}}));
    bfs(tempX,tempY);
    }, speedBFS);
    
    
}
