var myBarChart = null;
// Define a function to create the chart
function createChartFirst() {
  if (myBarChart != null) {
    myBarChart.destroy();
  }
  // Get the div element with the ID "editor1"
  var editor1 = document.getElementById("editor1");

  // Get the text content of the div element
  var text = editor1.textContent;

  // Split the text into an array of sentences by splitting on the period, exclamation mark, and question mark characters
  var sentences = text.split(/[.!?]/);

  // Create an array to store the number of words in each sentence
  var wordCounts = [];

  // Create an array to store the labels for each bar in the chart
  var labels = [];

  // Loop through each sentence
  for (var i = 0; i < sentences.length; i++) {
    // Get the current sentence
    var sentence = sentences[i];

    // Split the sentence into an array of words
    var words = sentence.split(" ");

    // Check if the sentence has more than one character
    if (sentence.trim().length > 1) {

      // Add the number of words in the sentence to the array
      wordCounts.push(words.length);

      // Add a label for the current bar in the chart
      labels.push('Sentence ' + (i + 1));
    }
  }
  // Get the number of items in the chart
  var numItems = wordCounts.length;

  // Calculate the desired height of the chart
  var chartHeight = (numItems * 30) + 100;

  // Set up the data for the chart
  var data = {
    labels: labels,
    datasets: [{
      label: 'Words/Sentence',
      data: wordCounts,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  };

  // Set up the options for the chart
  var options = {
    type: 'horizontalBar',
    stacked: false,
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    },
    // Set the height of the chart
    height: chartHeight
  };

  document.getElementById("chart-container").style.height = chartHeight + "px";

  // Get the canvas element where the chart will be drawn
  var ctx = document.getElementById('sentence-counts1').getContext('2d');

  // Create the chart using the Chart.min.js library
  myBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: data,
    options: options
  });
}

