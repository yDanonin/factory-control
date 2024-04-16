import Aside from "@/components/Aside";
import DynamicTable from "@/components/DynamicTable";

const columns = [
  { header: "Nome", accessorKey: "nome" },
  { header: "Idade", accessorKey: "idade" },
  { header: "Cidade", accessorKey: "cidade" }
];

const data = [
  { nome: "John", idade: 30, cidade: "New York" },
  { nome: "Batman", idade: 25, cidade: "San Francisco" },
  { nome: "Lucas", idade: 30, cidade: "New York" },
  { nome: "Batman", idade: 25, cidade: "San Francisco" },
  { nome: "Lucas", idade: 30, cidade: "New York" },
  { nome: "Robin", idade: 25, cidade: "San Francisco" },
  { nome: "Lucas", idade: 30, cidade: "New York" },
  { nome: "Robin", idade: 25, cidade: "San Francisco" },
  { nome: "John", idade: 30, cidade: "New York" },
  { nome: "Robin", idade: 25, cidade: "San Francisco" },
  { nome: "Coringa", idade: 30, cidade: "New York" },
  { nome: "Jane", idade: 25, cidade: "San Francisco" },
  { nome: "Coringa", idade: 30, cidade: "New York" },
  { nome: "Jane", idade: 25, cidade: "San Francisco" },
  { nome: "Coringa", idade: 30, cidade: "New York" },
  { nome: "Jane", idade: 25, cidade: "San Francisco" },
  { nome: "John", idade: 30, cidade: "New York" },
  { nome: "Jane", idade: 25, cidade: "San Francisco" }
];

export default function Page() {
  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <DynamicTable columns={columns} data={data} filterFields={[{ header: "Nome", accessorKey: "nome" }]} />
      </main>
    </div>
  );
}
