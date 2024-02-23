import {getInputs} from "./inputs";
import {execGitAdd, execGitDiff} from "./git";
import {context, getOctokit} from "@actions/github";
import {
    createCommitMessage,
    CreateCommitOnBranchInput,
    createFileAddition,
    FileAddition,
    FileDeletion
} from "./graphql-types";
import {info, setFailed, setOutput} from "@actions/core";

async function main() {
    const inputs = getInputs()
    await execGitAdd(inputs.path)

    const {stdout: diff} = await execGitDiff(["--cached", "--name-status"], inputs.path)
    const fileAdditions = new Set<FileAddition>()
    const fileDeletions = new Set<FileDeletion>()
    diff.split("\n").forEach(line => {
        if (line === "") return
        const [status, file] = line.split("\t")
        if (status === "D") {
            fileDeletions.add({path: file})
        } else {
            fileAdditions.add(createFileAddition(file))
        }
    })

    if (fileAdditions.size === 0 && fileDeletions.size === 0) {
        info("No changes to commit")
        return
    }

    const input: CreateCommitOnBranchInput = {
        branch: {
            branchName: inputs.branch,
            repositoryNameWithOwner: inputs.repository,
        },
        message: createCommitMessage(inputs.message),
        expectedHeadOid: context.sha,
        fileChanges: {
            additions: Array.from(fileAdditions),
            deletions: Array.from(fileDeletions),
        },
    }
    const query = `mutation ($input: CreateCommitOnBranchInput!) {
      createCommitOnBranch(input: $input) {
        commit {
          url
        }
      }
    }`
    const variables = {input}

    const {GITHUB_TOKEN} = process.env
    if (!GITHUB_TOKEN) {
        setFailed("The GITHUB_TOKEN environment variable is required to perform this action")
        return
    }

    const github = getOctokit(GITHUB_TOKEN)
    const response: { createCommitOnBranch: { commit: { url: string } } } = await github.graphql(query, variables)

    setOutput("url", response.createCommitOnBranch.commit.url)
    info("Commit created successfully at " + response.createCommitOnBranch.commit.url)
}

void main()
