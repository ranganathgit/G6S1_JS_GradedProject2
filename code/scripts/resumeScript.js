console.log("In resumes Javascript file");

//declaration of variables
let totalResumes;
let currentIndex = 0;
let output = "";
let filteredResults = [];
let counter = 0;
let results;

//function to fetch the json data from the local JSON file
async function fetchResumes() {
  try {
    const response = await fetch("json-file/Data.json");
    const resumesObject = await response.json();
    return resumesObject;
  } catch (error) {
    console.error(error);
  }
}

//function call the fetchResumes method
async function renderResume() {
  results = await fetchResumes();
  totalResumes = results.resume.length;
  filteredResults = [...results.resume];
  console.log("currentIndex in fetch API: ", currentIndex);
  renderFilteredResume(currentIndex);
}

//this method is called when the page is loaded and it renders the first resume
renderResume();

//this method is to navigate to previous resume when there is morethan one resume
function prev() {
  console.log("in previous button event");
  console.log("totalResumes in prev: ", totalResumes);

  if (currentIndex != 0 && currentIndex <= totalResumes - 1) {
    console.log(
      "prev if",
      "currentIndex: ",
      currentIndex,
      "totalResumes",
      totalResumes
    );
    currentIndex--;
    renderFilteredResume(currentIndex);
  } else {
    //do nothing
  }
}
//this method is to navigate to next resume when there is morethan one resume
function next() {
  console.log("in next button event");
  console.log(
    "currentIndex: ",
    currentIndex,
    " totalResumes in next: ",
    totalResumes
  );

  if (currentIndex == totalResumes - 1) {
  } else {
    console.log(
      "next else",
      "currentIndex: ",
      currentIndex,
      "totalResumes",
      totalResumes
    );
    currentIndex++;
    renderFilteredResume(currentIndex);
  }
}

//this method is to render the resume based on the currentIndex
function renderFilteredResume(currentIndex) {
  console.log("renderFilteredResume");
  console.log(results.resume);
  console.log("from filteredResults");
  console.log("currentIndex: ", currentIndex);
  output = `<div class="search-hdr">
  ${
    currentIndex > 0
      ? `<button class="nav-buttons" id="nav-previous" onclick="prev()">
        Previous
      </button>`
      : ""
  }
  ${
    filteredResults.length > 1
      ? `<input ${
          currentIndex > 0
            ? `style='margin-left: 90px'`
            : `style='margin-left: 600px'`
        } id="search" type="search" placeholder="search for keywords to filter the resources" onsearch="filterResumes()">`
      : `<input style='margin-left: 600px' id="search" type="search" placeholder="search for keywords to filter the resources" onsearch="filterResumes()">`
  }
  ${
    currentIndex < filteredResults.length - 1
      ? `<button class="nav-buttons" id="nav-next" onclick="next()">Next</button>`
      : ""
  }<br><br>
  </div>
  <h1 class="header" id="resource-name">${
    filteredResults[currentIndex].basics.name
  }</h1>
  <p class="header" id="role"><span>Applied For: </span>${
    filteredResults[currentIndex].basics.AppliedFor
  }</p>
  <div class="full">
  <div class="left">
      <!-- <div class="image">
      <img src="https://media.geeksforgeeks.org/wp-content/uploads/20220202083519/gfglogo.png" alt="gfg-logo"
        style="width:100px;height:100px;">
    </div> -->
      <div class="Contact">
        <h2>Personal Information</h2>
        <p>${filteredResults[currentIndex].basics.phone}</p>
        <p>${filteredResults[currentIndex].basics.email}</p>
        <div class="anchor">
          <a href=${
            filteredResults[currentIndex].basics.profiles.url
          }>LinkedIn</a>
        </div>
      </div>
      <div class="Skills">
        <h2>Technical Skills</h2>
        ${filteredResults[currentIndex].skills.keywords
          .map((skills) => `<p>${skills}</p>`)
          .join("")}
      </div>
      <div class="Hobbies">
      <h2>Hobbies</h2>
        ${filteredResults[currentIndex].interests.hobbies
          .map((hobby) => `<p>${hobby}</p>`)
          .join("")}
      </div>
    </div>
    <div class="right">
    <div class="name">
        <h1>Work Expereience in previous company</h1><br />
      </div>
      <div class="title">
        <span>Company Name: </span>
        <p>${filteredResults[currentIndex].work["Company Name"]}</p><br /><br />
        <span>Position: </span>
        <p>${filteredResults[currentIndex].work.Position}</p><br /><br />
        <span>Start Date: </span>
        <p>${filteredResults[currentIndex].work["Start Date"]}</p><br /><br />
        <span>End Date: </span>
        <p>${filteredResults[currentIndex].work["End Date"]}</p><br /><br>

        <p><span class="summary">Summary: </span>${
          filteredResults[currentIndex].work.Summary
        }
        </p>
      </div>
      <h2>Projects</h2><br>
      <div class="Projects">
      <p><span>${filteredResults[currentIndex].projects.name}: </span>${
    filteredResults[currentIndex].projects.description
  }</p>
      </div>
      <h2>Education</h2><br>
      <div class="Education">
        <ul>
          <li> <span>UG: </span>${
            filteredResults[currentIndex].education.UG.institute
          }, ${filteredResults[currentIndex].education.UG.course}, ${
    filteredResults[currentIndex].education.UG["Start Date"]
  }, ${filteredResults[currentIndex].education.UG["End Date"]}
, ${filteredResults[currentIndex].education.UG["cgpa"]}
</li>
          <li><span>PU: </span>${
            filteredResults[currentIndex].education["Senior Secondary"]
              .institute
          }, ${
    filteredResults[currentIndex].education["Senior Secondary"].cgpa
  }</li>
          <li><span>High School: </span>${
            filteredResults[currentIndex].education["High School"].institute
          }, ${filteredResults[currentIndex].education["High School"].cgpa}</li>
        </ul>

      </div>
      <h2>Internship</h2><br>
      <div class="Experience">
        <ul>
          <li><span>Company Name: </span>${
            filteredResults[currentIndex].Internship["Company Name"]
          }</li>
          <li><span>Position: </span>${
            filteredResults[currentIndex].Internship.Position
          }</li>
          <li><span>Start Date: </span>${
            filteredResults[currentIndex].Internship["Start Date"]
          }</li>
          <li><span>End Date: </span>${
            filteredResults[currentIndex].Internship["End Date"]
          }</li>
          <li>
            <p><span class="summary">Summary: </span>${
              filteredResults[currentIndex].Internship.Summary
            }
            </p>
          </li>
        </ul>
      </div>
      <h2>Achievements</h2><br>
      <div class="achievements">
        <ul>
          <li>${filteredResults[currentIndex].achievements.Summary}</li>
        </ul>
      </div>
    </div>
    </div>
  `;

  document.querySelector(".resumes").innerHTML = output;
}

//this methood filters the resumes based on the value entered in the search box in HTML page
function filterResumes() {
  console.log("inside filterResumes ");
  const input = document.querySelector("#search");
  console.log(`The term searched for was ${input.value}`);
  filterJob = input.value;
  try {
    if (filterJob) {
      filteredResults.fill(null);
      // console.log("filterJob inside renderResume");
      // console.log("filteredResults before loop....", filteredResults);
      // console.log("original resumes before loop....", results.resume);
      for (index = 0; index < results.resume.length; index++) {
        //for (m = 0; m < results.resume[index].skills.keywords.length; m++) {
        //console.log(results.resume[index].skills.keywords[m]);
        if (
          results.resume[index].basics.AppliedFor.toLowerCase() ==
          filterJob.toLowerCase()
        ) {
          console.log("Assigning to array");
          filteredResults[counter++] = results.resume[index];
        }
        //}
      }

      filteredResults = filteredResults.filter((val) => val != null);

      if (filteredResults.length > 0) {
        currentIndex = 0;
        totalResumes = filteredResults.length;
        renderFilteredResume(currentIndex);
      } else {
        //if there are no resumes then shows error message
        output = `
    <input style='width: 54%; margin-left: 120px; margin-bottom: 30px' id="search" type="search" placeholder="search for keywords to filter the resources" onsearch="filterResumes()"> <br><br>
        <div class="no-resumes">
        <span style='font-size:100px;'>&#128542;</span>
        <h1>No such results found</h1>
        </div>
        `;
        document.querySelector(".resumes").innerHTML = output;
      }
    }
    // else {
    //   currentIndex = 0;
    //   renderResume();
    // }
  } catch (Error) {
    console.log(Error);
  }
}

if (!!window.performance && window.performance.navigation.type == 2) {
  window.location.reload();
}
