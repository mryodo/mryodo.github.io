import { AsciiBox } from "@/components/ascii/ascii-box";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ScreenshotCarousel({
  slides,
  className,
}: {
  slides: ReadonlyArray<{ title: string; src: string }>;
  className?: string;
}) {
  return (
    <Carousel className={className ?? "mx-auto w-full max-w-2xl"}>
      <div className="flex items-center justify-end gap-[1ch]">
        <CarouselPrevious />
        <CarouselNext />
      </div>
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.title} className="w-full">
            <AsciiBox
              fluid
              width={40}
              tone="primary"
              title={slide.title}
              className="w-full"
            >
              <img src={slide.src} alt={slide.title} className="h-auto w-full" />
            </AsciiBox>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
