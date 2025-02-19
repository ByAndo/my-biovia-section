import Button from "@/components/common/buttons/Button";
import Card from "@/components/common/Card";

const LoginPage = () => {
  return (
    <div className="p-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card 
        title="기본 카드"
        description="이것은 기본 스타일 카드입니다."
      />
      <Card 
        title="이미지 카드"
        description="이미지가 포함된 카드입니다."
        image="https://via.placeholder.com/300"
      />
      <Card 
        title="버튼 포함 카드"
        description="버튼이 포함된 카드입니다."
        actions={<Button>더 보기</Button>}
      />
      <Card 
        title="아웃라인 카드"
        description="테두리가 강조된 카드입니다."
        variant="outlined"
      />
      <Card 
        title="엘리베이티드 카드"
        description="그림자가 있는 카드입니다."
        variant="elevated"
      />
    </div>
  );
};

export default LoginPage;
