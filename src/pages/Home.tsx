import Button from "@/components/common/Button";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">홈 페이지</h1>
      <Button onClick={() => alert("클릭됨!")}>기본 버튼</Button>
      <Button variant="secondary">서브 버튼</Button>
      <Button variant="danger">위험 버튼</Button>
    </div>
  );
};

export default Home;
