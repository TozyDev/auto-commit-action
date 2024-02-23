import {getInput, getMultilineInput} from '@actions/core'

export interface Inputs {
    path: string[],
    message: string,
    repository: string,
    branch: string
}

export function getInputs(): Inputs {
    return {
        path: getMultilineInput('path'),
        message: getInput('message'),
        repository: getInput('repository'),
        branch: getInput('branch')
    }
}
