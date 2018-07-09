"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const content = document.getElementById('content');
data_1.data.forEach((team) => {
    const teamDiv = document.createElement('div');
    teamDiv.classList.add('team');
    const h1 = document.createElement('h1');
    h1.innerText = team.name;
    const totalsDl = document.createElement('dl');
    totalsDl.classList.add('totals');
    let meansHtml = `<dt>Lifetime Mean:</dt><dd>${team.shapedData.mean}</dd>`;
    team.shapedData.dataByYear.forEach((data) => {
        meansHtml += `<dt>${data.year} Mean:</dt><dd>${data.mean}</dd>`;
    });
    totalsDl.innerHTML = meansHtml;
    teamDiv.appendChild(h1);
    teamDiv.appendChild(totalsDl);
    content.appendChild(teamDiv);
});
