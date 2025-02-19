import { GridColumnProps } from "@/components/grid/comp/GridColumn";
import Grid from "@/components/grid/Grid";
import React, { useState } from "react";

// Experiment 데이터 타입
interface Experiment {
  id: string;
  name: string;
  status: "Pending" | "Completed" | "Failed";
  createdAt: string;
  [key: string] : string;
}

// 컬럼 정의
const columns: GridColumnProps<Experiment>[] = [
  { id: "id", label: "ID", type: "number", width: "50px", align: "center", sortable: true, visible: true },
  { id: "name", label: "Experiment Name", type: "text", width: "auto", align: "left", sortable: true, visible: true },
  { id: "status", label: "Status", type: "text", width: "120px", align: "center", sortable: true, visible: true },
  { id: "createdAt", label: "Created At", type: "date", width: "150px", align: "center", sortable: false, visible: true },
  {
    id: "actions",
    label: "Actions",
    type: "custom",
    width: "100px",
    align: "center",
    sortable: false,
    visible: true,
    customRender: () => <button className="px-2 py-1 bg-blue-500 text-white rounded">View</button>,
  },
];


const ExperimentPage: React.FC = () => {
    const [experiments, setExperiments] = useState<Experiment[]>([
        { id: "1", name: "Protein Analysis", status: "Completed", createdAt: "2024-02-17" },
        { id: "2", name: "Gene Sequencing", status: "Pending", createdAt: "2024-02-16" },
        { id: "3", name: "Drug Interaction Test", status: "Failed", createdAt: "2024-02-15" },
      ]);
    
      // ✅ Grid에서 데이터가 수정되면 이 함수가 실행됨
      const handleDataUpdate = (updatedData: Experiment[]) => {
        console.log("✅ ExperimentPage 데이터 업데이트:", updatedData);
        setExperiments(updatedData); // ✅ 상태 업데이트
      };       

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Experiment List</h1>
            <Grid<Experiment> 
                columns={columns} 
                data={experiments} 
                enableRowNumColumn = {false}
                enableSelectColumn = {true}      
                onDataUpdate={handleDataUpdate}              
            />
        </div>
    );
};

export default ExperimentPage;
