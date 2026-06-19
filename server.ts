import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize SQLite database
  const db = new Database("data.db");

  // Create table if not exists
  db.exec(`
    CREATE TABLE IF NOT EXISTS pre_registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      center_name TEXT,
      agree_privacy INTEGER NOT NULL DEFAULT 0,
      agree_sensitive INTEGER NOT NULL DEFAULT 0,
      agree_marketing INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migration: Add columns if they don't exist (SQLite version)
  const tableInfo = db.prepare("PRAGMA table_info(pre_registrations)").all() as any[];
  const columns = tableInfo.map(c => c.name);

  if (!columns.includes("center_name")) {
    db.exec("ALTER TABLE pre_registrations ADD COLUMN center_name TEXT");
  }
  if (!columns.includes("agree_privacy")) {
    db.exec("ALTER TABLE pre_registrations ADD COLUMN agree_privacy INTEGER NOT NULL DEFAULT 0");
  }
  if (!columns.includes("agree_sensitive")) {
    db.exec("ALTER TABLE pre_registrations ADD COLUMN agree_sensitive INTEGER NOT NULL DEFAULT 0");
  }
  if (!columns.includes("agree_marketing")) {
    db.exec("ALTER TABLE pre_registrations ADD COLUMN agree_marketing INTEGER NOT NULL DEFAULT 0");
  }

  console.log("Connected to SQLite DB (data.db)");

  // API endpoint for registration
  app.post("/api/register", async (req, res) => {
    try {
      const { name, phone, email, centerName, agreePrivacy, agreeSensitive, agreeMarketing } = req.body;

      if (!name || !phone || !email || !agreePrivacy || !agreeSensitive) {
        return res.status(400).json({ error: "필수 정보를 입력하고 필수 약관에 동의해야 합니다." });
      }

      // Insert into DB
      const stmt = db.prepare(
        "INSERT INTO pre_registrations (name, phone, email, center_name, agree_privacy, agree_sensitive, agree_marketing) VALUES (?, ?, ?, ?, ?, ?, ?)"
      );
      const result = stmt.run(
        name, 
        phone, 
        email, 
        centerName || "", 
        agreePrivacy ? 1 : 0, 
        agreeSensitive ? 1 : 0, 
        agreeMarketing ? 1 : 0
      );

      // Send Telegram notification
      const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (telegramToken && chatId) {
        const message = `[무료 체험신청] ${centerName || "공란"}, ${name}, ${phone}, ${email}`;
        
        try {
          await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: message
            }),
          });
        } catch (botErr) {
          console.error("Error sending Telegram message:", botErr);
        }
      }

      res.status(201).json({ success: true, id: result.lastInsertRowid });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "오류가 발생했습니다. 잠시 후 다시 시도해주세요." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
