import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mock data for homestays
  const homestays = [
    {
      id: "1",
      name: "Emerald Estate Stay",
      location: "Chikmagalur, Karnataka",
      category: "Coffee Estate",
      price: 4500,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-coffee-plantation-in-the-mountains-4545-large.mp4",
      description: "Nestled in the heart of a 50-acre coffee plantation. Wake up to the aroma of fresh beans and bird songs.",
      features: ["Coffee Estate", "Mountain View", "Couple Friendly", "Pet Friendly"],
      lat: 13.3161,
      lng: 75.7720
    },
    {
      id: "2",
      name: "Mist Haven Retreat",
      location: "Coorg, Karnataka",
      category: "Mountain",
      price: 6800,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1587061949733-5d52194d216d?auto=format&fit=crop&q=80&w=1200",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-foggy-mountains-and-forest-4284-large.mp4",
      description: "A luxury wooden cabin perched on a hillside with panoramic views of the Western Ghats.",
      features: ["Mountain View", "Swimming Pool", "Family Stay"],
      lat: 12.4244,
      lng: 75.7382
    },
    {
      id: "3",
      name: "Waterfall Whispers",
      location: "Wayanad, Kerala",
      category: "Waterfall",
      price: 3200,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1200",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-a-lush-jungle-4161-large.mp4",
      description: "Listen to the constant soothing sound of a private waterfall right outside your window.",
      features: ["Waterfall", "Trekking", "Budget"],
      lat: 11.6854,
      lng: 76.1320
    },
    {
        id: "4",
        name: "Riverstone Farmstay",
        location: "Kamshet, Maharashtra",
        category: "Farm Stay",
        price: 2500,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-countryside-landscape-with-a-river-in-the-valley-4158-large.mp4",
        description: "Back to roots. Traditional organic farm experience by the river Indrayani.",
        features: ["Farm Stay", "Pet Friendly", "Family Stay"],
        lat: 18.7618,
        lng: 73.5557
      }
  ];

  app.get("/api/homestays", (req, res) => {
    res.json(homestays);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
