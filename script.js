function get(x,y)
{
    return document.querySelector("table").querySelectorAll("tr")[y].children[x];
}

function getRow(n)
{
    return [get(0,n).innerHTML, get(1,n).innerHTML, get(2,n).innerHTML];
}

function getColumn(n)
{
    return [get(n,0).innerHTML, get(n,1).innerHTML, get(n,2).innerHTML];
}

function isDiagonal(x,y)
{
    return x == y || x + y == 2;
}

function getDiagonals()
{
    return [
        [get(0,0).innerHTML, get(1,1).innerHTML, get(2,2).innerHTML],
        [get(2,0).innerHTML, get(1,1).innerHTML, get(0,2).innerHTML]
    ]
}

function getAll(x,y)
{
    var result = [getColumn(x), getRow(y)];
    if(isDiagonal(x,y))
    {
        result.push(...getDiagonals());
    }
    return result;
}

for(let td of document.querySelectorAll("td"))
{
    td.addEventListener("click", e=>{
        e.target.innerHTML = "X";
    })
}