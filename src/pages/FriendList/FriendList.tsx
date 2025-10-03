import { useState } from 'react';
import './FriendList.css';

export const FriendList = () => {
  const [friends] = useState([
    {
      id: 1,
      name: '김용희',
      tagline: '한줄소개',
      bio: '대화를 통해 배우고,\n나누며 성장하고 싶습니다.',
      personality: '신중형',
    },
    {
      id: 2,
      name: '박민수',
      tagline: '한줄소개',
      bio: '새로운 사람들과의 만남을 좋아합니다.',
      personality: '활발형',
    },
    {
      id: 3,
      name: '이지은',
      tagline: '한줄소개',
      bio: '영화와 음악을 사랑하는 사람입니다.',
      personality: '감성형',
    },
    {
      id: 4,
      name: '최현우',
      tagline: '한줄소개',
      bio: '운동과 여행을 즐기는 활동적인 사람입니다.',
      personality: '활동형',
    },
    {
      id: 5,
      name: '정수진',
      tagline: '한줄소개',
      bio: '책과 카페를 좋아하는 조용한 사람입니다.',
      personality: '신중형',
    },
  ]);

  const handleFriendClick = (friendId: number) => {
    console.log(`친구 ${friendId} 클릭됨`);
  };

  return (
    <div className="friend-list-page">
      {/* 헤더 */}
      <header className="header">
        <h1>Peelie</h1>
        <button className="sort-button">최근 교류순</button>
      </header>

      {/* 친구 목록 */}
      <main className="main">
        {friends.map((friend) => (
          <section 
            key={friend.id}
            className="friend-card"
            onClick={() => handleFriendClick(friend.id)}
          >
            <div className="avatar"></div>
            <div className="info">
              <h2>
                {friend.name} 
                <span className="badge">{friend.personality}</span>
              </h2>
              <p className="tagline">{friend.tagline}</p>
              <p className="bio">{friend.bio}</p>
            </div>
          </section>
        ))}
      </main>

      {/* 하단 네비게이션 */}
      <nav className="bottom-nav">
        <a href="#" className="nav-item active">친구목록</a>
        <a href="#" className="nav-item">홈</a>
        <a href="#" className="nav-item">마이페이지</a>
      </nav>
    </div>
  );
};
