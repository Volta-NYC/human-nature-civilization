import Seal from "@/lib/ui/seal";
import { ActionLink, Arrow, Container, Label } from "@/lib/ui/primitives";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center gap-7 py-32 text-center">
      <Seal size={56} className="text-brass/60" />
      <Label brass>404</Label>
      <h1 className="max-w-[20ch] text-display">This page is not part of the record.</h1>
      <p className="m-0 max-w-[46ch] text-lede text-dim">
        Either it moved, or it was never written. The society is young enough that the second is
        the likelier of the two.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ActionLink href="/">
          Back to the start <Arrow />
        </ActionLink>
        <ActionLink href="/record" variant="outline">
          Read the record
        </ActionLink>
      </div>
    </Container>
  );
}
