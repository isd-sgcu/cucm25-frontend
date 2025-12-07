export interface QuestionInterface {
  id: string
  title: string
  answers: string[]
}

export interface AcceptanceInterface {
  text: string
  checked: boolean
}

export interface AnswerInterface {
  questionId: string
  optionText: string
}
