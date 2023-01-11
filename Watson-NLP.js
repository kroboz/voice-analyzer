
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
  // Assign the response data to the payload variable
  const payload = data;
  // Get the sentiment score from the response
  const sentimentScore = (payload.sentiment.document.score.toFixed(2))*100;
  const sentimentLabel = payload.sentiment.document.label;
  const emotionSadness = (payload.emotion.document.emotion.sadness.toFixed(2))*100;
  const emotionJoy = (payload.emotion.document.emotion.joy.toFixed(2))*100;
  const emotionFear = (payload.emotion.document.emotion.fear.toFixed(2))*100;
  const emotionDisgust = (payload.emotion.document.emotion.disgust.toFixed(2))*100;
  const emotionAnger = (payload.emotion.document.emotion.anger.toFixed(2))*100;

  // Set the sentiment score in the results div
  document.querySelector(`#${resultElementId}`);
  
  const html = `
    <div>
      <b>Tone:</b> ${sentimentLabel}<br>
      <b>Tone score:</b> ${sentimentScore}<br>
<b>&nbsp;</b><br>
<b>Emotional Sentiment</b></br>
<b>Sadness:</b> ${emotionSadness}</br> 
<b>Joy:</b> ${emotionJoy}</br>
<b>Fear:</b> ${emotionFear}</br>
<b>Disgust:</b> ${emotionDisgust}</br>
<b>Anger:</b> ${emotionAnger}</br>
    </div>
  `;

  $(`#${resultElementId}`).append(html);
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
  getAnalysis('sentiment-results1', {
      text: text1,
      features: {
          emotion: {},
          sentiment: {},
          keywords: {
              sentiment: true,
              emotion: true,
              limit: 5,
          }
      }
  });
  getAnalysis('sentiment-results2', {
      text: text2,
      features: {
          emotion: {},
          sentiment: {},
          keywords: {
              sentiment: true,
              emotion: true,
              limit: 5,
          }
      }
  });

  }

document.addEventListener('DOMContentLoaded', function () {
  
  // Set up the event listener for the button
  document.getElementById('tone-sentiment').addEventListener('click', initiateAnalysis);

  initiateAnalysis();
  
});


