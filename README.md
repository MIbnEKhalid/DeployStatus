# DeployStatus



This website monitors the deployment status of web/build projects hosted on GitHub Pages, Netlify, and Vercel. It provides details such as:
- Deployment Status
- Deployment Time (When Build Was Deployed)
- Deployment Time (When Code Was Pushed To Github Repo) 
- Commit time 
- Commit message


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



## License

See the [LICENSE](LICENSE) file for details.
 
## Contact & Support

For Questions Or Contributions, Please contact Muhammad Bin Khalid at [mbktechstudio.com/Support](https://mbktechstudio.com/Support/?Project=DeployStatus), [support@mbktechstudio.com](mailto:support@mbktechstudio.com) or [chmuhammadbinkhalid28.com](mailto:chmuhammadbinkhalid28.com).
