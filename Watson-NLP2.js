// Script to use Watson NLP sentiment analysis with IBM Cloud
// Replace YOUR_API_KEY with your IBM Cloud API key
const API_KEY = '_W3ZvzeF7N7xyP58_jNjMFJ7zCCZmEjKsvkFQfMCY3E8';

// Replace YOUR_IBM_CLOUD_URL with your IBM Cloud URL
const IBM_CLOUD_URL = 'https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/18dbfed8-4322-415d-8af6-df8ec08eaa52';

// Set up the request to the Watson API
const request = new XMLHttpRequest();
request.open('POST', IBM_CLOUD_URL + '/v1/analyze?version=2020-08-01');
request.setRequestHeader('Content-Type', 'application/json');
request.setRequestHeader('Authorization', 'Basic ' + btoa(API_KEY + ':'));

// Set up the event listener for the button
document.getElementById('tone-sentiment').addEventListener('click', function () {
  // Get the text from the editor1 div
  const text = document.getElementById('editor2').innerText;

  // Set the parameters for the request
  const params = {
    'text': text,
    'features': {
      'sentiment': {},
    },
  };

  // Send the request
  request.send(JSON.stringify(params));
});

// Handle the response
request.onload = function () {
  if (request.status === 200) {
    // Parse the response
    const response = JSON.parse(request.response);

    // Get the sentiment score from the response
    const sentimentScore = response.sentiment.document.score;

    // Set the sentiment score in the results div
    document.getElementById('sentiment-results2').innerText = sentimentScore;
  } else {
    console.error('An error occurred:', request.statusText);
  }
};
