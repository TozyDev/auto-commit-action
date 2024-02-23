import {exec, getExecOutput} from "@actions/exec";

export async function execGitAdd(path: string[]) {
    return exec("git", ["add", ...path])
}

export async function execGitDiff(options: string[], path: string[]) {
    return getExecOutput("git", ["diff", ...options, "--", ...path])
}
