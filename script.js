function get(x,y)
{
    return document.querySelector("table").querySelectorAll("tr")[y].children[x];
}

function getRow(n)
{
    return [get(0,n), get(1,n), get(2,n)];
}

function getColumn(n)
{
    return [get(n,0), get(n,1), get(n,2)];
}

function isDiagonal(x,y)
{
    return x == y || x + y == 2;
}

function getDiagonals()
{
    return [
        [get(0,0), get(1,1), get(2,2)],
        [get(2,0), get(1,1), get(0,2)]
    ]
}

function getAll(x,y)
{
    var result = [getColumn(x).map(el=>el.innerHTML), getRow(y).map(el=>el.innerHTML)];
    if(isDiagonal(x,y))
    {
        result.push(...getDiagonals().map(a=>a.map(el=>el.innerHTML)));
    }
    return result;
}

function getScore(x,y)
{
    return Math.max(...getAll(x,y).filter(arr=>arr.indexOf("X")==-1).map(arr=>arr.filter(t=>t == "O").length));
}

function respond()
{
    var free = [];
    for(let i=0; i<3; i++)
    {
        for(let j=0; j<3; j++)
        {
            if(get(i,j).innerHTML == " ")
            {
                free.push([i,j]);
            }
        }
    }
    var beneficial = free.filter(o => getAll(...o).filter(arr=>arr.indexOf("X")==-1).length > 0);
    
    beneficial.sort((a,b)=>getScore(...b) - getScore(...a));
    if(beneficial.length > 0)
    {
        get(...beneficial[0]).innerHTML = "O";
    }
    else
    {
        stop();
    }
}

function find(char)
{
    for(let i=0; i<3; i++)
    {
        let row = getRow(i);
        if(row.filter(el=>el.innerHTML==char).length == 3)
        {
            return row;
        }
        let column = getColumn(i);
        if(column.filter(el=>el.innerHTML==char).length == 3)
        {
            return column;
        }
    }
    for(let diagonal of getDiagonals())
    {
        if(diagonal.filter(el=>el.innerHTML==char).length == 3)
        {
            return diagonal;
        }
    }
    return [];
}

function clickHandler(e)
{
    e.target.innerHTML = "X";
    if(find("X").length > 0)
    {
        find("X").forEach(el=>el.style.color = "green");
        stop();
    }
    else
    {
        respond();
        find("O").forEach(el=>el.style.color = "red");
        if(find("O").length > 0)
        {
            stop();
        }
    }
}

function stop()
{
    for(let td of document.querySelectorAll("td"))
    {
        td.removeEventListener("click", clickHandler)
    }
}

for(let td of document.querySelectorAll("td"))
{
    td.addEventListener("click", clickHandler)
}