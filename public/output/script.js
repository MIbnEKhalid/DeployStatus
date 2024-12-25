
async function checkStatus(ownerN, id, repoName) {
    const owner = `${ownerN}`;
    const repo = `${repoName}`;
    //   const token = ''; // Ensure your token is securely handled.
    const runsUrl = `https://api.github.com/repos/${owner}/${repo}/actions/runs`;
    const repoUrl = `https://api.github.com/repos/${owner}/${repo}`;
    showMessage(id, 'Updating Progress...');
    try {
        // Fetch workflow runs
        const runsResponse = await fetch(runsUrl, {
            method: 'GET',
            headers: {
                //       'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        const runsData = await runsResponse.json();
        // Fetch repository data to get push time
        const repoResponse = await fetch(repoUrl, {
            method: 'GET',
            headers: {
                //  'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        const repoData = await repoResponse.json();
        if (runsData && runsData.workflow_runs && runsData.workflow_runs.length > 0) {
            const latestRun = runsData.workflow_runs[0];
            const status = latestRun.conclusion;
            const message = status === 'success' ? 'Deployment successful!' : 'Deployment failed!';
            const deployTime = status === 'success' ? new Date(latestRun.updated_at).toLocaleString() : 'Not available (deployment failed)';
            const pushTime = new Date(repoData.pushed_at).toLocaleString();
            // Update deployment status
            const deployStatusElem = document.querySelector(`#${id} .deployStatus`);
            deployStatusElem.innerText = `Deployment Status: ${message}`;
            if (status === 'success') {
                deployStatusElem.classList.add('success');
                deployStatusElem.classList.remove('error');
            } else {
                deployStatusElem.classList.add('error');
                deployStatusElem.classList.remove('success');
            }
            document.querySelector(`#${id} .deploytime`).innerText = `Deployed at: ${deployTime}`;
            document.querySelector(`#${id} .pushTime`).innerText = `Push Time: ${pushTime}`;
            document.querySelector(`#${id} .commitTime`).innerText = `Latest Commit Time: ${new Date(latestRun.head_commit.timestamp).toLocaleString()}`;
            document.querySelector(`#${id} .commitMessage`).innerText = `Commit Message: ${latestRun.head_commit.message}`;
            document.querySelector(`#${id} .error`).style.display = 'none';
            document.querySelector(`#${id} .error`).innerText = '';
            showMessage(id, 'Update Done!');
        } else {
            throw new Error('No workflow runs found.');
        }
    } catch (error) {
        document.querySelector(`#${id} .deploytime`).innerText = `Deployed at: Not available (error occurred)`;
        document.querySelector(`#${id} .pushTime`).innerText = `Push Time: Not available (error occurred)`;
        document.querySelector(`#${id} .deployStatus`).innerText = `Deployment Status: Error occurred`;
        document.querySelector(`#${id} .commitTime`).innerText = `Latest Commit Time: Not available (error occurred)`;
        document.querySelector(`#${id} .commitMessage`).innerText = `Commit Message: Not available (error occurred)`;
        document.querySelector(`#${id} .error`).innerText = `Error: ${error.message}`;
        document.querySelector(`#${id} .error`).style.display = 'block';
        document.querySelector(`#${id} .deployStatus`).classList.add('error');
        document.querySelector(`#${id} .deployStatus`).classList.remove('success');
        showMessage(id, 'Update Done!');
    }
    console.log('Status checked');
}

function showMessage(id, message) {
    const messageBox = document.querySelector(`#${id} .message-box`);
    messageBox.innerText = message;
    messageBox.style.display = 'block';
    // Hide the message after 5 seconds
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 1500);
}

const GithubRepos = [
    { id: 'mainWeb', owner: 'MIbnEKhalid', RepoName: 'Unilib.MIbnEKhalid.github.io', open: 'true' },
    { id: 'deplWeb', owner: 'MIbnEKhalid', RepoName: 'DeployStatus' }
];

// Dynamically generate the repository status checks
window.onload = function () {
    const container = document.getElementById('status-container');
    GithubRepos.forEach(repo => {
        const detailsElement = document.createElement('details');
        detailsElement.id = repo.id;
        // Add 'open' attribute if the 'open' property is set to 'true'
        if (repo.open === 'true') {
            detailsElement.setAttribute('open', 'true');
        }
        detailsElement.innerHTML = `
                <summary> <a class="links" href="https://github.com/${repo.owner}/${repo.RepoName}" target="_blank"> ${repo.RepoName} </a> Status</summary>
    <div class="deployInfo">
        <p class="status-p"> <span class="deployStatus">Deployment Status: None</span></p>
        <p class="status-p"><span class="deploytime">Deployed at: 00/00/0000, 0:00:00 AM</span></p>
        <p class="status-p"><span class="pushTime">Push Time at: 00/00/0000, 0:00:00 AM</span></p>
        <p class="status-p"><span class="commitTime">Latest Commit Time: 00/0/0000, 0:00:00 AM</span></p>
        <p class="status-p"><span class="commitMessage">Commit Message: {Message}</span></p>
    </div>
    <div class="error" style="display: none; color: red;"></div>
    <button class="check-status" onclick="checkStatus('${repo.owner}', '${repo.id}', '${repo.RepoName}')">Check Status</button>
    <div class="message-box" style="display: none;"></div>
`;
        container.appendChild(detailsElement);
        checkStatus(repo.owner, repo.id, repo.RepoName);
    });
}
