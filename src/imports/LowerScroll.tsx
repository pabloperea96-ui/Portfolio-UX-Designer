import { imgBlur } from "./svg-yk4gy";

export default function LowerScroll() {
  return (
    <div className="content-stretch flex gap-[10px] items-start px-[16px] py-[20px] relative size-full" data-name="Lower_Scroll">
      <div className="absolute h-[104px] left-0 top-0 w-[393px]" data-name="Scroll Edge Effect - Soft" style={{ background: 'linear-gradient(to bottom, transparent, #ffffff 55%)' }} />
      <div className="bg-[rgba(3,29,64,0.9)] flex-[1_0_0] min-h-px min-w-px relative rounded-[10px]" data-name="button">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center p-[12px] relative w-full">
            <div className="flex flex-col font-['Helvetica_Neue:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#f2dfdf] text-[16px] text-center tracking-[0.32px] whitespace-nowrap">
              <p className="leading-[normal]">Invertir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}