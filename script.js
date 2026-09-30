fetch("stats.json")
    .then(response => response.json())
    .then(data => {

        // Get the most recent batting season
        const current = data.batting[data.batting.length - 1];

        // Find the stats section in index.html
        const statsDiv = document.getElementById("current-stats");

        // Put the data onto the webpage
statsDiv.innerHTML = `
    <h3>${current.AVG.toFixed(3)} AVG</h3>
    <h3>${current.OBP.toFixed(3)} OBP</h3>
    <h3>${current.SLG.toFixed(3)} SLG</h3>
    <h3>${current.OPS.toFixed(3)} OPS</h3>
`;

const detailsDiv = document.getElementById("detailed-stats");

detailsDiv.innerHTML = `
    <p>Games: ${current.G}</p>
    <p>Hits: ${current.H}</p>
    <p>Doubles: ${current["2B"]}</p>
    <p>Triples: ${current["3B"]}</p>
    <p>Home Runs: ${current.HR}</p>
    <p>RBI: ${current.RBI}</p>
    <p>Runs: ${current.R}</p>
    <p>Stolen Bases: ${current.SB}</p>
`;
    })
    .catch(error => {
        console.error("Error loading stats:", error);
    });
