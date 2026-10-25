import F10 from "../../components/features/f10";
import F14 from "../../components/features/f14";

export default function AsidePage() {
  return (
    <div data-slot="aside">
      <F10 title="aside f10" />
      <F14 title="aside f14" />
    </div>
  );
}
