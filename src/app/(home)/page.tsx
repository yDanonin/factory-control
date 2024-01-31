import Aside from "@/components/Aside";
import Background from "@/components/Background";
import DynamicTable from "@/components/DynamicTable";

const columns = [
  { header: "Nome", accessor: "name" },
  { header: "Idade", accessor: "age" },
  { header: "Cidade", accessor: "city" },
  { header: "Nome", accessor: "name" },
  { header: "Idade", accessor: "age" },
  { header: "Cidade", accessor: "city" },
  { header: "Nome", accessor: "name" },
  { header: "Idade", accessor: "age" },
  { header: "Cidade", accessor: "city" },
  { header: "Nome", accessor: "name" },
  { header: "Idade", accessor: "age" },
  { header: "Cidade", accessor: "city" },
  { header: "Nome", accessor: "name" },
  { header: "Idade", accessor: "age" },
  { header: "Cidade", accessor: "city" },
  { header: "Nome", accessor: "name" },
  { header: "Idade", accessor: "age" },
  { header: "Cidade", accessor: "city" }
];

const data = [
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "San Francisco" },
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "San Francisco" },
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "San Francisco" },
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "San Francisco" },
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "San Francisco" },
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "San Francisco" },
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "San Francisco" },
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "San Francisco" },
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "San Francisco" }
];

export default function Page() {
  return (
    <div className="flex">
      <Background />
      <Aside />
      <DynamicTable columns={columns} data={data} />
      <h1>Olá</h1>
    </div>
  );
}
