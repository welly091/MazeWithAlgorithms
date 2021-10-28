const{ Engine, Render, Runner, World, Bodies, Body, Events} = Matter;

const cellsHorizontal = 40;
const cellsVertical = 30;
const width = window.innerWidth;
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal; 
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
engine.world.gravity.y=0;
const{ world } = engine;

const render = Render.create({
    element: document.body,
    engine: engine,
    options:{
        wireframes: false,
        width,
        height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine);


//Position and size.
//x, y, wide, tall 
const walls = [
    Bodies.rectangle(width/2, 0, width, 2, {isStatic: true}),
    Bodies.rectangle(width/2, height, width, 2, {isStatic: true}),
    Bodies.rectangle(0, height/2, 2, height, {isStatic: true}),
    Bodies.rectangle(width, height/2, 2, height, {isStatic: true}),
];

World.add(world, walls);


//Maze generation

const shuffle = (arr) =>{
    let counter = arr.length;

    while(counter>0){
        const index = Math.floor(Math.random() * counter);
        counter--;
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

const grid = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));
    //.map() will iterate each element and create new elements(here is 'arrays')

const verticals = Array(cellsVertical)
    .fill(null)
    .map(() => Array(cellsHorizontal-1).fill(false));

const horizontals = Array(cellsVertical-1)
    .fill(null)
    .map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const stepThroughCell = (row, column) =>{
    //If cells are visited at [row, colum], return
    if(grid[row][column]){
        return;
    }

    //Mark the cell as being visited
    grid[row][column] = true;

    //Aseemble randomly-ordered list of 'neighbors'
    const neighbors = shuffle([
        [row - 1, column, 'up'],
        [row, column + 1, 'right'],
        [row + 1,column, 'down'],
        [row, column - 1, 'left'],
    ]);
    
    //For each neighbor...
    for(let neighbor of neighbors){
        const [nextRow, nextColumn, direction] = neighbor;
    
    //See if that neighbor is out of bounds
        if(nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal){
            continue;
        }
    //If we have visited that neighbor continue to next neighbor
        if(grid[nextRow][nextColumn]){
            continue;
        }
    //Remove a wall from either horizontals or verticals
    if(direction === 'left'){
        verticals[row][column-1] = true;
    }else if(direction === 'right'){
        verticals[row][column]= true;
    }else if(direction === 'down'){
        horizontals[row][column] = true;
    }else if(direction === 'up'){
        horizontals[row-1][column]=true;
    }
    //Visited that next cell 
    stepThroughCell(nextRow, nextColumn);
    }
};

stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex )=> {
    row.forEach((open, columnIndex) =>{
        if(open === true){
            return;
        }
        //If the element is 'False'
        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX / 2,
            rowIndex * unitLengthY + unitLengthY,
            unitLengthX,
            5,
            {
                label: 'wall',
                isStatic: true,
                render:{
                    fillStyle: 'pink'
                }
            }
        );
        World.add(world, wall);
    });
});

verticals.forEach((row, rowIndex) =>{
    row.forEach((open, columnIndex) =>{
        if(open === true){
            return;
        }
        //If the element is 'False'
        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX,
            rowIndex * unitLengthY + unitLengthY / 2,
            5,
            unitLengthY,
            
            {
                label: 'wall',
                isStatic: true,
                render:{
                    fillStyle: 'pink'
                }
            }
        );
        World.add(world, wall);
    });
});

//This is the goal rectangle
const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX *.8,
    unitLengthY *.8,
    {
        label: 'goal',
        isStatic: true,
        render:{
            fillStyle: 'green'
        }
    }
)
World.add(world, goal);

//Start Point
const startPoint = Bodies.rectangle(
    unitLengthX / 2,
    unitLengthY / 2,
    unitLengthX * .8,
    unitLengthY * .8,
    {
        label:'startPoint',
        render:{
        fillStyle: 'yellow'
    }
} );

World.add(world, startPoint);

//Win Condition
Events.on(engine,'collisionStart', event =>{
    event.pairs.forEach(collision =>{
        const labels = ['startPoint', 'goal'];
        if(labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)){
            document.querySelector('.winner').classList.remove('hidden');
            world.gravity.y=1;
            world.bodies.forEach(body=>{
                if(body.label === 'wall'){
                    Body.setStatic(body, false);
                }
            })
        }
    });
});


document.getElementById("ok").addEventListener("click",function(){
    let x = document.getElementById("welcome");
    let selectAlgo = document.getElementsByName("algorithm");
        for(let i = 0; i < selectAlgo.length; i++){
            if(selectAlgo[i].checked){
                if(selectAlgo[i].value == 1){
                    x.style.display="none";
                    bfs(0,0);
                }else if(selectAlgo[i].value == 2){
                    x.style.display= "none";
                    dfs(0,0);
                }
            } 
        }
});

