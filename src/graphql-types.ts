import {readFileSync} from "node:fs";

export interface FileAddition {
    path: string,
    contents: string,
}

export interface FileDeletion {
    path: string,
}

export interface FileChanges {
    additions: FileAddition[],
    deletions: FileDeletion[],
}

export interface CommittableBranch {
    branchName: string,
    repositoryNameWithOwner: string,
}

export interface CommitMessage {
    body: string | undefined,
    headline: string,
}

export interface CreateCommitOnBranchInput {
    branch: CommittableBranch,
    expectedHeadOid: string,
    fileChanges: FileChanges,
    message: CommitMessage,
}

export function createFileAddition(path: string): FileAddition {
    return {path, contents: readFileSync(path).toString("base64")}
}

export function createCommitMessage(message: string): CommitMessage {
    const [headline, ...body] = message.split("\n")
    return {headline, body: body.join("\n")}
}
