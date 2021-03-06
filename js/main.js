function lineup() {

  let num_lineups = document.getElementById("num_lineups");
  num_lineups.innerHTML = "Running";

  let table = document.getElementById("lineup-table");
  table.innerHTML = '';

  let input_file = document.getElementById("player_file");
  import_data(input_file.files[0]);

}

function find_lineups(player_list) {

  /* Set min_salary and min_points to limit the lineups that get selected */
  var min_salary = 55000;
  var min_points = 55;

  let lineup_list = [];

  player_list.sort(function(a, b){return b.FPPG - a.FPPG});

  for (i = 0; i < player_list.length; i++) {
    if (player_list[i]["Injury Indicator"] === 'IR' || player_list[i]["Injury Indicator"] === 'O') {
      continue;
    }
    for (j = i+1; j < player_list.length; j++) {
      if (player_list[j]["Injury Indicator"] === 'IR' || player_list[j]["Injury Indicator"] === 'O') {
        continue;
      }
      for (k = j+1; k < player_list.length; k++) {
        if (player_list[k]["Injury Indicator"] === 'IR' || player_list[k]["Injury Indicator"] === 'O') {
          continue;
        }
        for (l = k+1; l < player_list.length; l++) {
          if (player_list[l]["Injury Indicator"] === 'IR' || player_list[l]["Injury Indicator"] === 'O') {
            continue;
          }
          for (m = l+1; m < player_list.length; m++) {
            if (player_list[m]["Injury Indicator"] === 'IR' || player_list[m]["Injury Indicator"] === 'O') {
              continue;
            }
            lineup_salary = player_list[i]["Salary"] + player_list[j]["Salary"] + player_list[k]["Salary"] + player_list[l]["Salary"] + player_list[m]["Salary"];
            lineup_points = player_list[i]["FPPG"] + player_list[j]["FPPG"] + player_list[k]["FPPG"] + player_list[l]["FPPG"] + player_list[m]["FPPG"];
            if (lineup_salary <= 60000 && lineup_salary >= min_salary && lineup_points >= min_points) {
              lineup_list.push(lineup_hash(lineup_points, lineup_salary, player_list[i]["Nickname"], player_list[i]["Id"], player_list[j]["Nickname"], player_list[j]["Id"], player_list[k]["Nickname"], player_list[k]["Id"], player_list[l]["Nickname"], player_list[l]["Id"], player_list[m]["Nickname"], player_list[m]["Id"]));
            }
          }
        }
      }
    }
  }

  display_data(lineup_list);
}

function display_data(lineup_list) {
  let num_lineups = document.getElementById("num_lineups");
  num_lineups.innerHTML = lineup_list.length;

  lineup_list.sort(function(a, b){return b.points - a.points});

  let table = document.getElementById("lineup-table");

  for (i=0; i < lineup_list.length; i++) {
    let row = table.insertRow(-1);
    let row_selector = row.insertCell(0);
    let cell_points = row.insertCell(1);
    let cell_salary = row.insertCell(2);
    let cell_player1 = row.insertCell(3);
    let cell_player1_id = row.insertCell(4);
    let cell_player2 = row.insertCell(5);
    let cell_player2_id = row.insertCell(6);
    let cell_player3 = row.insertCell(7);
    let cell_player3_id = row.insertCell(8);
    let cell_player4 = row.insertCell(9);
    let cell_player4_id = row.insertCell(10);
    let cell_player5 = row.insertCell(11);
    let cell_player5_id = row.insertCell(12);

    row_selector.innerHTML = "<input id='row-selector' type='checkbox' />";
    cell_points.innerHTML = lineup_list[i]["points"].toFixed(2);
    cell_salary.innerHTML = "$" + lineup_list[i]["salary"];
    cell_player1.innerHTML = lineup_list[i]["player1"];
    cell_player1_id.innerHTML = lineup_list[i]["player1_id"];
    cell_player2.innerHTML = lineup_list[i]["player2"];
    cell_player2_id.innerHTML = lineup_list[i]["player2_id"];
    cell_player3.innerHTML = lineup_list[i]["player3"];
    cell_player3_id.innerHTML = lineup_list[i]["player3_id"];
    cell_player4.innerHTML = lineup_list[i]["player4"];
    cell_player4_id.innerHTML = lineup_list[i]["player4_id"];
    cell_player5.innerHTML = lineup_list[i]["player5"];
    cell_player5_id.innerHTML = lineup_list[i]["player5_id"];
  }
}

function lineup_hash(points, salary, player1, player1_id, player2, player2_id, player3, player3_id, player4, player4_id, player5, player5_id) {
  var l = {};
  l["points"] = points;
  l["salary"] = salary;
  l["player1"] = player1;
  l["player1_id"] = player1_id;
  l["player2"] = player2;
  l["player2_id"] = player2_id;
  l["player3"] = player3;
  l["player3_id"] = player3_id;
  l["player4"] = player4;
  l["player4_id"] = player4_id;
  l["player5"] = player5;
  l["player5_id"] = player5_id;
  return l;
}

function import_data(filename) {
  let players = Papa.parse(filename, {
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      players = results;
      console.log(players);
      find_lineups(players['data']);
    }
  });
}

function create_csv() {
  let csv_content = "data:text/csv;charset=utf-8,";

  $('#lineup-table #row-selector:checked').each(function () {
    let Player1ID = $(this).closest('tr').find('td').eq(4).text();
    let Player2ID = $(this).closest('tr').find('td').eq(6).text();
    let Player3ID = $(this).closest('tr').find('td').eq(8).text();
    let Player4ID = $(this).closest('tr').find('td').eq(10).text();
    let Player5ID = $(this).closest('tr').find('td').eq(12).text();
    csv_content += Player1ID + ',' + Player2ID + ',' + Player3ID + ',' + Player4ID + ',' + Player5ID + '\n';
  })

  let encodedUri = encodeURI(csv_content);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "lineups.csv");
  document.body.appendChild(link); // Required for FF

  link.click(); // This will download the data file named "my_data.csv".
}
