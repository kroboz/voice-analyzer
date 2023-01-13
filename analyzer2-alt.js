/*
 * requires: jquery, chart.js, vaderSentiment
 */

var Stats = {	
	max: function(array) {
		return Math.max.apply(null, array);
	},
	
	min: function(array) {
		return Math.min.apply(null, array);
	},
	
	range: function(array) {
		return arr.max(array) - arr.min(array);
	},
	
	midrange: function(array) {
		return arr.range(array) / 2;
	},

	sum: function(array) {
		var num = 0;
		for (var i = 0, l = array.length; i < l; i++) num += array[i];
		return num;
	},
	
	mean: function(array) {
		return arr.sum(array) / array.length;
	},
	
	median: function(array) {
		array.sort(function(a, b) {
			return a - b;
		});
		var mid = array.length / 2;
		return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
	},
	
	modes: function(array) {
		if (!array.length) return [];
		var modeMap = {},
			maxCount = 0,
			modes = [];

		array.forEach(function(val) {
			if (!modeMap[val]) modeMap[val] = 1;
			else modeMap[val]++;

			if (modeMap[val] > maxCount) {
				modes = [val];
				maxCount = modeMap[val];
			}
			else if (modeMap[val] === maxCount) {
				modes.push(val);
				maxCount = modeMap[val];
			}
		});
		return modes;
	},
	
	variance: function(array) {
		var mean = arr.mean(array);
		return arr.mean(array.map(function(num) {
			return Math.pow(num - mean, 2);
		}));
	},
	
	standardDeviation: function(array) {
		return Math.sqrt(arr.variance(array));
	},
	
	meanAbsoluteDeviation: function(array) {
		var mean = arr.mean(array);
		return arr.mean(array.map(function(num) {
			return Math.abs(num - mean);
		}));
	},
	
	zScores: function(array) {
		var mean = arr.mean(array);
		var standardDeviation = arr.standardDeviation(array);
		return array.map(function(num) {
			return (num - mean) / standardDeviation;
		});
	}
};

function Analyzer2(cfg) {
  this.lastToneUpdate = null;
  this.lastUpdate = null;
  this.stylometryBusy = {};
  this.stylometryLastRequest = {};
  this.stylometryLastUpdate = {};
  this.selector = cfg.selector;
  this.reportSelector = cfg.reportSelector;
  this.setup();
  this.reset();
}

Analyzer2.prototype.setup = function() {
  // result underlay for showing highlights
  //var id = this.selector.split("#").pop() + "-result";
  //#$(this.selector).parent().append("<div id='" + id + "'></div>");

  // report widgets
  $("#readability-report2").append(`
  <div id="readability" role="tabpanel" aria-labelledby="readability-header" style="padding:20px;">
  <div class="card-body">
  <div id="grade2" class="mb-1 grade"></div>
  <div id="adverb2" class="mb-1 adverb counter"></div>
  <div id="passive2" class="mb-1 passive counter"></div>
  <div id="complex2" class="mb-1 complex counter"></div>
  <div id="hard2" class="mb-1 hard counter"></div>
  <div id="vhard2" class="mb-1 vhard counter"></div>
 </div>
 `);

   $("#vocab-report2").append(`
   <div class="vocab-report2" id="vocab" role="tabpanel" aria-labelledby="vocab-header" style="padding:20px;">
   <div id='you-words2' class=''></div>
   <div id='me-words2' class=''></div>
     <div id='word-length2' class='text-small' style="padding-top:20px;"></div>
   <canvas id="word-chart2" width="150" height="100"></canvas>
 </div>
 `);
 
 $("#tone-report2").append(`
 <div class="tone-report2" id="tone" role="tabpanel" aria-labelledby="tone-sentiment" style="padding:20px;">
 <div id="sentiment-results2"></div>
         </div>
 `);
 
 $("#cadence-report2").append(`
 <div class="cadence-report" id="cadence" role="tabpanel" aria-labelledby="cadence-header" style="padding:20px">
         <div id='sentence-length2' class=''></div>
         <canvas id="sentence-chart2" width="150" height="100"></canvas>
         <div id='punctuation2' class=''></div>
     </div>
     </div>
     `);
 }


Analyzer2.prototype.reset = function() {
  this.data = {
    paragraphs2: 0,
    sentences2: 0,
    sentenceLenHisto: [],
    sentenceHash2Para: {},
    words2: 0,
    wordLenHisto: [],
    youWords: 0,
    meWords: 0,
    letters2: 0,
    punctuation: {
      ',': 0,
      "’": 0,
      '?': 0,
      '!': 0,
      '-': 0,
      '(': 0
    },
    hardsentences2: 0,
    veryHardsentences2: 0,
    adverbs: 0,
    passiveVoice: 0,
    complex: 0,
    grade: 0
  };
    
const punctuationLabels = {
  ',': 'Commas',
  "’": 'Apostrophes',
  '?': 'Question Marks',
  '!': 'Exclamation Points',
  '-': 'Hyphens',
  '(': 'Parentheses'
}
  for (var i=0; i < 100; i++)
  {
    this.data.sentenceLenHisto.push(0);
    this.data.wordLenHisto.push(0);
  }
}

// Credit to Liam (Stack Overflow)
// https://stackoverflow.com/a/41034697/3480193
class Cursor {
    static getCurrentCursorPosition(parentElement) {
        var selection = window.getSelection(),
            charCount = -1,
            node;

        if (selection.focusNode) {
            if (Cursor._isChildOf(selection.focusNode, parentElement)) {
                node = selection.focusNode;
                charCount = selection.focusOffset;

                while (node) {
                    if (node === parentElement) {
                        break;
                    }

                    if (node.previousSibling) {
                        node = node.previousSibling;
                        charCount += node.textContent.length;
                    } else {
                        node = node.parentNode;
                        if (node === null) {
                            break;
                        }
                    }
                }
            }
        }

        return charCount;
    }

    static setCurrentCursorPosition(chars, element) {
        if (chars >= 0) {
            var selection = window.getSelection();

            let range = Cursor._createRange(element, { count: chars });

            if (range) {
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

    static _createRange(node, chars, range) {
        if (!range) {
            range = document.createRange()
            range.selectNode(node);
            range.setStart(node, 0);
        }

        if (chars.count === 0) {
            range.setEnd(node, chars.count);
        } else if (node && chars.count >0) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent.length < chars.count) {
                    chars.count -= node.textContent.length;
                } else {
                    range.setEnd(node, chars.count);
                    chars.count = 0;
                }
            } else {
                for (var lp = 0; lp < node.childNodes.length; lp++) {
                    range = Cursor._createRange(node.childNodes[lp], chars, range);

                    if (chars.count === 0) {
                    break;
                    }
                }
            }
        }

        return range;
    }

    static _isChildOf(node, parentElement) {
        while (node !== null) {
            if (node === parentElement) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    }
}
Analyzer2.prototype.analyze = function() {
  ("use strict");
  this.reset();
  let paragraphs2 = $(this.selector).find("p").toArray();
  this.data.paragraphs2 = paragraphs2.length;
  let resultTextPs = paragraphs2.map(
    (p, idx) => this.processParagraph($(p), idx));
  let resultPs = resultTextPs.map(
    (textp, idx) => `<p id="para-${idx}">${textp}</p>`);

  let  richText = document.getElementById('editor2');
  let offset = Cursor.getCurrentCursorPosition(richText);
  $(this.selector).html(resultPs);

  //Add para to offset
  let word = "para-";
  let regex = new RegExp(word, "g");
  let str = resultPs.join(" ").substring(0, offset);
  let matches = str.match(regex);
  let count = matches ? matches.length : 0;
  Cursor.setCurrentCursorPosition(offset, richText);
  richText.focus();



  this.data.grade = this.calculateLevel(
    this.data.letters2/this.data.paragraphs2, 
    this.data.words2/this.data.paragraphs2, 
    this.data.sentences2/this.data.paragraphs2);

  this.report();
  this.updateTone();
  this.updateSentiment($(this.selector).text());

  const models = ["carlton", "halbert"];
  var aly = this;
  models.forEach(function(m) {
    aly.updateStylometry(m);
  });

  this.lastUpdate = Date.now();
}

Analyzer2.prototype.updateTone = function() {
  let aly = this;

  setTimeout(function() {
    const now = Date.now()
    if (aly.lastToneUpdate == null 
      || (
          // don't request Tone analysis faster than once per 15s
          now - aly.lastToneUpdate > 15000 
          // wait 3s after user's last update to update Tone
          && now - aly.lastUpdate > 3000
          // only update if contents changed
          && aly.lastUpdate > aly.lastToneUpdate)
         ) 
    {
      aly.lastToneUpdate = aly.lastUpdate;

      $("#tone-report2").html("<em>Analyzing...</em>");

      data = { text: $(aly.selector).text() };
      $.ajax({
        url: "/tone",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(data) {
          //console.log(data);
          
          data.result.sentences2_tone.forEach(function(r) {
            const hash = aly.computeHashCode(r.text);
            if (!(hash in aly.data.sentenceHash2Para))
              return;

            const paraIdx = aly.data.sentenceHash2Para[hash];
            r.tone_categories.forEach(function(cat) {
              cat.tones.forEach(function(tone) {
                if (tone.score >= 0.4 && tone.score < 0.6)
                  $("#para-" + paraIdx).addClass(tone.tone_id + "-low");
                else if (tone.score >= 0.6 && tone.score < 0.8)
                  $("#para-" + paraIdx).addClass(tone.tone_id + "-med");
                else if (tone.score >= 0.8)
                  $("#para-" + paraIdx).addClass(tone.tone_id + "-high");
              });
            });
          });
          
          tones = {};
          data.result.document_tone.tone_categories
            .forEach(function(t) {
              tones[t.category_name] = t.tones;
            });

          var html = '';
          for (var n in tones) {
            var list = '';
            tones[n].forEach(function(t) {
              list += `<div class="tone-select" data-tone-id="${t.tone_id}">
                ${t.tone_name}: ${(t.score * 100).toFixed(2)}%</div>`;
            });

            const title = n.replace(' Tone', '');
            html += `<div class="mb-2">
              <div class="font-weight-bold">${title}</div>
              ${list}
            </div>`;
          }

          // last update stamp
          const d = new Date();
          html += `<div class="text-sm font-italic">Last updated: 
            ${ d.toLocaleString() }</div>`;
          $("#tone-report2").html(html);

          // highlight paragraphs2 with this tone on hover
          $("#tone-report2 .tone-select").hover(function(e) {
            const toneId = $(this).data('tone-id');
            $("."+toneId+"-low").addClass('highlight-tone-low');
            $("."+toneId+"-med").addClass('highlight-tone-med');
            $("."+toneId+"-high").addClass('highlight-tone-high');

          }, function(e) {
            const toneId = $(this).data('tone-id');
            $("."+toneId+"-low").removeClass('highlight-tone-low');
            $("."+toneId+"-med").removeClass('highlight-tone-med');
            $("."+toneId+"-high").removeClass('highlight-tone-high');
          });
        },
        complete: function() {
          aly.updateTone();
        }
      });
    }
    else
      aly.updateTone();
  }, 250);
}

Analyzer2.prototype.updateSentiment = function(text) {
	var sentiment = "neutral";

	if (text) 
	{
		const intensity = SentimentIntensityAnalyzer.polarity_scores(text);
		if (intensity.compound > 0.1)
		{
			var pct = parseInt(intensity.compound * 100);
			sentiment = pct + "% positive";
		}
		else if (intensity.compound < -0.1)
		{
			var pct = parseInt(-intensity.compound * 100);
			sentiment = pct + "% negative";
		}
	}

	$("#sentiment2").html(`<div class="mb-2">
    <div class="font-weight-bold">Sentiment</div>
    ${sentiment}</div>`);
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

Analyzer2.prototype.updateStylometry = function(model) {
  let aly = this;
  let paragraphs2 = $(this.selector).find("p").toArray();

  var text = "";
  paragraphs2.forEach(function(p) {
    text += $(p).text() + "\n";
  });
  //console.log(text);
  var sentences2 = text.match(/[^\r\n]+/g);
  if (!sentences2)
    return;
  //console.log(sentences2);
  shuffle(sentences2);
  var samples = [];
  for (var i=0; i < 10 && sentences2.length; i++)
  {
    var sample = "";
    for (var j=0; j < 1 && sentences2.length; j++)
    {
      var sentence = sentences2.pop().trim();

      if (sample != "")
        sample += " ";
      sample += sentence;

      if (sample.length > 200)
        break;
    }

    if (sample != "")
      samples.push(sample);
  }

  if (samples.length == 0)
    return;

  var now = Date.now();
  aly.stylometryLastRequest[model] = now;
  if (aly.stylometryBusy[model])
    return; // only allow 1 update at a time
  aly.stylometryBusy[model] = true;
  aly.stylometryLastUpdate[model] = now;

  const modelSelector = "#stylo-score-"+model;
  if (!$(modelSelector).length)
    $("#stylo-score").append(`<div id="stylo-score-${model}"></div>`);
      
  $(modelSelector).html(`<em>Analyzing ${model}...</em>`);
  var data = { model: model, sentences2: samples };
  $.ajax({
    url: "/stylo",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function(data) {
      console.log(data);
      if (!data.success)
        return;

      //var numPos = 0;
      var totalPos = 0;
      data.predictions.forEach(function(prediction) {
        //if (prediction.probabilities[1] > 0.999)
        //  numPos++;
        totalPos += (prediction.probabilities[1] > 0.999)? 
          prediction.probabilities[1] : 0;
        totalPos -= prediction.probabilities[0];
      });
      //var posPct = (numPos / data.predictions.length * 100.).toFixed(2);
      var posPct = (totalPos / data.predictions.length * 100).toFixed(2);
      var posPct = Math.max(0, posPct);
      var modelDisplayName = model.charAt(0).toUpperCase() + model.slice(1);
      $(modelSelector).html(`${posPct}% ${modelDisplayName}`);
    },
    complete: function() {
      aly.stylometryBusy[model] = false;
      if (aly.stylometryLastRequest[model] > aly.stylometryLastUpdate[model])
        aly.updateStylometry(model);
    }
  });
}

Analyzer2.prototype.updateWordSentenceHistogram = function(sentence) {
	// collect word length stats
	sentence.split(" ").map(word => {
    let wordLen = Math.min(word.length, 
      this.data.wordLenHisto.length-1);
    this.data.wordLenHisto[wordLen]++;
	});

  let sentenceLen = Math.min(sentence.split(" ").length,
    this.data.sentenceLenHisto.length-1);
  this.data.sentenceLenHisto[sentenceLen]++;
}

Analyzer2.prototype.processParagraph = function(p, idx) {
  let sentences2 = this.getsentences2FromParagraph(p.text());
  if (!sentences2)
    return p.html();

  // hash sentence to para idx
  var aly = this;
  sentences2.forEach(function(sent) {
    const hash = aly.computeHashCode(sent);
    aly.data.sentenceHash2Para[hash] = idx;
  });

  this.data.sentences2 += sentences2.length;
  let hardOrNot = sentences2.map(sent => {
    let cleanSentence = sent.replace(/[^a-z0-9.?! ]/gi, "");
    this.updateWordSentenceHistogram(cleanSentence);
    let words2 = cleanSentence.split(" ").length;
    let letters2 = cleanSentence.split(" ").join("").length;
    this.data.words2 += words2;
    this.data.letters2 += letters2;
    this.data.punctuation[','] += this.getCharCount(/[,]/g, sent);
    this.data.punctuation["’"] += this.getCharCount(/['’]/g, sent);
    this.data.punctuation['?'] += this.getCharCount(/[?]/g, sent);
    this.data.punctuation['!'] += this.getCharCount(/[!]/g, sent);
    this.data.punctuation['-'] += this.getCharCount(/[-—]+/g, sent);
    this.data.punctuation['('] += this.getCharCount(/[(]/g, sent);
    this.data.youWords += this.getYouWordCount(sent);
    this.data.meWords += this.getMeWordCount(sent);
    sent = this.getAdverbs(sent);
    sent = this.getComplex(sent);
    sent = this.getPassive(sent);
    sent = this.getQualifier(sent);
    let level = this.calculateLevel(letters2, words2, 1);
    if (words2 < 14) {
      return sent;
    } else if (level >= 10 && level < 14) {
      this.data.hardsentences2 += 1;
      return `<span class="hard">${sent}</span>`;
    } else if (level >= 14) {
      this.data.veryHardsentences2 += 1;
      return `<span class="vhard">${sent}</span>`;
    } 

    return sent;
  });

  return hardOrNot.join(" ");
}

Analyzer2.prototype.getsentences2FromParagraph = function(text) {
  text = text.replace(/[\n\r]/g, ''); // cleanup for easier regex
  return text.match(/[^\.!\?]+[\.!\?]+["'"”’]?|.+$/g);
}

Analyzer2.prototype.getCharCount = function(regex, sentence) {
 return (sentence.match(regex)||[]).length;
}

Analyzer2.prototype.getMeWordCount = function(text) {
  text = text.replace(/["“‘”’]/g, "'");
  var words2 = text.split(" ");
  var count = 0;
  var matchWords = ["i", "i'd", "i'm", "i'll", "i've", "me", "my", "myself", "mine", "us", "we", "we're", "we'll", "we've", "our", "ours"];
  for (var wi=0; wi < words2.length; wi++)
    if (matchWords.indexOf(words2[wi].toLowerCase()) != -1)
      count++;
  return count;
}

Analyzer2.prototype.getYouWordCount = function(text) {
  text = text.replace(/["“‘”’]/g, "'");
  var words2 = text.split(" ");
  var count = 0;
  var matchWords = ["you", "your", "you'll", "you're", "you've", "yours"];
  for (var wi=0; wi < words2.length; wi++)
    if (matchWords.indexOf(words2[wi].toLowerCase()) != -1)
      count++;
  return count;
}

Analyzer2.prototype.report = function() {
  $("#grade2").show().html(`Grade ${this.data.grade}`);

  $("#adverb2").hide();
  if (this.data.adverbs)
  {
    $("#adverb2").show().html(`<span class='num'>${
    this.data.adverbs
    }</span> adverb${this.data.adverbs > 1 ? "s" : ""}. Aim for ${Math.round(
      this.data.paragraphs2 / 3
    )} or fewer.`);
  }

  $("#passive2").hide();
  if (this.data.passiveVoice)
  {
    $("#passive2").show().html(`<span class='num'>${this.data.passiveVoice}</span> use${
      this.data.passiveVoice > 1 ? "s" : ""
    } of passive voice. Aim for ${Math.round(this.data.sentences2 / 5)} or fewer.`);
  }

  $("#complex2").hide();
  if (this.data.complex)
  {
    $("#complex2").show().html(`<span class='num'>${this.data.complex}</span> phrase${
      this.data.complex > 1 ? "s" : ""
    } could be simplified.`);
  }

  $("#hard2").hide();
  if (this.data.hardsentences2)
  {
    $("#hard2").show().html(`<span class='num'>${
      this.data.hardsentences2
    }</span> of ${this.data.sentences2} sentence${
      this.data.sentences2 > 1 ? "s are" : " is"
    } hard to read.`);
  }

  $("#vhard2").hide();
  if (this.data.veryHardsentences2)
  {
    $("#vhard2").show().html(`<span class='num'>${
      this.data.veryHardsentences2
    }</span> of ${this.data.sentences2} sentence${
      this.data.sentences2 > 1 ? "s are" : " is"
    } very hard to read.`);
  }

  $("#you-words2").html(`"You" words: ${
    this.data.youWords
  }`);
  $("#me-words2").html(`"Me" words: ${
    this.data.meWords
  }`);

  if (this.data.letters2)
  {
    $("#word-length2").show().html(`<span class='num'>
      Average Word length: ${
      (this.data.letters2 / this.data.words2).toFixed(2)
    } characters</span>`);
    $("#sentence-length2").show().html(`<span class='num'>
      Sentence length: ${
      (this.data.words2 / this.data.sentences2).toFixed(2)
    } words</p>`);
    var puncReport = '';
    for (p in this.data.punctuation)
    {
        let name = punctuationNames[p] || "Not Found";
puncReport += `<div class="text-small"><span class="font-weight-bold pl-3"><b>${name}:</b> </span> ${
        (this.data.punctuation[p] / this.data.sentences2 * 100).toFixed(2)
      }</div>`;
    }
    $("#punctuation2").show().html(`<p class="small-text" style="padding-top:20px;"><em>Punctuation per 100 sentences2:</em></p>
      ${puncReport}`);

    this.updateHistoChart(this.data.wordLenHisto, 
      'word-chart2', 'num words2');
    this.updateHistoChart(this.data.sentenceLenHisto, 
      'sentence-chart2', 'num sentences2');
  }
}

Analyzer2.prototype.updateHistoChart = function(data, elId, label) {
  var maxIdx = 0;
  for (var i=0; i < data.length; i++)
    if (data[i])
      maxIdx = i;
  var histo = data.slice(1, maxIdx+1);
  var histoLabels = [];
  for (var i=0; i < histo.length; i++)
    histoLabels.push(i+1);
  const el = document.getElementById(elId);
  var ctx = el.getContext('2d');
  if (!this.histoChart)
    this.histoChart = {};
  if (this.histoChart[elId])
    this.histoChart[elId].destroy();
  this.histoChart[elId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: histoLabels,
        datasets: [{ 
          label: label, 
          data: histo,
          backgroundColor: 'rgba(0, 255, 155, 0.7)'
        }]
      },
  });
}

Analyzer2.prototype.getAdverbs = function(sentence) {
  let lyWords = this.getLyWords();
  return sentence
    .split(" ")
    .map(word => {
      if (
        word.replace(/[^a-z0-9. ]/gi, "").match(/ly$/) &&
        lyWords[word.replace(/[^a-z0-9. ]/gi, "").toLowerCase()] === undefined
      ) {
        this.data.adverbs += 1;
        return `<span class="adverb2">${word}</span>`;
      } else {
        return word;
      }
    })
    .join(" ");
}

Analyzer2.prototype.getComplex = function(sentence) {
  let words2 = this.getComplexWords();
  let wordList = Object.keys(words2);
  wordList.forEach(key => {
    sentence = this.findAndSpan(sentence, key, "complex");
  });
  return sentence;
}

Analyzer2.prototype.getPassive = function(sent) {
  let originalWords = sent.split(" ");
  let words2 = sent
    .replace(/[^a-z0-9. ]/gi, "")
    .toLowerCase()
    .split(" ");
  let ed = words2.filter(word => word.match(/(ed|en|wn)$/));
  if (ed.length > 0) {
    ed.forEach(match => {
      originalWords = this.checkPrewords(words2, originalWords, match);
    });
  }
  return originalWords.join(" ");
}

Analyzer2.prototype.getQualifier = function(sentence) {
  let qualifiers = this.getQualifyingWords();
  let wordList = Object.keys(qualifiers);
  wordList.forEach(key => {
    sentence = this.findAndSpan(sentence, key, "qualifier");
  });
  return sentence;
}

Analyzer2.prototype.checkPrewords = function(words2, originalWords, match) {
  let preWords = ["is", "are", "was", "were", "be", "been", "being"];
  let index = words2.indexOf(match);
  if (preWords.indexOf(words2[index - 1]) >= 0) {
    this.data.passiveVoice += 1;
    originalWords[index - 1] =
      '<span class="passive">' + originalWords[index - 1];
    originalWords[index] = originalWords[index] + "</span>";
    let next = this.checkPrewords(
      words2.slice(index + 1),
      originalWords.slice(index + 1),
      match
    );
    return [...originalWords.slice(0, index + 1), ...next];
  } else {
    return originalWords;
  }
}

Analyzer2.prototype.calculateLevel = function(letters2, words2, sentences2) {
  if (words2 === 0 || sentences2 === 0) {
    return 0;
  }
  let level = Math.round(
    4.71 * (letters2 / words2) + 0.5 * words2 / sentences2 - 21.43
  );
  return level <= 0 ? 0 : level;
}

Analyzer2.prototype.findAndSpan = function(sentence, string, type) {
  let index = sentence.toLowerCase().indexOf(string);
  let a = { complex: "complex", qualifier: "adverbs" };
  if (index >= 0) {
    if (
      (index > 0
       && sentence.toLowerCase().substring(index-1)
                  .match(/^[a-z0-9]+/))
      ||
      (index + string.length < sentence.length
       && sentence.toLowerCase().substring(index + string.length)
                  .match(/^[a-z0-9]+/))
    )
    {
      // skip if not exact string match 
      return sentence;
    }

    this.data[a[type]] += 1;
    sentence =
      sentence.slice(0, index) +
      `<span class="${type}">` +
      sentence.slice(index, index + string.length) +
      "</span>" +
      this.findAndSpan(sentence.slice(index + string.length), string, type);
  }
  return sentence;
}

Analyzer2.prototype.computeHashCode = function(str) {
  var cleanStr = str.trim();
  cleanStr = cleanStr.replace(/\W/g, '');

  var hash = 0, i, chr;
  for (i = 0; i < cleanStr.length; i++) {
    chr   = cleanStr.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
}


Analyzer2.prototype.getQualifyingWords = function() {
  return {
    "i believe": 1,
    "i consider": 1,
    "i don't believe": 1,
    "i don't consider": 1,
    "i don't feel": 1,
    "i don't suggest": 1,
    "i don't think": 1,
    "i feel": 1,
    "i hope to": 1,
    "i might": 1,
    "i suggest": 1,
    "i think": 1,
    "i was wondering": 1,
    "i will try": 1,
    "i wonder": 1,
    "in my opinion": 1,
    "is kind of": 1,
    "is sort of": 1,
    just: 1,
    maybe: 1,
    perhaps: 1,
    possibly: 1,
    "we believe": 1,
    "we consider": 1,
    "we don't believe": 1,
    "we don't consider": 1,
    "we don't feel": 1,
    "we don't suggest": 1,
    "we don't think": 1,
    "we feel": 1,
    "we hope to": 1,
    "we might": 1,
    "we suggest": 1,
    "we think": 1,
    "we were wondering": 1,
    "we will try": 1,
    "we wonder": 1
  };
}

Analyzer2.prototype.getLyWords = function() {
  return {
    actually: 1,
    additionally: 1,
    allegedly: 1,
    ally: 1,
    alternatively: 1,
    anomaly: 1,
    apply: 1,
    approximately: 1,
    ashely: 1,
    ashly: 1,
    assembly: 1,
    awfully: 1,
    baily: 1,
    belly: 1,
    bely: 1,
    billy: 1,
    bradly: 1,
    bristly: 1,
    bubbly: 1,
    bully: 1,
    burly: 1,
    butterfly: 1,
    carly: 1,
    charly: 1,
    chilly: 1,
    comely: 1,
    completely: 1,
    comply: 1,
    consequently: 1,
    costly: 1,
    courtly: 1,
    crinkly: 1,
    crumbly: 1,
    cuddly: 1,
    curly: 1,
    currently: 1,
    daily: 1,
    dastardly: 1,
    deadly: 1,
    deathly: 1,
    definitely: 1,
    dilly: 1,
    disorderly: 1,
    doily: 1,
    dolly: 1,
    dragonfly: 1,
    early: 1,
    elderly: 1,
    elly: 1,
    emily: 1,
    especially: 1,
    exactly: 1,
    exclusively: 1,
    family: 1,
    finally: 1,
    firefly: 1,
    folly: 1,
    friendly: 1,
    frilly: 1,
    gadfly: 1,
    gangly: 1,
    generally: 1,
    ghastly: 1,
    giggly: 1,
    globally: 1,
    goodly: 1,
    gravelly: 1,
    grisly: 1,
    gully: 1,
    haily: 1,
    hally: 1,
    harly: 1,
    hardly: 1,
    heavenly: 1,
    hillbilly: 1,
    hilly: 1,
    holly: 1,
    holy: 1,
    homely: 1,
    homily: 1,
    horsefly: 1,
    hourly: 1,
    immediately: 1,
    instinctively: 1,
    imply: 1,
    italy: 1,
    jelly: 1,
    jiggly: 1,
    jilly: 1,
    jolly: 1,
    july: 1,
    karly: 1,
    kelly: 1,
    kindly: 1,
    lately: 1,
    likely: 1,
    lilly: 1,
    lily: 1,
    lively: 1,
    lolly: 1,
    lonely: 1,
    lovely: 1,
    lowly: 1,
    luckily: 1,
    mealy: 1,
    measly: 1,
    melancholy: 1,
    mentally: 1,
    molly: 1,
    monopoly: 1,
    monthly: 1,
    multiply: 1,
    nightly: 1,
    oily: 1,
    only: 1,
    orderly: 1,
    panoply: 1,
    particularly: 1,
    partly: 1,
    paully: 1,
    pearly: 1,
    pebbly: 1,
    polly: 1,
    potbelly: 1,
    presumably: 1,
    previously: 1,
    pualy: 1,
    quarterly: 1,
    rally: 1,
    rarely: 1,
    recently: 1,
    rely: 1,
    reply: 1,
    reportedly: 1,
    roughly: 1,
    sally: 1,
    scaly: 1,
    shapely: 1,
    shelly: 1,
    shirly: 1,
    shortly: 1,
    sickly: 1,
    silly: 1,
    sly: 1,
    smelly: 1,
    sparkly: 1,
    spindly: 1,
    spritely: 1,
    squiggly: 1,
    stately: 1,
    steely: 1,
    supply: 1,
    surly: 1,
    tally: 1,
    timely: 1,
    trolly: 1,
    ugly: 1,
    underbelly: 1,
    unfortunately: 1,
    unholy: 1,
    unlikely: 1,
    usually: 1,
    waverly: 1,
    weekly: 1,
    wholly: 1,
    willy: 1,
    wily: 1,
    wobbly: 1,
    wooly: 1,
    worldly: 1,
    wrinkly: 1,
    yearly: 1
  };
}

Analyzer2.prototype.getComplexWords = function() {
  return {
    "a number of": ["many", "some"],
    abundance: ["enough", "plenty"],
    "accede to": ["allow", "agree to"],
    accelerate: ["speed up"],
    accentuate: ["stress"],
    accompany: ["go with", "with"],
    accomplish: ["do"],
    accorded: ["given"],
    accrue: ["add", "gain"],
    acquiesce: ["agree"],
    acquire: ["get"],
    additional: ["more", "extra"],
    "adjacent to": ["next to"],
    adjustment: ["change"],
    admissible: ["allowed", "accepted"],
    advantageous: ["helpful"],
    "adversely impact": ["hurt"],
    advise: ["tell"],
    aforementioned: ["remove"],
    aggregate: ["total", "add"],
    aircraft: ["plane"],
    "all of": ["all"],
    alleviate: ["ease", "reduce"],
    allocate: ["divide"],
    "along the lines of": ["like", "as in"],
    "already existing": ["existing"],
    alternatively: ["or"],
    ameliorate: ["improve", "help"],
    anticipate: ["expect"],
    apparent: ["clear", "plain"],
    appreciable: ["many"],
    "as a means of": ["to"],
    "as of yet": ["yet"],
    "as to": ["on", "about"],
    "as yet": ["yet"],
    ascertain: ["find out", "learn"],
    assistance: ["help"],
    "at this time": ["now"],
    attain: ["meet"],
    "attributable to": ["because"],
    authorize: ["allow", "let"],
    "because of the fact that": ["because"],
    belated: ["late"],
    "benefit from": ["enjoy"],
    bestow: ["give", "award"],
    "by virtue of": ["by", "under"],
    cease: ["stop"],
    "close proximity": ["near"],
    commence: ["begin or start"],
    "comply with": ["follow"],
    concerning: ["about", "on"],
    consequently: ["so"],
    consolidate: ["join", "merge"],
    constitutes: ["is", "forms", "makes up"],
    demonstrate: ["prove", "show"],
    depart: ["leave", "go"],
    designate: ["choose", "name"],
    discontinue: ["drop", "stop"],
    "due to the fact that": ["because", "since"],
    "each and every": ["each"],
    economical: ["cheap"],
    eliminate: ["cut", "drop", "end"],
    elucidate: ["explain"],
    employ: ["use"],
    endeavor: ["try"],
    enumerate: ["count"],
    equitable: ["fair"],
    equivalent: ["equal"],
    evaluate: ["test", "check"],
    evidenced: ["showed"],
    exclusively: ["only"],
    expedite: ["hurry"],
    expend: ["spend"],
    expiration: ["end"],
    facilitate: ["ease", "help"],
    "factual evidence": ["facts", "evidence"],
    feasible: ["workable"],
    finalize: ["complete", "finish"],
    "first and foremost": ["first"],
    "for the purpose of": ["to"],
    forfeit: ["lose", "give up"],
    formulate: ["plan"],
    "honest truth": ["truth"],
    however: ["but", "yet"],
    "if and when": ["if", "when"],
    impacted: ["affected", "harmed", "changed"],
    implement: ["install", "put in place", "tool"],
    "in a timely manner": ["on time"],
    "in accordance with": ["by", "under"],
    "in addition": ["also", "besides", "too"],
    "in all likelihood": ["probably"],
    "in an effort to": ["to"],
    "in between": ["between"],
    "in excess of": ["more than"],
    "in lieu of": ["instead"],
    "in light of the fact that": ["because"],
    "in many cases": ["often"],
    "in order to": ["to"],
    "in regard to": ["about", "concerning", "on"],
    "in some instances ": ["sometimes"],
    "in terms of": ["omit"],
    "in the near future": ["soon"],
    "in the process of": ["omit"],
    inception: ["start"],
    "incumbent upon": ["must"],
    indicate: ["say", "state", "or show"],
    indication: ["sign"],
    initiate: ["start"],
    "is applicable to": ["applies to"],
    "is authorized to": ["may"],
    "is responsible for": ["handles"],
    "it is essential": ["must", "need to"],
    literally: ["omit"],
    magnitude: ["size"],
    maximum: ["greatest", "largest", "most"],
    methodology: ["method"],
    minimize: ["cut"],
    minimum: ["least", "smallest", "small"],
    modify: ["change"],
    monitor: ["check", "watch", "track"],
    multiple: ["many"],
    necessitate: ["cause", "need"],
    nevertheless: ["still", "besides", "even so"],
    "not certain": ["uncertain"],
    "not many": ["few"],
    "not often": ["rarely"],
    "not unless": ["only if"],
    "not unlike": ["similar", "alike"],
    notwithstanding: ["in spite of", "still"],
    "null and void": ["use either null or void"],
    numerous: ["many"],
    objective: ["aim", "goal"],
    obligate: ["bind", "compel"],
    obtain: ["get"],
    "on the contrary": ["but", "so"],
    "on the other hand": ["omit", "but", "so"],
    "one particular": ["one"],
    optimum: ["best", "greatest", "most"],
    overall: ["omit"],
    "owing to the fact that": ["because", "since"],
    participate: ["take part"],
    particulars: ["details"],
    "pass away": ["die"],
    "pertaining to": ["about", "of", "on"],
    "point in time": ["time", "point", "moment", "now"],
    portion: ["part"],
    possess: ["have", "own"],
    preclude: ["prevent"],
    previously: ["before"],
    "prior to": ["before"],
    prioritize: ["rank", "focus on"],
    procure: ["buy", "get"],
    proficiency: ["skill"],
    "provided that": ["if"],
    purchase: ["buy", "sale"],
    "put simply": ["omit"],
    "readily apparent": ["clear"],
    "refer back": ["refer"],
    regarding: ["about", "of", "on"],
    relocate: ["move"],
    remainder: ["rest"],
    remuneration: ["payment"],
    require: ["must", "need"],
    requirement: ["need", "rule"],
    reside: ["live"],
    residence: ["house"],
    retain: ["keep"],
    satisfy: ["meet", "please"],
    shall: ["must", "will"],
    "should you wish": ["if you want"],
    "similar to": ["like"],
    solicit: ["ask for", "request"],
    "span across": ["span", "cross"],
    strategize: ["plan"],
    subsequent: ["later", "next", "after", "then"],
    substantial: ["large", "much"],
    "successfully complete": ["complete", "pass"],
    sufficient: ["enough"],
    terminate: ["end", "stop"],
    "the month of": ["omit"],
    therefore: ["thus", "so"],
    "this day and age": ["today"],
    "time period": ["time", "period"],
    "took advantage of": ["preyed on"],
    transmit: ["send"],
    transpire: ["happen"],
    "until such time as": ["until"],
    utilization: ["use"],
    utilize: ["use"],
    validate: ["confirm"],
    "various different": ["various", "different"],
    "whether or not": ["whether"],
    "with respect to": ["on", "about"],
    "with the exception of": ["except for"],
    witnessed: ["saw", "seen"]
  };
}

Analyzer2.prototype.getJustifierWords = function() {
  return {
    "i believe": 1,
    "i consider": 1,
    "i don't believe": 1,
    "i don't consider": 1,
    "i don't feel": 1,
    "i don't suggest": 1,
    "i don't think": 1,
    "i feel": 1,
    "i hope to": 1,
    "i might": 1,
    "i suggest": 1,
    "i think": 1,
    "i was wondering": 1,
    "i will try": 1,
    "i wonder": 1,
    "in my opinion": 1,
    "is kind of": 1,
    "is sort of": 1,
    just: 1,
    maybe: 1,
    perhaps: 1,
    possibly: 1,
    "we believe": 1,
    "we consider": 1,
    "we don't believe": 1,
    "we don't consider": 1,
    "we don't feel": 1,
    "we don't suggest": 1,
    "we don't think": 1,
    "we feel": 1,
    "we hope to": 1,
    "we might": 1,
    "we suggest": 1,
    "we think": 1,
    "we were wondering": 1,
    "we will try": 1,
    "we wonder": 1
  };
}