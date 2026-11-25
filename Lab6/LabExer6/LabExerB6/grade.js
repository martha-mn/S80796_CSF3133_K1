//Error 1 (grade.html Line 9): onsubmit should return checkMark()
//Error 2 (grade.js Line 5): if(name = "") should be if(name == "")
//Error 3 (grade.js Line 9): isNan() should be isNaN()
//Error 4 (grade.js Line 14): mark < 0 && mark > 100 should be mark < 0 || mark > 100
//Error 5 (grade.js Line 28): getElementByID() should be getElementById()
//Error 6 (grade.js Line 30): style.colour should be style.color
//Error 8 (grade.js Line 38): Loop starts at i = 1 causing Grade A missing
//Error 9 (grade.js Line 42): innerHtml should be innerHTML

function checkMark() {
 let name = document.forms["gradeForm"]["name"].value;
 let mark = document.forms["gradeForm"]["mark"].value;

 if (name === "") {
 alert("Name must be filled out.");
 return false;
 }
 if (isNaN(mark)) {
 alert("Please enter a valid numeric value.");
 return false;
 }
 mark = parseInt(mark);
 if (mark < 0 || mark > 100) {
 alert("Mark must be between 0 and 100.");
 return false;
 }
 let grade;
 if (mark >= 80) {
 grade = "A";
 } else if (mark >= 65) {
 grade = "B";
 } else if (mark >= 50) {
 grade = "C";
 } else {
 grade = "F";
 }
 document.getElementById("result").innerHTML =
 name + " got grade " + grade;
 document.getElementById("result").style.color = "green";
 return true;
 }

 function showTable() {
 let grades = ["A", "B", "C", "F"];
 let ranges = ["80-100", "65-79", "50-64", "0-49"];
 let tableHTML = "<table>";
 for (let i = 0; i < grades.length; i++) {
 tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] +
"</td></tr>";
 }
 tableHTML += "</table>";
 document.getElementById("tableContainer").innerHTML = tableHTML;
 }
