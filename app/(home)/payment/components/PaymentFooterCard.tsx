import Image from "next/image";

const PaymentFooterCard = () => {
  return (
    <div className="">
      <div className="rounded-3xl bg-(--foreground)/10 px-8 py-10 text-(--textColor) flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative h-14 w-14">
          <Image
            src={"/icons/castle.png"}
            alt="castle"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-2 lg:pr-10">
          <p className="text-2xl font-semibold text-center md:text-left">
            Looking to place an order for a group?
          </p>
          <p className="text-xl font-extralight text-center md:text-left">
            We offer generous discounts for your business, school, or family.
          </p>
        </div>
        <button className="inset-0 shrink-0 rounded-full bg-[#FFCD1F] px-8 py-5 tracking-wide text-sm font-semibold text-[#0a092d]">
          Get pricing now
        </button>
      </div>
      <p className="mt-3 text-xs text-center">
        A daily limit may be triggered for security purposes. *English textbooks
        only
      </p>
    </div>
  );
};

export default PaymentFooterCard;
