import RoboLoading from "@/components/robo-loading";

const Loading = () => {
  return (
    <div className="flex flex-col z-50 fixed left-0 top-0 h-screen w-screen justify-center bg-neutral-200 items-center">
      <RoboLoading className="w-96 h-96" />
      <p className="text-xl text-center font-bold animate-pulse">
        Your Health Results are Generating...
      </p>
    </div>
  );
};

export default Loading;
