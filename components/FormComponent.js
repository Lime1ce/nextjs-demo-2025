import { Button, Input, InputGroup } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function FormComponent({onSearch}) {
  const [textSearch, setTextSearch] = useState("");

  console.log('--textSearch--', textSearch);

  return (
    <div className="bg-[#FF383F] py-6 px-4">
      <form
        className="flex flex-col sm:flex-row justify-center items-center gap-3"
        onSubmit={(event)=>{
          event.preventDefault();
          onSearch(textSearch);
        }}
        >
        <InputGroup className="max-w-md">
          <Input 
            placeholder="มาครับ มาหาเข่ากิน"
            value={textSearch}
            onChange={(event) => setTextSearch(event.target.value)}
          />
        </InputGroup>

        <Button
          size="sm"
          type="submit"
          className="bg-white !text-[#FF383F] flex! items-center gap-1 py-2"
        >
          <FaSearch className='text-[#FF383F]'/>
          ค้นหาแจ่วฮ้อน
        </Button>
      </form>
    </div>
  );
}
