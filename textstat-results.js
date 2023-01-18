let editor1 = document.getElementById("editor1").innerHTML;
let editor2 = document.getElementById("editor2").innerHTML;

fetch('http://matthallcommon.pythonanywhere.com/grade_level', {
    method: 'POST',
    body: JSON.stringify({'Editor 1': editor1, 'Editor 2': editor2}),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
      console.log(data);
      let grade_level_editor1 = data.grade_level_editor1;
      let grade_level_editor2 = data.grade_level_editor2;
      // Append results to the <div> elements
      document.getElementById("gradelevel_editor1").innerHTML = grade_level_editor1;
      document.getElementById("gradelevel_editor2").innerHTML = grade_level_editor2;
  })
  .catch(err => console.error(err));