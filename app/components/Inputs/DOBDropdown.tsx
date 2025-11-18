"use client";

"use client";

import { useEffect, useState } from "react";

type DOBValue = {
  day: string;
  month: string;
  year: string;
};

export default function DOBDropdown({
  value,
  onChange,
}: {
  value: DOBValue;
  onChange: (value: DOBValue) => void;
}) {
  const [dob, setDob] = useState<DOBValue>(value);

  useEffect(() => {
    setDob(value);
  }, [value.day, value.month, value.year]);

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const months = [
    { label: "Jan", value: "01" },
    { label: "Feb", value: "02" },
    { label: "Mar", value: "03" },
    { label: "Apr", value: "04" },
    { label: "May", value: "05" },
    { label: "Jun", value: "06" },
    { label: "Jul", value: "07" },
    { label: "Aug", value: "08" },
    { label: "Sep", value: "09" },
    { label: "Oct", value: "10" },
    { label: "Nov", value: "11" },
    { label: "Dec", value: "12" },
  ];
  const years = Array.from(
    { length: 100 },
    (_, i) => String(new Date().getFullYear() - i)
  );

  const handleChange = (partial: Partial<DOBValue>) => {
    const next = { ...dob, ...partial };
    setDob(next);
    onChange(next);
  };

  return (
    <>
      <label htmlFor="email" className="text-sm font-semibold text-gray-500">
        Date of Birth
      </label>
      <div className="flex gap-5 w-full my-5">
        {/* Day */}
        <select
          value={dob.day}
          onChange={(e) => handleChange({ day: e.target.value })}
          className="dob-selector"
        >
          <option value="">Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        {/* Month */}
        <select
          value={dob.month}
          onChange={(e) => handleChange({ month: e.target.value })}
          className="dob-selector"
        >
          <option value="">Month</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        {/* Year */}
        <select
          value={dob.year}
          onChange={(e) => handleChange({ year: e.target.value })}
          className="dob-selector"
        >
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
