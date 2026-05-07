/**
 * 아바타 SSE 스트림 mock 응답.
 * 실제 LLM이 아니라 MSW 핸들러가 흘려보내는 더미 텍스트.
 * 짧은 응답 / 중간 응답 / 긴 응답 / 매우 긴 응답이 섞여 있음.
 */
export const AvatarStreamMockResponses: string[] = [
  // 짧은 응답 (mock 티 강함)
  '[mock] ㅇㅇ',
  '[mock] 응!',
  '[mock] 헐 진짜? ㅋㅋ',
  '[mock] 아 그렇구나~',
  '[mock] 음... 글쎄 ㅎㅎ',

  // 중간 응답
  '[mock] 오 재밌겠다! 나도 한번 해볼까? ㅎㅎ 너는 어떻게 생각해?',
  '[mock] 그건 좀 어려운 질문이네... 잠깐 생각해볼게. 테스트용 응답이라 깊이는 없어 ㅋㅋ',
  '[mock] 음~ 그럴 수도 있지! 사람마다 생각이 다르잖아. (이건 가짜 응답이긴 한데 ㅎㅎ)',

  // 긴 응답
  `[mock 긴 응답] 이건 테스트용 더미 텍스트야. 실제 LLM 응답이 아니라 MSW 핸들러가 토큰 단위로 흘려보내고 있어. 이 정도 길이면 스트리밍 UX가 잘 동작하는지 확인하기 좋겠지? 한 글자씩 또는 몇 글자씩 나타나는 게 자연스러운지 봐줘.`,

  `[mock] 요즘 영화 봤는데 진짜 재밌더라!! 비포 선라이즈라고 알아? 두 사람이 기차에서 만나서 빈에서 하룻밤을 보내는 이야기인데, 대화가 정말 좋아서 나도 모르게 빠져들었어. 너도 이런 잔잔한 영화 좋아하면 추천해. (※ 이건 목 데이터입니다)`,

  // 매우 긴 응답 (멀티 라인)
  `[mock 매우 긴 응답 #1] 안녕! 좀 길게 답변해볼게.

일단 네 메시지를 받았다는 건 SSE 스트림이 잘 동작한다는 뜻이고, 지금 이 텍스트가 한 chunk씩 나뉘어서 너한테 도착하고 있는 거야.

목 데이터의 특징:
1. 실제 LLM이 아니라서 항상 정해진 답변을 줘
2. 토큰 단위로 쪼개져서 흘러가는 걸 시각적으로 확인 가능
3. setTimeout으로 지연이 들어가서 진짜 스트리밍처럼 보임

이 정도 길이면 스크롤이 자동으로 따라가는지, 텍스트가 부드럽게 늘어나는지, 중간에 abort 하면 끊기는지 다 테스트할 수 있어. 끝!`,

  `[mock #2] 테스트용 장문 응답이야. 줄바꿈도 들어가고 이모지도 들어가고 🎬 길이도 길어.

근데 사실 이건 LLM이 아니라 그냥 미리 적어둔 더미 데이터를 setTimeout으로 흘려보내는 거라서, 진짜 챗봇이라면 이런 식으로 답하지 않을 수도 있어 ㅋㅋㅋ. 그래도 UI 검증용으로는 충분하지!

스트리밍 중에 새 메시지를 또 보내면 어떻게 될까? 현재 구현은 sending/streaming 상태에선 추가 전송을 막아둠. 이게 맞는 동작이지~`,
];

let responseIndex = 0;

export function pickMockResponse(): string {
  const response = AvatarStreamMockResponses[responseIndex % AvatarStreamMockResponses.length];
  responseIndex += 1;
  return response ?? '[mock] 빈 응답';
}

/**
 * 텍스트를 1~3글자 단위 chunk로 분할 (LLM 토큰 흉내).
 */
export function chunkText(text: string): string[] {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    const size = 1 + Math.floor(Math.random() * 3);
    chunks.push(text.slice(i, i + size));
    i += size;
  }
  return chunks;
}
