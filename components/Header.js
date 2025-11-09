import { AiOutlineProduct } from "react-icons/ai";

export default function Header() {
  return (
    // use h-full so parent controls the height and both components match
    <div className="flex items-center justify-center gap-2 h-full bg-[#FF383F]">
      <AiOutlineProduct fontSize="40px" className='text-white' />
      <span className="text-4xl font-bold text-center text-white">มาเด้อมากินเข่านำ</span>
    </div>
  );
}
