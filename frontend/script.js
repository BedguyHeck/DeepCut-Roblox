function showTab(tab) {
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));

  document.getElementById(tab).classList.add("active");

  document.querySelectorAll("nav button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
}

document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => showTab(btn.dataset.tab));
});

const input = document.getElementById("user-input");
const output = document.getElementById("output-area");
const form = document.getElementById("chat-form");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.textContent = text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const prompt = input.value.trim();
  if (!prompt) return;

  addMessage(`You: ${prompt}`, "user");
  input.value = "";

  const loading = document.createElement("div");
  loading.classList.add("message", "ai");
  loading.textContent = "AI is thinking...";
  output.appendChild(loading);

  try {
    const res = await fetch("https://turbo-meme-5gq6wpq7r6v27q9-8000.app.github.dev/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    loading.remove();

    if (res.ok) {
      addMessage(`AI: ${data.answer}`, "ai");
    } else {
      addMessage(data.detail || "Error", "error");
    }

  } catch {
    loading.remove();
    addMessage("Backend not running", "error");
  }
});

const gameDatabase = {
  horror: [
    {
      title: "The Mimic",
      image: "https://tr.rbxcdn.com/180DAY-62b697efe0158d0563e36fc30c72325e/500/280/Image/Jpeg/noFilter",
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
      image: "https://tr.rbxcdn.com/180DAY-663bc02a3552df83c78368c3b4cce0eb/500/280/Image/Jpeg/noFilter",
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
      image: "https://tr.rbxcdn.com/180DAY-d2a4a4801eea1eb5206f9d87b3f272ca/768/432/Image/Webp/noFilter",
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
      image: "https://tr.rbxcdn.com/180DAY-672284a799dbf0af07ae393a30523668/768/432/Image/Webp/noFilter",
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
      image: "https://tr.rbxcdn.com/180DAY-8ccf38cd2fbade23ab2400645f112986/500/280/Image/Jpeg/noFilter",
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
      image: "https://tr.rbxcdn.com/180DAY-a594aab49519056cbac9bbf4c78c9571/768/432/Image/Webp/noFilter",
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
      image: "https://tr.rbxcdn.com/180DAY-ad0ab7bbc71b26764f3bfc061281f363/500/280/Image/Jpeg/noFilter",
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
      image: "https://tr.rbxcdn.com/180DAY-1065393c52e9f52b98db9a26cd9b5d8a/500/280/Image/Jpeg/noFilter",
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
      image: "https://tr.rbxcdn.com/180DAY-43ce23701dc7af2de45af720b32caf0c/768/432/Image/Webp/noFilter",
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
      image: "https://tr.rbxcdn.com/180DAY-315e29556054777604420711cb64f0b6/768/432/Image/Webp/noFilter",
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
      image: "https://tr.rbxcdn.com/180DAY-2617a1464fb92641ff64536df06ef396/768/432/Image/Webp/noFilter",
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


const results = document.getElementById("results");

function findGames() {
  const genre = document.getElementById("genreSelect").value;
  results.innerHTML = "";

  if (!genre) {
    results.innerHTML = `<p class="empty">Select a genre</p>`;
    return;
  }

  const games = gameDatabase[genre] || [];

  games.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = game.image;

    img.onerror = () => {
      img.src = `https://placehold.co/500x280/0f172a/38bdf8?text=${encodeURIComponent(game.title)}`;
    };

    const content = document.createElement("div");
    content.classList.add("card-content");

    content.innerHTML = `
      <h2>${game.title}</h2>
      <p class="desc">${game.description}</p>
      <p class="review">⭐ ${game.review}</p>
      <div class="lists">
        <p><strong>Pros:</strong> ${game.pros.join(", ")}</p>
        <p><strong>Cons:</strong> ${game.cons.join(", ")}</p>
      </div>
      <p class="advice">💡 ${game.advice}</p>
      <a href="${game.link}" target="_blank">Play</a>
    `;

    card.appendChild(img);
    card.appendChild(content);

    results.appendChild(card);
  });
}

document.getElementById("searchBtn").addEventListener("click", findGames);
window.findGames = findGames;