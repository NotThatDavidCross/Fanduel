function lineup() {

  /* Set min_salary and min_points to limit the lineups that get selected */
  var min_salary = 55000;
  var min_points = 155;

  var player_list = [];
  var lineup_list = [];
  var lineup_salary = 0;
  var lineup_count = 0;
  var lineup_points = 0.0;

  player_list.push(player_hash("LeBron James", 51.12, 15500));
  player_list.push(player_hash("Anthony Davis", 50.92, 14500));
  player_list.push(player_hash("Jimmy Butler", 41.28, 14000));
  player_list.push(player_hash("Bam Adebayo", 39.89, 13500));
  player_list.push(player_hash("Tyler Herro", 22.46, 11000));
  player_list.push(player_hash("Goran Dragic", 27.71, 10500));
  player_list.push(player_hash("Rajon Rondo", 18.90, 10000));
  player_list.push(player_hash("Jae Crowder", 24.70,9500));
  player_list.push(player_hash("Duncan Robinson", 20.64, 9000));
  player_list.push(player_hash("Danny Green", 18.26, 9000));
  player_list.push(player_hash("Kentavious Caldwell-Pope", 16.42, 8500));
  player_list.push(player_hash("Kyle Kuzma", 21.32, 8000));
  player_list.push(player_hash("Dwight Howard", 20.85, 8000));
  player_list.push(player_hash("Andre Iguodala", 16.43, 7500));
  player_list.push(player_hash("Alex Caruso", 13.96, 7000));
  player_list.push(player_hash("Markieff Morris", 17.33, 7000));
  player_list.push(player_hash("JaVale McGee", 19.18, 6500));
  player_list.push(player_hash("Kelly Olynyk", 18.24, 6500));
  player_list.push(player_hash("Kenrick Nunn", 24.86, 6500));
  player_list.push(player_hash("Solomon Hill", 13.41, 6500));
  player_list.push(player_hash("Talen Horton-Tucker", 12.07, 6000));
  player_list.push(player_hash("Gabe Vincent", 5.67, 6000));
  player_list.push(player_hash("Jared Dudley", 4.85, 6000));
  player_list.push(player_hash("Kyle Alexander", 2.30, 6000));
  player_list.push(player_hash("Derrick Jones", 19.16, 6000));
  player_list.push(player_hash("Chris Silva", 8.56, 6000));
  player_list.push(player_hash("Dion Waiters", 18.38, 6000));
  player_list.push(player_hash("Quinn Cook", 8.36, 6000));
  player_list.push(player_hash("JR Smith", 4.42, 6000));
  player_list.push(player_hash("KZ Okpala", 4.50, 6000));
  player_list.push(player_hash("Kostas Antetokounmpo", 2.52, 6000));
  player_list.push(player_hash("Devontae Cacok", 13.50, 6000));
  player_list.push(player_hash("Udonis Haslem", 7.93, 6000));
  player_list.push(player_hash("Meyers Leonard", 14.74, 6000));

  for (i = 0; i < 3; i++) {
    for (j = i+1; j < 3; j++) {
      for (k = j+1; k < player_list.length; k++) {
        for (l = k+1; l < player_list.length; l++) {
          for (m = l+1; m < player_list.length; m++) {
            lineup_salary = player_list[i]["salary"] + player_list[j]["salary"] + player_list[k]["salary"] + player_list[l]["salary"] + player_list[m]["salary"];
            lineup_points = player_list[i]["points"] + player_list[j]["points"] + player_list[k]["points"] + player_list[l]["points"] + player_list[m]["points"];
            if (lineup_salary <= 60000 && lineup_salary >= min_salary && lineup_points >= min_points) {
              lineup_count++;
              lineup_list.push(lineup_hash(lineup_points, lineup_salary, player_list[i]["name"], player_list[j]["name"], player_list[k]["name"], player_list[l]["name"], player_list[m]["name"]));
            }
          }
        }
      }
    }
  }

  var num_lineups = document.getElementById("num_lineups");
  num_lineups.innerHTML = lineup_count;

  lineup_list.sort(function(a, b){return b.points - a.points});

  var table = document.getElementById("wtf");

  for (i=0; i < lineup_list.length; i++) {
    var row = table.insertRow(-1);
    var cell_points = row.insertCell(0);
    var cell_salary = row.insertCell(1);
    var cell_player1 = row.insertCell(2);
    var cell_player2 = row.insertCell(3);
    var cell_player3 = row.insertCell(4);
    var cell_player4 = row.insertCell(5);
    var cell_player5 = row.insertCell(6);

    cell_points.innerHTML = lineup_list[i]["points"].toFixed(2);
    cell_salary.innerHTML = "$" + lineup_list[i]["salary"];
    cell_player1.innerHTML = lineup_list[i]["player1"];
    cell_player2.innerHTML = lineup_list[i]["player2"];
    cell_player3.innerHTML = lineup_list[i]["player3"];
    cell_player4.innerHTML = lineup_list[i]["player4"];
    cell_player5.innerHTML = lineup_list[i]["player5"];

  }

}

function player_hash(name, points, salary) {
  var p = {};
  p["name"] = name;
  p["points"] = points;
  p["salary"] = salary;
  return p;
}

function lineup_hash(points, salary, player1, player2, player3, player4, player5) {
  var l = {};
  l["points"] = points;
  l["salary"] = salary;
  l["player1"] = player1;
  l["player2"] = player2;
  l["player3"] = player3;
  l["player4"] = player4;
  l["player5"] = player5;
  return l;
}
