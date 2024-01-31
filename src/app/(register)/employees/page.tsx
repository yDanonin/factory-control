import Aside from "@/components/Aside";
import Background from "@/components/Background";

export default function Home() {
  return (
    <div className="flex">
      <Background />
      <Aside />
      <h1>Employees</h1>
    </div>
  );
}
