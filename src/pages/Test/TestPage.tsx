import { useParams } from 'react-router-dom';

const TestPage = () => {
  const { id } = useParams<{ id: string }>();

  return <div>테스트 페이지 아이디 : {id}</div>;
};

export default TestPage;
