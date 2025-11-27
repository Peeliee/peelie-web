import { splitIntoMultiLines } from '@/shared/lib/splitIntoMultiLines';

interface QuizOption {
  optionId: number;
  text: string;
}

interface QuizCardProps {
  question: string; // quiz.quiz
  options: QuizOption[]; // quiz.answer
  selectedOptionId: number | null;
  onSelectOption: (id: number) => void;
}

export const QuizCard = ({
  question,
  options,
  selectedOptionId,
  onSelectOption,
}: QuizCardProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center heading-2-medium mb-4 whitespace-pre-line">
        {splitIntoMultiLines(`Q. ${question}`)}
      </div>

      {/* 옵션 1 */}
      <button
        onClick={() => onSelectOption(options[0].optionId)}
        className={`
          w-full p-4 text-center border rounded-300 
          transition-all
          ${
            selectedOptionId === options[0].optionId
              ? 'border-peelie-gray-150 bg-peelie-primary-600 '
              : 'border-peelie-gray-150 bg-peelie-white'
          }
        `}
      >
        <span className="body-1-regular whitespace-pre-line">
          {splitIntoMultiLines(options[0].text)}
        </span>
      </button>

      {/* VS 텍스트 */}
      <div className="my-2 text-peelie-primary-600 heading-4-medium">VS</div>

      {/* 옵션 2 */}
      <button
        onClick={() => onSelectOption(options[1].optionId)}
        className={`
            w-full p-4 text-center border rounded-300 
          transition-all
          ${
            selectedOptionId === options[1].optionId
              ? 'border-peelie-gray-150 bg-peelie-primary-600'
              : 'border-peelie-gray-150 bg-peelie-white'
          }
        `}
      >
        <span className="body-1-regular whitespace-pre-line">
          {splitIntoMultiLines(options[1].text)}
        </span>
      </button>
    </div>
  );
};
