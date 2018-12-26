import React from 'react';
import Chart from 'chart.js';

const colors = [
  'rgba(0, 58, 73, 0.3)',
  'rgba(248, 221, 107, 0.3)',
  'rgba(164, 230, 218, 0.3)',
  'rgba(255, 67, 55, 0.3)',
  'rgba(188, 117, 77, 0.3)',
  'rgba(97, 155, 92, 0.3)',
  'rgba(172, 78, 140, 0.3)',
  'rgba(45, 92, 75, 0.3)',
  'rgba(22, 155, 158, 0.3)'
];

export default function managerCard({ matchupsBySeason, seasons }) {
  if (matchupsBySeason.length < 1|| seasons.length < 1) {
    return (<div></div>);
  }

  let sortedByWeeks = matchupsBySeason.map((matchups) => {
    return matchups.sort((a, b) => a.week - b.week);
  });

  let years = seasons.sort((a, b) => a.year - b.year).map((season) => season.year);

  let overallMatchupsCanvas = document.querySelector('#all-matchups');
  let eachSeasonCanvas = document.querySelector('#each-season');

  if (overallMatchupsCanvas) {
    overallMatchupsCanvas = overallMatchupsCanvas.getContext('2d');

    let matchupData = sortedByWeeks.map((dataset) => {
      return dataset.map((matchup) => parseFloat(matchup.score));
    }).flat();

    new Chart(overallMatchupsCanvas, {
      type: 'line',
      data: {
        labels: new Array(matchupData.length),
        datasets: [
          {
            label: 'Matchup Scores',
            data: matchupData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)'
          }
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 30,
              suggestedMax: 200
            }
          }]
        }
      }
    });
  }

  if (eachSeasonCanvas) {
    eachSeasonCanvas = eachSeasonCanvas.getContext('2d');
    let datasets = sortedByWeeks.map((matchups, index) => {
      let data = matchups.map((matchup) => matchup.score);
      let label = years[index];
      return {
        label,
        backgroundColor: colors[index],
        data
      }
    });
    new Chart(eachSeasonCanvas, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12', 'Week 13', 'Week 14', 'Week 15', 'Week 16'],
        datasets
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 30,
              suggestedMax: 200
            }
          }]
        }
      }
    });
  }

  return (
    <div>
      <div className="chart-wrapper">
        <canvas id="all-matchups" width="200" height="400"></canvas>
      </div>
      <div className="chart-wrapper">
        <canvas id="each-season" width="200" height="400"></canvas>
      </div>
    </div>
  );
}
