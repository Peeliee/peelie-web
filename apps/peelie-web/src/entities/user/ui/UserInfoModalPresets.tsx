import { ModalWrapper } from '@/shared/ui/common/Modal/ModalWrapper';
import { Button } from '@/shared/ui/common/button';

interface ViewModeProps {
  title: string;
  subTitle: string;
  content: string;
  onClose: (open: boolean) => void;
  onEdit?: () => void;
}

interface UserInfoForm {
  title: string;
  subTitle: string;
  content: string;
}

interface EditModeProps {
  form: UserInfoForm;
  setForm: React.Dispatch<React.SetStateAction<UserInfoForm>>;
  onApply: () => void;
}

export const ViewMode = ({ title, subTitle, content, onClose, onEdit }: ViewModeProps) => (
  <>
    <ModalWrapper.Header className="w-full text-start mt-1">
      <p className="heading-3-medium whitespace-pre-line text-center">{`나의 온보딩 정보를\n기반으로 생성된 정보를 확인해봐요`}</p>
    </ModalWrapper.Header>
    <div className="flex flex-col w-full text-start">
      <span className="text-peelie-gray-600 detail-regular mb-1">제목</span>
      <p className="body-1-bold p-2 bg-peelie-primary-50 rounded-100 mb-4">{title}</p>

      <span className="text-peelie-gray-600 detail-regular mb-1">부제목</span>
      <p className="body-1-regular p-2 bg-peelie-primary-50 rounded-100 mb-4">{subTitle}</p>

      <span className="text-peelie-gray-600 detail-regular mb-1">본문</span>
      <div
        className="
            body-1-regular 
            p-3 
            bg-peelie-primary-50 
            rounded-100 
            border border-peelie-primary-100
            h-[140px] 
            overflow-y-auto
          "
      >
        {content}
      </div>
    </div>

    <ModalWrapper.Footer className="mt-6">
      <Button variant="inactive" size="extraLarge" onClick={() => onClose(false)}>
        닫기
      </Button>
      <Button variant="primary" size="extraLarge" onClick={onEdit} className="w-full">
        수정하기
      </Button>
    </ModalWrapper.Footer>
  </>
);

export const EditMode = ({ form, setForm, onApply }: EditModeProps) => (
  <>
    <ModalWrapper.Header className="w-full text-start mt-1">
      <p className="heading-3-medium whitespace-pre-line text-center">{`나의 온보딩 정보를\n기반으로 생성된 내용을 수정해봐요`}</p>
    </ModalWrapper.Header>
    <div className="flex flex-col w-full text-start">
      <span className="text-peelie-gray-600 detail-regular mb-1">제목</span>
      <input
        className="body-1-bold p-2 bg-peelie-primary-50 rounded-100 mb-4 border border-peelie-primary-500"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <span className="text-peelie-gray-600 detail-regular mb-1">부제목</span>
      <input
        className="body-1-regular p-2 bg-peelie-primary-50 rounded-100 mb-4 border border-peelie-primary-500"
        value={form.subTitle}
        onChange={(e) => setForm({ ...form, subTitle: e.target.value })}
      />

      <span className="text-peelie-gray-600 detail-regular mb-1">본문</span>
      <textarea
        className="
            body-1-regular 
            p-3
            bg-peelie-primary-50 
            rounded-100 
            border border-peelie-primary-500
            resize-none
            h-[130px]
            overflow-y-auto
          "
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
    </div>

    <ModalWrapper.Footer className="mt-6">
      <Button variant="primary" size="extraLarge" onClick={onApply} className="w-full">
        적용하기
      </Button>
    </ModalWrapper.Footer>
  </>
);
