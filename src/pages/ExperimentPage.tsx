import DataTable from "@/components/common/DataTable";

const data = [
  { id: 1, name: "실험 A", status: "진행 중" },
  { id: 2, name: "실험 B", status: "완료" },
];

const columns: { key: keyof (typeof data)[number]; title: string }[] = [
  { key: "id", title: "ID" },
  { key: "name", title: "이름" },
  { key: "status", title: "상태" },
];

const ExperimentPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">실험 페이지</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ExperimentPage;
