var $selects = $("select"),
  ctx = $("#myChart"),
  data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [0, 0, 0],
  config = {
    type: "pie",
    options: {
      responsive: true
    },
    data: {
      labels: ["verbal", "non-verbal", "written"],
      datasets: [
        {
          data: data,
          backgroundColor: ["#09c", "#c00011", "green"]
        }
      ]
    }
  };

myChart = new Chart(ctx, config);

$(".submit").on("click", function(e) {
  var results = { v: 0, n: 0, w: 0 },
    data = [];
  e.preventDefault();
  $selects.each(function() {
    var val = $(this).val();
    val && results[val]++;
  });
  var data = [];
  $.each(results, function(k, v) {
    data.push(v);
  });
  config.data.datasets[0].data = data;
  myChart.update();
  localStorage.data = JSON.stringify(data);
});
