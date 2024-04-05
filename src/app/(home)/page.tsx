import Aside from "@/components/Aside";
import DynamicTable from "@/components/DynamicTable";

const columns = [
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
    <div className="grid grid-cols-8 gap-4 h-screen overflow-x-hidden break-all relative sm:max-2xl:flex sm:max-2xl:flex-row">
      <div className="col-span-1 sm:max-2xl:w-1/2 sm:max-2xl:col-auto">
        <div className="sticky top-0">
          <Aside />
        </div>
      </div>
      <div className="col-span-7 overflow-y-auto">
        <DynamicTable columns={columns} data={data} />
      </div>
    </div>
  );
}
