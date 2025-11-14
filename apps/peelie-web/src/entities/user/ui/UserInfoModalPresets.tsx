import { ModalWrapper } from '@/shared/ui/common/Modal/ModalWrapper';
import { Button } from '@/shared/ui/common/button';

interface ViewModeProps {
  title: string;
  subTitle: string;
  content: string;
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

export const ViewMode = ({ title, subTitle, content, onEdit }: ViewModeProps) => (
  <>
    <ModalWrapper.Header className="w-full text-start mt-1">
      <p className="heading-3-medium">나의 온보딩 정보를 기반으로 생성된 내용을 확인해보세요</p>
    </ModalWrapper.Header>
    <div className="flex flex-col w-full text-start gap-3">
      <span>제목</span>
      <p className="heading-3-medium">{title}</p>

      <span>부제목</span>
      <p>{subTitle}</p>

      <span>본문</span>
      <p>{content}</p>
    </div>

    <ModalWrapper.Footer className="mt-6">
      <Button variant="primary" size="extraLarge" onClick={onEdit} className="w-full">
        수정하기
      </Button>
    </ModalWrapper.Footer>
  </>
);

export const EditMode = ({ form, setForm, onApply }: EditModeProps) => (
  <>
    <ModalWrapper.Header className="w-full text-start mt-1">
      <p className="heading-3-medium">나의 온보딩 정보를 기반으로 생성된 내용을 수정해주세요.</p>
    </ModalWrapper.Header>
    <div className="flex flex-col w-full text-start gap-3">
      <span>제목</span>
      <textarea
        className="w-full p-3 rounded-200 bg-white"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <span>부제목</span>
      <textarea
        className="w-full p-3 rounded-200 bg-white"
        value={form.subTitle}
        onChange={(e) => setForm({ ...form, subTitle: e.target.value })}
      />

      <span>본문</span>
      <textarea
        className="w-full p-3 rounded-200 bg-white"
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
