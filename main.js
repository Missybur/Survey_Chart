var $selects = $("select"),
    $form = $('#form'),
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
          var percentage = Math.round(args.value / selected() * 100) + "%";
          $('#'+args.label).text(percentage);
          return percentage;
        },
        fontSize: 14,
        fontStyle: "bold",
        fontColor: "#fff",
        fontFamily: '"Lucida Console", Monaco, monospace'
      }
    },

    data: {
      labels: ["Verbal", "Non-verbal", "Written"],
      datasets: [
        {
          data: [0, 0, 0],
          backgroundColor: ["#a03021", "#f2ce0f", "#4d4d4d"]
        }
      ]
    }
  };

myChart = new Chart(ctx, config);

$(".submit").on("click", function(e) {
  var results = { v: 0, n: 0, w: 0 },
    hasSelected = 0,
      validated = 1;
  e.preventDefault();
  $selects.each(function() {
    var val = $(this).val();
    if (val) {
      results[val]++;
      hasSelected = 1;
    } else {
      validated = 0;
    }
  });
  if (hasSelected && validated) {
    data = [];
    $.each(results, function(k, v) {
      data.push(v);
    });
    $form.attr('data-state','submitted');
  } else if (!hasSelected && localStorage.getItem("data") != 'undefined') {
    $form.attr('data-state','retained');
    data = JSON.parse(localStorage.getItem("data"));
  } else {
    $form.attr('data-state','error')
  }
  config.data.datasets[0].data = data;
  myChart.update();
  localStorage.data = JSON.stringify(data);
});
