import { Button } from "@/components/ui/button";

export function RestMode({
  onEnd,
  listening,
}: {
  onEnd: () => void;
  listening: boolean;
}) {
  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-end bg-background/90 px-6 pb-16">
      <div className="mx-auto w-full max-w-lg">
        <p className="text-xs tracking-[0.24em] text-muted uppercase">Declared rest</p>
        <h1 className="font-display mt-3 text-4xl text-foreground">The world continues</h1>
        <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted">
          Rest Mode is something you start. It does not prove the phone is locked, that other apps are unused, or that you are asleep. Your sanctuary grows while you are away either way.
        </p>
        <p className="mt-3 text-xs text-subtle">
          {listening
            ? "Listening will fade if a timer is set."
            : "You can start a mix before resting, or leave the world quiet."}
        </p>
        <Button className="mt-8 w-full" onClick={onEnd}>
          Return
        </Button>
      </div>
    </div>
  );
}
