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


const gameDatabase: GameDB = {
  horror: [
    {
      title: "The Mimic",
      image:
        "https://tr.rbxcdn.com/180DAY-c2b1d4c44f2f22f5b6f1f4f6d5c6f9f7/768/432/Image/Webp/noFilter",
      description: "A Japanese folklore-inspired horror experience.",
      review: "Extremely atmospheric and cinematic horror gameplay.",
      pros: ["Great atmosphere", "Strong story", "Co-op gameplay"],
      cons: ["Very scary", "Hard jumpscares"],
      advice: "Play with friends and headphones for full effect.",
      link: "https://www.roblox.com/games/6243699076/The-Mimic"
    }
  ],


  rpg: [
    {
      title: "Vesteria",
      image:
        "https://tr.rbxcdn.com/180DAY-0fd7f0db8e4f6e2d9db4d6b0ecfac2c/768/432/Image/Webp/noFilter",
      description: "Fantasy MMORPG with classes, quests, and bosses.",
      review: "Deep progression and polished RPG systems.",
      pros: ["Huge world", "Boss fights", "Class system"],
      cons: ["Grinding required", "Time consuming"],
      advice: "Perfect for long-term RPG players.",
      link: "https://www.roblox.com/games/2376885433/Vesteria"
    }
  ],


  survival: [
    {
      title: "Super Bomb Survival",
      image:
        "https://tr.rbxcdn.com/180DAY-294f64d10a58c69af95a934cfa8c8790/768/432/Image/Webp/noFilter",
      description: "Survive chaotic explosions raining from the sky.",
      review: "Fast-paced and extremely fun multiplayer chaos.",
      pros: ["Fast gameplay", "Replayable", "Skill-based"],
      cons: ["Chaotic", "Hard for beginners"],
      advice: "Learn movement early to survive longer.",
      link: "https://www.roblox.com/games/164051105/Super-Bomb-Survival"
    }
  ],


  tycoon: [
    {
      title: "Retail Tycoon 2",
      image:
        "https://tr.rbxcdn.com/180DAY-5f06f6a95b6f7e2f5d0b7c8a6d7f4e9/768/432/Image/Webp/noFilter",
      description: "Build and manage your own retail empire.",
      review: "One of the deepest tycoon games on Roblox.",
      pros: ["Creative freedom", "Strategy-based", "Relaxing"],
      cons: ["Slow start"],
      advice: "Great for players who enjoy management games.",
      link: "https://www.roblox.com/games/5865858426/Retail-Tycoon-2"
    }
  ]
};


/* =========================
   MAIN FUNCTION (FIXED)
========================= */


function findGames(): void {
  const select = document.getElementById("genreSelect") as HTMLSelectElement;
  const genre = select.value;


  const results = document.getElementById("results") as HTMLElement;
  results.innerHTML = "";


  if (!genre) {
    results.innerHTML = `<p class="empty">Please select a genre.</p>`;
    return;
  }


  const games = gameDatabase[genre];


  if (!games) {
    results.innerHTML = `<p class="empty">No games found for this genre.</p>`;
    return;
  }


  games.forEach((game: Game) => {
    const card = document.createElement("div");
    card.className = "card";


    card.innerHTML = `
      <img src="${game.image}" alt="${game.title}">


      <div class="card-content">
        <h2>${game.title}</h2>


        <p>${game.description}</p>


        <p><b>Review:</b> ${game.review}</p>


        <p><b>Pros:</b> ${game.pros.join(", ")}</p>


        <p><b>Cons:</b> ${game.cons.join(", ")}</p>


        <p>${game.advice}</p>


        <a href="${game.link}" target="_blank">Play Game</a>
      </div>
    `;


    results.appendChild(card);
  });
}


/* =========================
   IMPORTANT: GLOBAL EXPORT
   (fixes GitHub Pages onclick issue)
========================= */


(window as any).findGames = findGames;


export {};
