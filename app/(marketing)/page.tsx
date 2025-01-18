import Footer from "./_components/Footer";
import Heading from "./_components/heading";
import Heros from "./_components/Heros";

export default function MarketingPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="dark:bg-[#1f1f1f] flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heros />
      </div>
      <Footer />
    </div>
  );
};
