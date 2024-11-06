import { useEffect, useState } from "react";

export default function AutoComplete() {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [addressListFrom, setAddressListFrom] = useState<any[]>([]);
  const [addressListTo, setAddressListTo] = useState<any[]>([]);
  const [loadingFrom, setLoadingFrom] = useState(false);
  const [loadingTo, setLoadingTo] = useState(false);


  console.log(addressListTo)
  console.log(addressListFrom)

  // Debounce search for "Where From?"
  useEffect(() => {
    if (searchFrom) {
      setLoadingFrom(true);
      const delayDebounceFn = setTimeout(getAddressFrom, 100);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setAddressListFrom([]);
      setLoadingFrom(false);
    }
  }, [searchFrom]);

  // Debounce search for "Where To?"
  useEffect(() => {
    if (searchTo) {
      setLoadingTo(true);
      const delayDebounceFn = setTimeout(getAddressTo, 100);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setAddressListTo([]);
      setLoadingTo(false);
    }
  }, [searchTo]);

  const getAddressFrom = async () => {
    try {
      const res = await fetch(`/api/search-address?q=${encodeURIComponent(searchFrom)}`);
      const result = await res.json();
      setAddressListFrom(result?.data?.suggestions || []);
    } catch (error) {
      console.error("Error fetching 'Where From?' suggestions", error);
    } finally {
      setLoadingFrom(false);
    }
  };

  const getAddressTo = async () => {
    try {
      const res = await fetch(`/api/search-address?q=${encodeURIComponent(searchTo)}`);
      const result = await res.json();
      setAddressListTo(result?.data?.suggestions || []);
    } catch (error) {
      console.error("Error fetching 'Where To?' suggestions", error);
    } finally {
      setLoadingTo(false);
    }
  };

  return (
    <div>
      {/* "Where From?" Input */}
      <div>
        <label htmlFor="from">Where From? </label>
        <input
          type="text"
          className="bg-white p-1 border-[1px] outline-none w-full focus:border-yellow-400"
          value={searchFrom}
          onChange={(e) => setSearchFrom(e.target.value)}
        />
        <div>
          {loadingFrom ? (
            <p>Loading suggestions...</p>
          ) : (
            addressListFrom.length > 0 && (
              addressListFrom.map((item: any, index: number) => (
                <h2
                  key={index}
                  onClick={() => {
                    setSearchFrom(item.full_address);
                    setAddressListFrom([]); // Clear suggestions on selection
                  }}
                  className="p-2 mb-2 bg-gray-200 cursor-pointer"
                >
                  {item.full_address}
                </h2>
              ))
            )
          )}
        </div>
      </div>

      {/* "Where To?" Input */}
      <div className="mt-3">
        <label htmlFor="to">Where To? </label>
        <input
          type="text"
          className="bg-white p-1 border-[1px] outline-none w-full focus:border-yellow-400"
          value={searchTo}
          onChange={(e) => setSearchTo(e.target.value)}
        />
        <div>
          {loadingTo ? (
            <p>Loading suggestions...</p>
          ) : (
            addressListTo.length > 0 && (
              addressListTo.map((item: any, index: number) => (
                <h2
                  key={index}
                  onClick={() => {
                    setSearchTo(item.full_address);
                    setAddressListTo([]); // Clear suggestions on selection
                  }}
                  className="p-2 mb-2 bg-gray-200 cursor-pointer"
                >
                  {item.full_address}
                </h2>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
}
