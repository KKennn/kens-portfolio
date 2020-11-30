var Airtable = require("airtable");
var base = new Airtable({ apiKey: "keyPpwPPhAWDl4l9Z" }).base("app9oGU08hRScWw8G");

base('BeATree').select({ sort: [{ field: "Order", direction: "asc" }] }).firstPage(onProject);

function onProject(err, records) {
    if (err) { console.error(err); return; }
    console.log(records);

    let header = document.getElementsByClassName("header")[0];
    header.innerHTML = `
        <a href="index.html"><img class="header-logo" src="logo.gif" alt="Logo"></a>
        <div class="header-button"><a href="index.html">Design</a></div>
        <div class="header-button"><a href="index.html#A+C">Art+Code</a></div>
        <div class="header-button"><a href="about.html">About</a></div>
    `

    let wrap = document.getElementsByClassName("wrap")[0];
    for (let i = 0; i < records.length; i++) {
        let thisDiv = document.createElement("div");
        if (i < records.length - 2 && records[i].fields.Type == "section-title" && records[i + 1].fields.Type == "section-description") {
            let sectionDiv = document.createElement("div");
            sectionDiv.setAttribute("class", "section-block");
            let sectionIntro = document.createElement("div");
            sectionIntro.setAttribute("class", "section-intro");
            let sectionTitle = document.createElement("h3");
            let sectionDesc = document.createElement("p");
            sectionTitle.innerHTML = records[i].fields.Text;
            sectionDesc.innerHTML = records[i + 1].fields.Text;
            sectionIntro.appendChild(sectionTitle);
            sectionIntro.appendChild(sectionDesc);
            sectionDiv.appendChild(sectionIntro);

            let sectionContent = document.createElement("div");
            sectionContent.setAttribute("class", "section-content");

            if (records[i + 2].fields.Image) {
                let thisImg = document.createElement("img");
                thisImg.setAttribute("src", records[i + 2].fields.Image[0].url);

                sectionContent.appendChild(thisImg);
                sectionDiv.appendChild(sectionContent);
            }

            if (records[i + 2].fields.Text) {
                let thisPar = document.createElement("p");
                thisPar.innerHTML = records[i + 2].fields.Text;
                sectionContent.appendChild(thisPar);
                sectionDiv.appendChild(sectionContent);
            }
            wrap.appendChild(sectionDiv);
            i += 2;
        } else {

            thisDiv.setAttribute("class", records[i].fields.Type);
            if (records[i].fields.Text) {
                thisDiv.innerHTML = records[i].fields.Text;
            }
            if (records[i].fields.Image) {
                let thisImg = document.createElement("img");
                thisImg.setAttribute("src", records[i].fields.Image[0].url);
                thisDiv.appendChild(thisImg);
            }
            wrap.appendChild(thisDiv);
        }
    }
}