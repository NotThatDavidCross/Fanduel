function lineup() {

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

  for (i = 0; i < 3; i++) {
    for (j = i+1; j < 3; j++) {
      for (k = j+1; k < player_list.length; k++) {
        for (l = k+1; l < player_list.length; l++) {
          for (m = l+1; m < player_list.length; m++) {
            lineup_salary = player_list[i]["salary"] + player_list[j]["salary"] + player_list[k]["salary"] + player_list[l]["salary"] + player_list[m]["salary"];
            if (lineup_salary <= 60000 && lineup_salary > 54999) {
              lineup_points = player_list[i]["points"] + player_list[j]["points"] + player_list[k]["points"] + player_list[l]["points"] + player_list[m]["points"];
              lineup_count++;
              lineup_list.push(lineup_hash(lineup_points, lineup_salary, player_list[i]["name"], player_list[j]["name"], player_list[k]["name"], player_list[l]["name"], player_list[m]["name"]));
            }
          }
        }
      }
    }
  }

  document.write(lineup_count + "<br /><br />");

  lineup_list.sort(function(a, b){return b.points - a.points});

  for (i=0; i < lineup_list.length; i++) {
    document.write(lineup_list[i]["points"].toFixed(2) + " $" + lineup_list[i]["salary"] + " " + lineup_list[i]["player1"] + " " + lineup_list[i]["player2"] + " " + lineup_list[i]["player3"] + " " + lineup_list[i]["player4"] + " " + lineup_list[i]["player5"] + "<br />");
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
