import { useState } from "react";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">홈 페이지</h1>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="모달 제목">
        <p>이것은 모달입니다!</p>
      </Modal>
    </div>
  );
};

export default Dashboard;
