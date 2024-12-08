# DeployStatus

Have you ever found yourself in a situation where you've deployed your website on GitHub Pages, Netlify, or Vercel and wanted to check if the deployment was successful—but thanks to countless open tabs of "how to center a div," you’d rather avoid opening yet another one to manually navigate to GitHub, your repository, and deployment logs?

**DeployStatus** offers an effortless solution to monitor the deployment status of multiple web/build projects. With just a glance, you can see:

- **Deployment Status:** Whether the build was successful or not.
- **Deployment Time:** When the build was deployed.
- **Push Time:** When the code was pushed to the GitHub repository.
- **Commit Time:** Timestamp of the latest commit.
- **Commit Message:** Details of the latest commit.

## How to Use  


1. **Using a token (optional)**: For private repositories, you can generate a GitHub token by visiting [GitHub Personal Access Tokens](https://github.com/settings/tokens).  
   - **Important**: Do not upload your token to a public repository. Instead, keep it secure and use this webpage locally.  

2. **Modify the repository list**: Update the code snippet below to include your repositories.  
   - `id`: A unique string identifier for each repository.  
   - `owner`: The GitHub username associated with the repository.  
   - `RepoName`: The name of the repository you want to monitor.  
   - `open: 'true'`: Automatically opens the repository details when the page loads (optional).  

In the URL: `https://github.com/MIbnEKhalid/DeployStatus/`  
- **`MIbnEKhalid`** is the `owner`.  
- **`DeployStatus`** is the `RepoName`.  

```javascript
const GithubRepos = [
    
            { id: 'mainWeb', owner: 'MIbnEKhalid', RepoName: 'MIbnEKhalid.github.io', open: 'true' },
            { id: 'deplWeb', owner: 'MIbnEKhalid', RepoName: 'DeployStatus' }
    
];
```


## 🚀 Building the Project

To build the project, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/mibnekhalid/github-readme-deploystatus.git
    cd github-readme-deploystatus
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Build the project:**
    ```sh
    npm run build
    ```

4. **Run the project locally:**
    ```sh
    npm start
    ```

5. **Open your browser and navigate to:**
    ```
    http://localhost:3030
    ```

You should now see the project running locally on your machine.



## License

See the [LICENSE](LICENSE) file for details.
 
## Contact & Support

For Questions Or Contributions, Please contact Muhammad Bin Khalid at [mbktechstudio.com/Support](https://mbktechstudio.com/Support/?Project=DeployStatus), [support@mbktechstudio.com](mailto:support@mbktechstudio.com) or [chmuhammadbinkhalid28.com](mailto:chmuhammadbinkhalid28.com).
