import HeroSearchForm from "@/components/sections/hero-search-form";

const HeroContainer = () => {
  return (
    <div className="w-full pt-10 pb-64 relative lg:pb-80">
      <div className="absolute top-0 left-0 w-full h-[500px] hero-gradient z-0"></div>

      <div className="relative z-10">
        {/* Tiêu đề & Mô tả */}
        <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-4xl text-(--text-color) font-semibold leading-tight">
              Travel Smarter, Not Harder
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-(--text-secondary-color)">
              Make every trip effortless. Tripzy lets you book rides and plan
              journeys with ease
            </p>
          </div>
        </div>

        {/* Form Tìm kiếm (Sử dụng margin âm để kéo lên) */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 -mb-32">
          <HeroSearchForm />
        </div>
      </div>
    </div>
  );
};

export default HeroContainer;
