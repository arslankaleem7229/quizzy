import {
  Background,
  BillingCycleButtons,
  BillingCards,
  PaymentPoster,
  PaymentFooterCard,
} from "@/features/payment";

export default function PaymentPage() {
  return (
    <div className="bg-(--background) w-full">
      <Background />
      <main className="flex max-w-7xl justify-center mx-auto min-h-screen text-(--textColor)">
        <section className="flex flex-1 flex-col gap-12 px-4 pb-14 md:pt-6 lg:px-16">
          <div className="px-4 py-3 md:py-10 text-center sm:px-8">
            <h1 className="text-3xl font-semibold tracking-wide  lg:text-5xl">
              Get better results with the number one learning platform
            </h1>
            <BillingCycleButtons />
            <BillingCards />
            <p className="mt-4 text-xs font-light text-gray-400 whitespace-pre-line">
              A daily limit may be triggered for security purposes.{`\n`}
              <span>*English textbooks only.</span>
            </p>
          </div>

          <section className="space-y-5 md:space-y-10">
            <h2 className="text-center text-3xl lg:text-5xl font-medium md:font-semibold tracking-wide">
              Benefits of upgrading to Quizzy Plus
            </h2>
            <PaymentPoster />
          </section>
          <PaymentFooterCard />
        </section>
      </main>
    </div>
  );
}
