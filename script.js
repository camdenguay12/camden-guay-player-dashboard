fetch("stats.json")
    .then(response => response.json())
    .then(data => {

        const seasonSelect = document.getElementById("season-select");
        const statsDiv = document.getElementById("current-stats");
        const detailsDiv = document.getElementById("detailed-stats");

        // Add every batting season to the dropdown
        data.batting.forEach((season, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = season.season;
            seasonSelect.appendChild(option);
        });

        function displaySeason(index) {
            const current = data.batting[index];

            statsDiv.innerHTML = `
                <h3>${current.AVG.toFixed(3)} AVG</h3>
                <h3>${current.OBP.toFixed(3)} OBP</h3>
                <h3>${current.SLG.toFixed(3)} SLG</h3>
                <h3>${current.OPS.toFixed(3)} OPS</h3>
            `;

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
        }

        // Start on newest season
        const newestSeason = data.batting.length - 1;
        seasonSelect.value = newestSeason;
        displaySeason(newestSeason);

        // Change stats when dropdown changes
        seasonSelect.addEventListener("change", function() {
            displaySeason(this.value);
        });
    });
