import { data } from './data';
import { Team, YearData, Result } from './interfaces';

declare const moment: any;
declare const d3: any;
declare const nv: nv.Nvd3Static;

const content = document.getElementById('content');

data.forEach((team: Team) => {

    const teamDiv = document.createElement('div');
    teamDiv.classList.add('team');

    const h1 = document.createElement('h1');
    h1.innerText = team.name;

    const totalsDl = document.createElement('dl');
    totalsDl.classList.add('totals');

    let meansHtml = `<dt>Lifetime Mean:</dt><dd>${team.shapedData!.mean}</dd>`;
    team.shapedData!.dataByYear.forEach((data: YearData) => {

        meansHtml += `<dt>${data.year} Mean:</dt><dd>${data.mean}</dd>`;

    });

    totalsDl.innerHTML = meansHtml;

    teamDiv.appendChild(h1);
    teamDiv.appendChild(totalsDl);

    const chartEl = document.createElement('div');
    chartEl.classList.add('with-3d-shadow', 'with-transitions', 'averageDegreesLineChart');
    chartEl.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));

    teamDiv.appendChild(chartEl);

    content!.appendChild(teamDiv);

    const data: {key: string, values: { x: any, y: any }[] }[] = [
        {
            key: 'Key',
            values: []
        }
    ];
    team.results.forEach((result: Result) => {

        data[0].values.push({
            x: moment(result.date).utc().valueOf(),
            y: result.score
        })

    });
    console.log(data);
    nv.addGraph(() => {

        const chart = nv.models.lineChart() // Initialise the lineChart object.
        .useInteractiveGuideline(true); // Turn on interactive guideline (tooltips)

        chart.xAxis
        .axisLabel('TimeStamp') // Set the label of the xAxis (Vertical)
        .tickFormat((ts: number) => {

            return d3.time.format('%b')(new Date(ts));

        });

        chart.yAxis
        .axisLabel('Score'); // Set the label of the yAxis (Horizontal)
        // .tickFormat(d3.format('.02f')); // Rounded Numbers Format.

        d3.select(chartEl.querySelector('svg'))
        .datum(data)
        .transition().duration(500) // Set transition speed
        .call(chart); // Call & Render the chart

        nv.utils.windowResize(chart.update); // Intitiate listener for window resize so the chart responds and changes width.
        return chart;

    });
});
