import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SsgoiTransition } from '@ssgoi/react';
import PATH from '@/shared/constants/path';
import ToggleSelect from '@/shared/ui/common/ToggleSelect/ToggleSelect';

export default function HomePage() {
  const [selected, setSelected] = useState('share');

  return (
    <SsgoiTransition id="/">
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-amber-300">
        <h1 className="heading-1-medium text-gray-99">Home</h1>

        <ToggleSelect
          items={[
            { value: 'share', label: '내 코드 공유' },
            { value: 'input', label: '친구 코드 입력' },
          ]}
          value={selected}
          onChange={setSelected}
        />

        <p className="text-body-2 text-gray-99">
          {selected === 'share' ? '공유 콘텐츠 영역' : '입력 콘텐츠 영역'}
        </p>

        <Link to={PATH.TEST} className="text-body-1 text-brand-100 underline">
          Go to Test Page
        </Link>
      </div>
    </SsgoiTransition>
  );
}
