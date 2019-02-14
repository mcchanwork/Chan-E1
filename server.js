var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
  try
  {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == undefined)
      throw Error("A command must be specified");
      
    var result = {};
    if (query['cmd'] == 'calcDistance')
    {
      result = calcDistance(query);
    }
    else if (query['cmd'] == 'calcCost')
    {
      result = calcCost(query);
    }   
    else
    {
      throw Error("Invalid command: " + query['cmd']);
    }
 
    res.write(JSON.stringify(result));
    res.end('');
  }
  catch (e)
  {
    var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end('');
  }
}

function calcDistance(query)
{
  //Logging input
  console.log("Handling a request");
  console.log(query);
  
  //Error check value for budget
  if(isNaN(query['budget']))
  {
    throw Error("Invalid value for budget");
  }
  else
  {
    if (query['budget'] == undefined || query['budget']<0)
    throw Error("Invalid value for budget");
  }
  //Error check value for mpg
  if(isNaN(query['mpg']))
  {
    throw Error("Invalid value for mpg");
  }
  else
  {
    if(query['mpg'] == undefined || query['mpg']<0)
    {
      throw Error("Invalid value for mpg");
    }
  }
  //Error check value for fuelCost
  if(isNaN(query['fuelCost']))
  {
    throw Error("Invalid value for mpg");
  }
  else
  {
    if(query['fuelCost'] == undefined || query['fuelCost']<0)
    {
      throw Error("Invalid value for fuelCost");
    }
  }
  
  //ParseInt input into working numbers
  var budget = parseInt(query['budget']);
  var mpg = parseInt(query['mpg']);
  var fuelCost = parseInt(query['fuelCost']);
  
  //Calculation
  var distance = budget / fuelCost * mpg;

  var result = {'distance' : distance}; 
  return result;
}



function calcCost(query)
{
  //Logging input
  console.log("Handling a request");
  console.log(query);
   //Error check value for distance
  if(isNaN(query['distance']))
  {
    throw Error("Invalid value for distance");
  }
  else
  {
    if (query['distance'] == undefined || query['distance']<0)
    throw Error("Invalid value for distance");
  }
  //Error check value for mpg
  if(isNaN(query['mpg']))
  {
    throw Error("Invalid value for mpg");
  }
  else
  {
    if(query['mpg'] == undefined || query['mpg']<0)
    {
      throw Error("Invalid value for mpg");
    }
  }
  //Error check value for fuelCost
  if(isNaN(query['fuelCost']))
  {
    throw Error("Invalid value for fuelCost");
  }
  else
  {
    if(query['fuelCost'] == undefined || query['fuelCost']<0)
    {
      throw Error("Invalid value for fuelCost");
    }
  }
  
  //Parsing input into valid numbers
  var distance = parseInt(query['distance']);
  var mpg = parseInt(query['mpg']);
  var fuelCost = parseInt(query['fuelCost']);
  
  //Calculations
  var cost = distance / mpg * fuelCost;
  
  var result = {'cost' : cost};
  return result;
}