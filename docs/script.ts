type Game = {
  title: string;
  image: string;
  description: string;
  review: string;
  pros: string[];
  cons: string[];
  advice: string;
  link: string;
};

type GameDB = {
  [genre: string]: Game[];
};

/* =========================
   GAME DATABASE
========================= */

const gameDatabase: GameDB = {
  horror: [
    {
      title: "The Mimic",
      image:
        "https://tr.rbxcdn.com/180DAY-c2b1d4c44f2f22f5b6f1f4f6d5c6f9f7/768/432/Image/Webp/noFilter",
      description:
        "A Japanese folklore-inspired horror experience with terrifying monsters.",
      review:
        "Extremely atmospheric and cinematic horror gameplay.",
      pros: ["Great atmosphere", "Strong story", "Co-op gameplay"],
      cons: ["Very scary", "Hard jumpscares"],
      advice:
        "Play with friends and headphones for the best experience.",
      link: "https://www.roblox.com/games/6243699076/The-Mimic"
    },

    {
      title: "DOORS",
      image:
        "https://tr.rbxcdn.com/180DAY-doors/768/432/Image/Webp/noFilter",
      description:
        "Escape mysterious rooms while avoiding deadly entities.",
      review:
        "One of the best modern Roblox horror experiences.",
      pros: ["Replayable", "Amazing sound design", "Unique enemies"],
      cons: ["Can become repetitive"],
      advice:
        "Pay attention to sounds and visual clues.",
      link: "https://www.roblox.com/games/6516141723/DOORS"
    },

    {
      title: "Dead Silence",
      image:
        "https://tr.rbxcdn.com/180DAY-deadsilence/768/432/Image/Webp/noFilter",
      description:
        "Investigate a disturbing legend in this classic horror game.",
      review:
        "Still one of the creepiest Roblox games ever made.",
      pros: ["Story-driven", "Classic horror vibe"],
      cons: ["Older visuals"],
      advice:
        "Use headphones and turn off the lights.",
      link: "https://www.roblox.com/games/2577040780/Dead-Silence-Horror"
    }
  ],

  rpg: [
    {
      title: "Vesteria",
      image:
        "https://tr.rbxcdn.com/180DAY-vesteria/768/432/Image/Webp/noFilter",
      description:
        "Fantasy MMORPG with classes, quests, and boss fights.",
      review:
        "Deep progression and polished RPG mechanics.",
      pros: ["Huge world", "Class system", "Boss battles"],
      cons: ["Grinding required"],
      advice:
        "Best enjoyed long-term with friends.",
      link: "https://www.roblox.com/games/2376885433/Vesteria"
    },

    {
      title: "World // Zero",
      image:
        "https://tr.rbxcdn.com/180DAY-worldzero/768/432/Image/Webp/noFilter",
      description:
        "Anime-inspired dungeon RPG with flashy combat.",
      review:
        "Fast-paced gameplay with tons of content.",
      pros: ["Smooth combat", "Large world", "Great multiplayer"],
      cons: ["Heavy grinding"],
      advice:
        "Join parties for faster leveling.",
      link: "https://www.roblox.com/games/2727067538/World-Zero"
    },

    {
      title: "Deepwoken",
      image:
        "https://tr.rbxcdn.com/180DAY-deepwoken/768/432/Image/Webp/noFilter",
      description:
        "Hardcore RPG featuring difficult combat and permadeath.",
      review:
        "A challenging but rewarding experience.",
      pros: ["Deep mechanics", "Unique builds", "Massive world"],
      cons: ["Very difficult"],
      advice:
        "Expect to lose characters while learning.",
      link: "https://www.roblox.com/games/4111023553/Deepwoken"
    }
  ],

  survival: [
    {
      title: "3008",
      image:
        "https://tr.rbxcdn.com/180DAY-3008/768/432/Image/Webp/noFilter",
      description:
        "Survive in an endless IKEA-inspired store.",
      review:
        "Creative and surprisingly immersive survival gameplay.",
      pros: ["Base building", "Multiplayer", "Unique concept"],
      cons: ["Can get repetitive"],
      advice:
        "Build your base above ground level.",
      link: "https://www.roblox.com/games/2768379856/3008"
    },

    {
      title: "Natural Disaster Survival",
      image:
        "https://tr.rbxcdn.com/180DAY-nds/768/432/Image/Webp/noFilter",
      description:
        "Survive earthquakes, floods, tornadoes, and more.",
      review:
        "Simple but timeless Roblox fun.",
      pros: ["Classic gameplay", "Easy to learn", "Replayable"],
      cons: ["Basic mechanics"],
      advice:
        "Stay alert and move quickly.",
      link: "https://www.roblox.com/games/189707/Natural-Disaster-Survival"
    },

    {
      title: "Super Bomb Survival",
      image:
        "https://tr.rbxcdn.com/180DAY-sbs/768/432/Image/Webp/noFilter",
      description:
        "Dodge insane explosions raining from the sky.",
      review:
        "Fast-paced chaos with a high skill ceiling.",
      pros: ["Exciting gameplay", "Highly replayable"],
      cons: ["Difficult for beginners"],
      advice:
        "Movement skills are everything.",
      link: "https://www.roblox.com/games/164051105/Super-Bomb-Survival"
    }
  ],

  tycoon: [
    {
      title: "Retail Tycoon 2",
      image:
        "https://tr.rbxcdn.com/180DAY-retailtycoon/768/432/Image/Webp/noFilter",
      description:
        "Build and manage your own successful retail store.",
      review:
        "One of the deepest management games on Roblox.",
      pros: ["Creative freedom", "Strategy gameplay"],
      cons: ["Slow beginning"],
      advice:
        "Expand carefully to avoid losing money.",
      link: "https://www.roblox.com/games/5865858426/Retail-Tycoon-2"
    },

    {
      title: "Restaurant Tycoon 2",
      image:
        "https://tr.rbxcdn.com/180DAY-restauranttycoon/768/432/Image/Webp/noFilter",
      description:
        "Create and manage a custom restaurant business.",
      review:
        "Relaxing and very polished tycoon gameplay.",
      pros: ["Customization", "Relaxing progression"],
      cons: ["Can become grindy"],
      advice:
        "Upgrade staff efficiency early.",
      link: "https://www.roblox.com/games/3398014311/Restaurant-Tycoon-2"
    },

    {
      title: "Theme Park Tycoon 2",
      image:
        "https://tr.rbxcdn.com/180DAY-themepark/768/432/Image/Webp/noFilter",
      description:
        "Design massive custom theme parks.",
      review:
        "Excellent building mechanics and creativity.",
      pros: ["Huge freedom", "Detailed building"],
      cons: ["Learning curve"],
      advice:
        "Start small before making giant parks.",
      link: "https://www.roblox.com/games/69184822/Theme-Park-Tycoon-2"
    }
  ],

  simulator: [
    {
      title: "Bee Swarm Simulator",
      image:
        "https://tr.rbxcdn.com/180DAY-beeswarm/768/432/Image/Webp/noFilter",
      description:
        "Collect pollen and build your bee army.",
      review:
        "One of the most addictive simulators on Roblox.",
      pros: ["Lots of progression", "Relaxing gameplay"],
      cons: ["Very grindy"],
      advice:
        "Focus on upgrading bees early.",
      link: "https://www.roblox.com/games/1537690962/Bee-Swarm-Simulator"
    },

    {
      title: "Pet Simulator 99",
      image:
        "https://tr.rbxcdn.com/180DAY-petsim/768/432/Image/Webp/noFilter",
      description:
        "Collect pets and unlock powerful upgrades.",
      review:
        "Huge playerbase and satisfying progression.",
      pros: ["Addictive", "Fun collecting"],
      cons: ["Heavy microtransactions"],
      advice:
        "Save gems for rare pets.",
      link: "https://www.roblox.com/games/8737899170/Pet-Simulator-99"
    }
  ]
};

/* =========================
   HELPER FUNCTIONS
========================= */

function clearResults(): void {
  const results = document.getElementById("results");

  if (results) {
    results.innerHTML = "";
  }
}

function createGameCard(game: Game): HTMLDivElement {
  const card = document.createElement("div");

  card.className = "card";

  card.innerHTML = `
    <img src="${game.image}" alt="${game.title}">

    <div class="card-content">
      <h2>${game.title}</h2>

      <p>${game.description}</p>

      <p><strong>Review:</strong> ${game.review}</p>

      <p><strong>Pros:</strong> ${game.pros.join(", ")}</p>

      <p><strong>Cons:</strong> ${game.cons.join(", ")}</p>

      <p><strong>Advice:</strong> ${game.advice}</p>

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

function findGames(): void {
  const select =
    document.getElementById("genreSelect") as HTMLSelectElement;

  const results =
    document.getElementById("results") as HTMLElement;

  const genre = select.value;

  clearResults();

  if (!genre) {
    results.innerHTML = `
      <p class="empty">
        Please select a genre.
      </p>
    `;
    return;
  }

  const games = gameDatabase[genre];

  if (!games || games.length === 0) {
    results.innerHTML = `
      <p class="empty">
        No games found for this genre.
      </p>
    `;
    return;
  }

  games
    .sort((a, b) => a.title.localeCompare(b.title))
    .forEach((game: Game) => {
      const card = createGameCard(game);
      results.appendChild(card);
    });
}

/* =========================
   GITHUB PAGES FIX
========================= */

(window as any).findGames = findGames;

export {};
