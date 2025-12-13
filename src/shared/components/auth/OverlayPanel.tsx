import { Button } from "@/shared/components/Button";

interface OverlayPanelProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  isActive: boolean;
  side: "left" | "right";
}

export function OverlayPanel({
  title,
  description,
  buttonText,
  onButtonClick,
  isActive,
  side,
}: OverlayPanelProps) {
  const transformClass = isActive
    ? "translate-x-0 z-[5]"
    : side === "left"
      ? "-translate-x-[20%] z-[1]"
      : "translate-x-[20%] z-[1]";

  const opacityClass = isActive
    ? "opacity-100 duration-500 delay-100"
    : "opacity-0 duration-0 delay-0";

  return (
    <div
      className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center ${
        side === "left" ? "left-0" : "right-0"
      } transform transition-transform duration-600 ease-in-out ${transformClass}`}
    >
      <div
        className={`flex flex-col items-center justify-center w-full h-full transition-opacity ease-in-out ${opacityClass}`}
      >
        <h1 className="font-bold text-3xl text-white mb-4">{title}</h1>
        <p className="text-white mb-8 text-sm font-light">{description}</p>
        <Button
          onClick={onButtonClick}
          variant="outline"
          className="bg-transparent border-white text-white rounded-full px-12 py-3 font-bold uppercase tracking-wider hover:bg-white hover:text-green-800 transition-colors"
          type="button"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
