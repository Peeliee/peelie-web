export interface QuizOption {
  optionId: number;
  text: string;
}

interface QuizCardProps {
  question: string; // quiz.quiz
  options: QuizOption[]; // quiz.answer
  selectedOptionId?: number;
  onSelectOption: (id: number) => void;
}

export const splitIntoTwoLines = (text: string) => {
  const length = text.length;
  const mid = Math.floor(length / 2);

  // mid 기준으로 가장 가까운 공백 찾기
  let breakPoint = text.indexOf(' ', mid);
  if (breakPoint === -1) {
    breakPoint = text.lastIndexOf(' ', mid);
  }

  if (breakPoint === -1) return text;

  return text.slice(0, breakPoint) + '\n' + text.slice(breakPoint + 1);
};

export const QuizCard = ({
  question,
  options,
  selectedOptionId,
  onSelectOption,
}: QuizCardProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center heading-2-medium mb-4 whitespace-pre-line">
        {splitIntoTwoLines(`Q. ${question}`)}
      </div>

      {/* 옵션 1 */}
      <button
        onClick={() => onSelectOption(options[0].optionId)}
        className={`
          w-full bg-peelie-white p-4 text-center border rounded-300 
          transition-all
          ${
            selectedOptionId === options[0].optionId
              ? 'border-peelie-primary-600 '
              : 'border-peelie-gray-150'
          }
        `}
      >
        <span className="body-1-regular whitespace-pre-line">
          {splitIntoTwoLines(options[0].text)}
        </span>
      </button>

      {/* VS 텍스트 */}
      <div className="my-2 text-peelie-primary-600 heading-4-medium">VS</div>

      {/* 옵션 2 */}
      <button
        onClick={() => onSelectOption(options[1].optionId)}
        className={`
            w-full bg-peelie-white p-4 text-center border rounded-300 
          transition-all
          ${
            selectedOptionId === options[1].optionId
              ? 'border-peelie-primary-500 shadow-md'
              : 'border-peelie-gray-150'
          }
        `}
      >
        <span className="body-1-regular whitespace-pre-line">
          {splitIntoTwoLines(options[1].text)}
        </span>
      </button>
    </div>
  );
};
