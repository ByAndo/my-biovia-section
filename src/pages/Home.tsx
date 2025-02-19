import Button from "@/components/common/buttons/Button";


const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">홈 페이지</h1>
      <Button onClick={() => alert("클릭됨!")}>기본 버튼</Button>
      <Button>서브 버튼</Button>
      <Button>위험 버튼</Button>
    </div>
  );
};

export default Home;
