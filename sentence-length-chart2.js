var myBarChart2=null;
// Define a function to create the chart
function createChartSecond() {
  if(myBarChart2!=null){
        myBarChart2.destroy();
    }
  // Get the div element with the ID "editor2"
  var editor1 = document.getElementById("editor2");

  // Get the text content of the div element
  var text = editor2.textContent;

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

    // Add the number of words in the sentence to the array
    wordCounts.push(words.length);

    // Add a label for the current bar in the chart
    labels.push('Sentence ' + (i+1));
  }

  // Set up the data for the chart
  var data = {
    labels: wordCounts,
    datasets: [{
      label: 'Word Count',
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
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    }
  };
  // Get the canvas element where the chart will be drawn
  var ctx = document.getElementById('sentence-counts2').getContext('2d');

  // Create the chart using the Chart.min.js library
  myBarChart2 = new Chart(ctx, {
    type: 'horizontalBar',
    data: data,
    options: options
  });
}

