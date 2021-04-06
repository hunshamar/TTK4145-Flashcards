export const difficultyToRange = (difficulty) => {
    let difficultyMin = 0
    let difficultyMax = 10
    if (difficulty[0] === 0){
        difficultyMin = 0
    }
    if (difficulty[0] === 1){
        difficultyMin = 5
    }
    if (difficulty[0] === 2){
        difficultyMin = 8
    }

    if (difficulty[1] === 0){
        difficultyMax = 5
    }
    if (difficulty[1] === 1){
        difficultyMax = 8
    }
    if (difficulty[1] === 2){
        difficultyMax = 10
    }
    return [difficultyMin, difficultyMax]
}
