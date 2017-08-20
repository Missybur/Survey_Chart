var $selects = $("select"),
  data,
  ctx = $("#myChart"),
  config = {
    selected: 0,
    type: "pie",
    options: {
      responsive: true,
      pieceLabel: {
        render: function(args) {
          var selected = function() {
            var out = 0;
            for (var i = 0; i < data.length; i++) {
              out = out + data[i];
            }
            return out;
          };
          var percentage = args.value / selected() * 100 + "%";
          return percentage;
        },
        fontSize: 14,
        fontStyle: "bold",
        fontColor: "#fff",
        fontFamily: '"Lucida Console", Monaco, monospace'
      }
    },

    data: {
      labels: ["verbal", "non-verbal", "written"],
      datasets: [
        {
          data: [0, 0, 0],
          backgroundColor: ["#09c", "#c00011", "green"]
        }
      ]
    }
  };

myChart = new Chart(ctx, config);

$(".submit").on("click", function(e) {
  var results = { v: 0, n: 0, w: 0 },
    hasSelected = 0;
  e.preventDefault();
  $selects.each(function() {
    var val = $(this).val();
    if (val) {
      results[val]++;
      hasSelected = 1;
    }
  });
  if (hasSelected) {
    data = [];
    $.each(results, function(k, v) {
      data.push(v);
    });
  } else {
    data = JSON.parse(localStorage.getItem("data"));
  }
  config.data.datasets[0].data = data;
  myChart.update();
  localStorage.data = JSON.stringify(data);
});
