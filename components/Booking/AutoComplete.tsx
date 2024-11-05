import { useEffect, useState } from "react";

export default function AutoComplete() {
  const [search, setSearch] = useState("");
  const [addressList, setAddressList] = useState<any[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        getAddress();
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const getAddress = async () => {
    try {
      const res = await fetch(`/api/search-address?q=${encodeURIComponent(search)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      
      if (!res.ok) throw new Error("Failed to fetch addresses");

      const result = await res.json();
      setAddressList(result?.data?.suggestions || []);
    } catch (error) {
      console.error(error);
      setAddressList([]); // Clear address list on error
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="text">Where From? </label>
        <input
          type="text"
          className="bg-white p-1 border-[1px] outline-none w-full focus:border-yellow-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          {addressList.length > 0 ? (
            addressList.map((item: any, index: number) => (
              <h2 key={index}>{item.full_address}</h2>
            ))
          ) : (
            <p>No suggestions available</p>
          )}
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor="text">Where To? </label>
        <input
          type="text"
          className="bg-white p-1 border-[1px] outline-none w-full focus:border-yellow-400"
        />
      </div>
    </div>
  );
}
