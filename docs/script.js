/* =========================
   GAME DATABASE
========================= */

const gameDatabase = {
  horror: [
    {
      title: "The Mimic",
      image: "https://static.wikia.nocookie.net/mimic/images/f/f6/Netamoicon1.png/revision/latest?cb=20260107085122",
      description:
        "A Japanese folklore-inspired horror experience.",
      review:
        "Extremely atmospheric and cinematic horror gameplay.",
      pros: ["Great atmosphere", "Strong story", "Co-op gameplay"],
      cons: ["Very scary", "Hard jumpscares"],
      advice:
        "Play with friends and headphones for the best experience.",
      link:
        "https://www.roblox.com/games/6243699076/The-Mimic"
    },

    {
      title: "DOORS",
      image: "https://placehold.co/600x400/111827/38bdf8?text=DOORS",
      description:
        "Escape mysterious rooms while avoiding deadly entities.",
      review:
        "One of the best modern Roblox horror experiences.",
      pros: ["Replayable", "Amazing sound design"],
      cons: ["Can become repetitive"],
      advice:
        "Pay attention to sounds and visual clues.",
      link:
        "https://www.roblox.com/games/6516141723/DOORS"
    },

    {
      title: "Dead Silence",
      image: "https://placehold.co/600x400/111827/38bdf8?text=Dead+Silence",
      description:
        "Investigate a disturbing urban legend.",
      review:
        "Still one of the creepiest Roblox games ever made.",
      pros: ["Story-driven", "Classic horror vibe"],
      cons: ["Older visuals"],
      advice:
        "Use headphones and turn off the lights.",
      link:
        "https://www.roblox.com/games/2577040780/Dead-Silence-Horror"
    }
  ],

  rpg: [
    {
      title: "Vesteria",
      image: "https://placehold.co/600x400/111827/38bdf8?text=Vesteria",
      description:
        "Fantasy MMORPG with quests and bosses.",
      review:
        "Deep progression and polished RPG mechanics.",
      pros: ["Huge world", "Boss battles"],
      cons: ["Grinding required"],
      advice:
        "Best enjoyed long-term with friends.",
      link:
        "https://www.roblox.com/games/2376885433/Vesteria"
    },

    {
      title: "Deepwoken",
      image: "https://placehold.co/600x400/111827/38bdf8?text=Deepwoken",
      description:
        "Hardcore RPG featuring difficult combat.",
      review:
        "A challenging but rewarding experience.",
      pros: ["Deep mechanics", "Massive world"],
      cons: ["Very difficult"],
      advice:
        "Expect to lose characters while learning.",
      link:
        "https://www.roblox.com/games/4111023553/Deepwoken"
    }
  ],

  survival: [
    {
      title: "3008",
      image: "https://placehold.co/600x400/111827/38bdf8?text=3008",
      description:
        "Survive in an endless IKEA-inspired store.",
      review:
        "Creative and immersive survival gameplay.",
      pros: ["Base building", "Unique concept"],
      cons: ["Can get repetitive"],
      advice:
        "Build your base above ground level.",
      link:
        "https://www.roblox.com/games/2768379856/3008"
    },

    {
      title: "Natural Disaster Survival",
      image: "https://placehold.co/600x400/111827/38bdf8?text=Natural+Disaster",
      description:
        "Survive earthquakes, floods, tornadoes, and more.",
      review:
        "Simple but timeless Roblox fun.",
      pros: ["Replayable", "Classic gameplay"],
      cons: ["Basic mechanics"],
      advice:
        "Stay alert and move quickly.",
      link:
        "https://www.roblox.com/games/189707/Natural-Disaster-Survival"
    }
  ],

  tycoon: [
    {
      title: "Retail Tycoon 2",
      image: "https://placehold.co/600x400/111827/38bdf8?text=Retail+Tycoon+2",
      description:
        "Build and manage your own successful retail store.",
      review:
        "One of the deepest management games on Roblox.",
      pros: ["Creative freedom", "Strategy gameplay"],
      cons: ["Slow beginning"],
      advice:
        "Expand carefully to avoid losing money.",
      link:
        "https://www.roblox.com/games/5865858426/Retail-Tycoon-2"
    },

    {
      title: "Theme Park Tycoon 2",
      image: "https://placehold.co/600x400/111827/38bdf8?text=Theme+Park+Tycoon+2",
      description:
        "Design massive custom theme parks.",
      review:
        "Excellent building mechanics and creativity.",
      pros: ["Huge freedom", "Detailed building"],
      cons: ["Learning curve"],
      advice:
        "Start small before giant projects.",
      link:
        "https://www.roblox.com/games/69184822/Theme-Park-Tycoon-2"
    }
  ],

  simulator: [
    {
      title: "Bee Swarm Simulator",
      image: "https://placehold.co/600x400/111827/38bdf8?text=Bee+Swarm",
      description:
        "Collect pollen and build your bee army.",
      review:
        "One of Roblox's most addictive simulators.",
      pros: ["Relaxing gameplay", "Lots of progression"],
      cons: ["Very grindy"],
      advice:
        "Upgrade your bees early.",
      link:
        "https://www.roblox.com/games/1537690962/Bee-Swarm-Simulator"
    },

    {
      title: "Pet Simulator 99",
      image: "https://placehold.co/600x400/111827/38bdf8?text=Pet+Simulator+99",
      description:
        "Collect pets and unlock powerful upgrades.",
      review:
        "Huge playerbase and satisfying progression.",
      pros: ["Addictive", "Fun collecting"],
      cons: ["Heavy microtransactions"],
      advice:
        "Save gems for rare pets.",
      link:
        "https://www.roblox.com/games/8737899170/Pet-Simulator-99"
    }
  ]
};

/* =========================
   CLEAR RESULTS
========================= */

function clearResults() {
  const results = document.getElementById("results");

  results.innerHTML = "";
}

/* =========================
   CREATE GAME CARD
========================= */

function createGameCard(game) {
  const card = document.createElement("div");

  card.className = "card";

  card.innerHTML = `
    <img src="${game.image}" alt="${game.title}">

    <div class="card-content">
      <h2>${game.title}</h2>

      <p>${game.description}</p>

      <p>
        <strong>Review:</strong>
        ${game.review}
      </p>

      <p>
        <strong>Pros:</strong>
        ${game.pros.join(", ")}
      </p>

      <p>
        <strong>Cons:</strong>
        ${game.cons.join(", ")}
      </p>

      <p>
        <strong>Advice:</strong>
        ${game.advice}
      </p>

      <a href="${game.link}" target="_blank">
        Play Game
      </a>
    </div>
  `;

  return card;
}

/* =========================
   MAIN SEARCH FUNCTION
========================= */

function findGames() {
  const select =
    document.getElementById("genreSelect");

  const genre = select.value;

  const results =
    document.getElementById("results");

  clearResults();

  // No genre selected
  if (!genre) {
    results.innerHTML = `
      <p class="empty">
        Please select a genre.
      </p>
    `;

    return;
  }

  // Get games for selected genre
  const games = gameDatabase[genre];

  // No games found
  if (!games || games.length === 0) {
    results.innerHTML = `
      <p class="empty">
        No games found.
      </p>
    `;

    return;
  }

  // Render cards
  games.forEach((game) => {
    const card = createGameCard(game);

    results.appendChild(card);
  });
}

/* =========================
   GLOBAL EXPORT
========================= */

window.findGames = findGames;