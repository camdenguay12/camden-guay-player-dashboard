fetch("stats.json")
    .then(response => response.json())
    .then(data => {

        const typeSelect = document.getElementById("stat-type");
        const seasonSelect = document.getElementById("season-select");
        const title = document.getElementById("season-title");
        const statsDiv = document.getElementById("current-stats");
        const detailsDiv = document.getElementById("detailed-stats");

        function loadSeasons() {
            const type = typeSelect.value;
            const seasons = data[type];

            seasonSelect.innerHTML = "";

            seasons.forEach((season, index) => {
                const option = document.createElement("option");
                option.value = index;
                option.textContent = season.season;
                seasonSelect.appendChild(option);
            });

            seasonSelect.value = seasons.length - 1;
            displayStats();
        }

        function displayStats() {
            const type = typeSelect.value;
            const current = data[type][seasonSelect.value];

            title.textContent = `${current.season} ${type === "batting" ? "Batting" : "Pitching"} Statistics`;

            if (type === "batting") {
                statsDiv.innerHTML = `
                    <h3>${current.AVG.toFixed(3)} AVG</h3>
                    <h3>${current.OBP.toFixed(3)} OBP</h3>
                    <h3>${current.SLG.toFixed(3)} SLG</h3>
                    <h3>${current.OPS.toFixed(3)} OPS</h3>
                `;

                detailsDiv.innerHTML = `
                    <p>Games: ${current.G}</p>
                    <p>At Bats: ${current.AB}</p>
                    <p>Hits: ${current.H}</p>
                    <p>Doubles: ${current["2B"]}</p>
                    <p>Triples: ${current["3B"]}</p>
                    <p>Home Runs: ${current.HR}</p>
                    <p>RBI: ${current.RBI}</p>
                    <p>Runs: ${current.R}</p>
                    <p>Walks: ${current.BB}</p>
                    <p>Strikeouts: ${current.SO}</p>
                    <p>Stolen Bases: ${current.SB}</p>
                `;
            } else {
                statsDiv.innerHTML = `
                    <h3>${current.ERA.toFixed(2)} ERA</h3>
                    <h3>${current.WHIP.toFixed(2)} WHIP</h3>
                    <h3>${current.W} W</h3>
                    <h3>${current.SO} K</h3>
                `;

                detailsDiv.innerHTML = `
                    <p>Games: ${current.G}</p>
                    <p>Starts: ${current.GS}</p>
                    <p>Record: ${current.W}-${current.L}</p>
                    <p>Saves: ${current.SV}</p>
                    <p>Innings: ${current.IP}</p>
                    <p>Hits: ${current.H}</p>
                    <p>Runs: ${current.R}</p>
                    <p>Earned Runs: ${current.ER}</p>
                    <p>Walks: ${current.BB}</p>
                    <p>Strikeouts: ${current.SO}</p>
                `;
            }
        }

        typeSelect.addEventListener("change", loadSeasons);
        seasonSelect.addEventListener("change", displayStats);

        loadSeasons();
    });
