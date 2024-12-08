import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Prevent HTTP cache
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/", express.static(path.join(__dirname, "public/output")));

app.get("/api", async (req, res) => {
  const {
    platform,
    user,
    repo,
    siteid,
    projectid,
    projectname,
    teamid,
    theme,
    background,
    hide_border,
    border,
    width,
    height,
  } = req.query;

  // Validate required parameters
  if (!platform) {
    res.status(400).send("Missing required query parameters: platform.");
    return;
  }

  if (
    platform.toLowerCase() !== "github" &&
    platform.toLowerCase() !== "g" &&
    platform.toLowerCase() !== "netlify" &&
    platform.toLowerCase() !== "n" &&
    platform.toLowerCase() !== "vercel" &&
    platform.toLowerCase() !== "v"
  ) {
    res.status(400).send("Currently, only the GitHub platform is supported.");
    res
      .status(400)
      .send(
        "Incorrect platform naming. Netlify, vercel and github are the only supported platforms."
      );
    return;
  }

  // Validate required parameters for github
  if (
    (platform.toLowerCase() === "github" || platform.toLowerCase() === "g") &&
    !user
  ) {
    res.status(400).send("Missing required query parameters: user");
    return;
  }

  if (
    (platform.toLowerCase() === "github" || platform.toLowerCase() === "g") &&
    !repo
  ) {
    res.status(400).send("Missing required query parameters: repo.");
    return;
  }

  // Validate required parameters for vercel
  if (
    (platform.toLowerCase() === "vercel" || platform.toLowerCase() === "g") &&
    !projectid
  ) {
    res.status(400).send("Missing required query parameters: projectid");
    return;
  }

  if (
    (platform.toLowerCase() === "vercel" || platform.toLowerCase() === "g") &&
    !teamid
  ) {
    res.status(400).send("Missing required query parameters: teamid.");
    return;
  }

  // Validate required parameters for netlify
  if (
    (platform.toLowerCase() === "netlify" || platform.toLowerCase() === "n") &&
    !siteid
  ) {
    res
      .status(400)
      .send("Missing required query parameters: siteid or projectname");
    return;
  }

  if (platform.toLowerCase() === "github" || platform.toLowerCase() === "g") {
 
    const runsUrl = `https://api.github.com/repos/${user}/${repo}/actions/runs`;
    const repoUrl = `https://api.github.com/repos/${user}/${repo}`;

    try {
        // Fetch workflow runs
        const runsResponse = await fetch(runsUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const runsData = await runsResponse.json();

        // Fetch repository data to get push time
        const repoResponse = await fetch(repoUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const repoData = await repoResponse.json();

        if (runsData && runsData.workflow_runs && runsData.workflow_runs.length > 0) {
            const latestRun = runsData.workflow_runs[0];
            const status = latestRun.conclusion;
            const message = status === 'success' ? 'Deployment successful!' : 'Deployment failed!';
            
            const toKarachiTime = (utcDateString) => {
                const date = new Date(utcDateString);
                return date.toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
            };

            return res.status(200).json({
                deploymentStatus: message,
                deployTime: status === 'success' ? toKarachiTime(latestRun.updated_at) : null,
                pushTime: toKarachiTime(repoData.pushed_at),
                latestCommit: {
                    time: toKarachiTime(latestRun.head_commit.timestamp),
                    message: latestRun.head_commit.message
                }
            });
        } else {
            return res.status(404).json({ error: 'No workflow runs found.' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}  

  if (platform.toLowerCase() === "netlify" || platform.toLowerCase() === "n") {
    res
      .status(400)
      .send(
        "We are sorry, the Vercel deploy status badge is currently under development. Currently, only the GitHub platform is supported."
      );
    return;
  }

  if (platform.toLowerCase() === "vercel" || platform.toLowerCase() === "v") {
    res
      .status(400)
      .send(
        "We are sorry, the Vercel deploy status badge is currently under development. Currently, only the GitHub platform is supported."
      );
    return;
  }
});




 

 

// Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
