# auto-commit-action

✅ Automatically Git commit via GitHub GraphQL API

This action will automatically commit (based on `path` input) to the repository with the message provided in
the `message` input.
The commit will be made by the user who owns the `GITHUB_TOKEN` provided.

> [!TIP]
> The commit will be signed commit and owned by github-actions[bot] if the `GITHUB_TOKEN` is provided by GitHub Actions.

## Requirements

- Working directory must be a git repository.
  Can be achieved by using [`actions/checkout@v4`](https://github.com/marketplace/actions/checkout).
- `GITHUB_TOKEN` environment variable must be set.
- The `contents: write` permission for the workflow job.

## Usage

```yaml
- name: Auto Commit Action
  uses: TozyDev/auto-commit-action@v1
  env:
    GITHUB_TOKEN: ${{ github.token }}
```

## Inputs

| Name         | Description                           | Default                         |
|--------------|---------------------------------------|---------------------------------|
| `path`       | The paths of the files to commit      | `.`                             |
| `message`    | The commit message                    | `Update via Auto Commit Action` |
| `repository` | The repository (owner/repo) to commit | `${{ github.repository }}`      |
| `branch`     | The branch to commit                  | `${{ github.ref_name }}`        |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) for details.
