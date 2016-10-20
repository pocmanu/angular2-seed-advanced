export interface MissingWordExercise {
    sentences: MissingWordSentence[];
}

export interface MissingWordSentence {
    words: String[];
    missing_words_positions: number[];
}

export interface MissingWordAnswer {
    [word_position: string]: { word: String, valid: boolean };
}
