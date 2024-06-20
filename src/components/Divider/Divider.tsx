
interface DividerProps {
  width?: string;
}

const Divider: React.FC<DividerProps> = ({width}) => {
  if(!width) width = "w-4/5"
  return <div className={`${width} border-t border-zinc-800 my-4`}></div>;
};

export default Divider;
