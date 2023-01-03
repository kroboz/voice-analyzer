
function getAnalysis(resultElementId, params) {
  // Script to use Watson NLP sentiment analysis with IBM Cloud
  // Replace YOUR_API_KEY with your IBM Cloud API key
  const API_KEY = '_W3ZvzeF7N7xyP58_jNjMFJ7zCCZmEjKsvkFQfMCY3E8';
  
  // Replace YOUR_IBM_CLOUD_URL with your IBM Cloud URL
  const IBM_CLOUD_URL = 'https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/18dbfed8-4322-415d-8af6-df8ec08eaa52';

  $.ajax({
    type: "post",
    url: IBM_CLOUD_URL + '/v1/analyze?version=2020-08-01',
    data: JSON.stringify(params),
    contentType: "json",
    headers: {
      'Authorization': `Basic ${btoa('apiKey:' + API_KEY)}`, // Basic " + btoa(API_KEY + ':'),
      'Content-Type': 'application/json'
    },
    success: (data) => {
      console.log('RAM: Success:', data);
      // Get the sentiment score from the response
      const sentimentScore = data.sentiment.document.score;
      // Set the sentiment score in the results div
      document.querySelector(`#${resultElementId}`).innerText = sentimentScore;
    },
    error: (err) => {
      console.log(err);
    }
  });

}

function initiateAnalysis() {
  // Get the text from the editor1 div
  const text1 = document.querySelector('#editor1').innerText; // document.getElementById('editor1').innerText;
  const text2 = document.querySelector('#editor2').innerText;
  
  getAnalysis('sentiment-results1', { text: text1, features: { sentiment: {} }});
  getAnalysis('sentiment-results2', { text: text2, features: { sentiment: {} }});
  
}

document.addEventListener('DOMContentLoaded', function () {
  
  // Set up the event listener for the button
  document.getElementById('tone-sentiment').addEventListener('click', initiateAnalysis);

  initiateAnalysis();
  
});

