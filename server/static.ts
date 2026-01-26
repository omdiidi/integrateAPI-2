import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  const recordStorePath = path.resolve(distPath, "recordstoredemo");
  if (fs.existsSync(recordStorePath)) {
    app.use("/recordstoredemo", express.static(recordStorePath));
    app.get("/recordstoredemo", (_req, res) => {
      res.sendFile(path.resolve(recordStorePath, "index.html"));
    });
    app.get("/recordstoredemo/*", (_req, res) => {
      res.sendFile(path.resolve(recordStorePath, "index.html"));
    });
  }

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
