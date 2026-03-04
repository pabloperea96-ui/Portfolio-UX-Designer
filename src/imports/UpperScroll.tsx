import svgPaths from "./svg-h7c6kda48b";

function Time() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[22px] items-center justify-center min-h-px min-w-px pt-[1.5px] relative" data-name="Time">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[22px] relative shrink-0 text-[17px] text-black text-center" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        9:41
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[13px] relative shrink-0 w-[27.328px]" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.328 13">
        <g id="Frame">
          <rect height="12" id="Border" opacity="0.35" rx="3.8" stroke="var(--stroke-0, black)" width="24" x="0.5" y="0.5" />
          <path d={svgPaths.p7a14d80} fill="var(--fill-0, black)" id="Cap" opacity="0.4" />
          <rect fill="var(--fill-0, black)" height="9" id="Capacity" rx="2.5" width="21" x="2" y="2" />
        </g>
      </svg>
    </div>
  );
}

function Levels() {
  return (
    <div className="flex-[1_0_0] h-[22px] min-h-px min-w-px relative" data-name="Levels">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[7px] items-center justify-center pr-px pt-px relative size-full">
          <div className="h-[12.226px] relative shrink-0 w-[19.2px]" data-name="Cellular Connection">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.2 12.2264">
              <path clipRule="evenodd" d={svgPaths.p1e09e400} fill="var(--fill-0, black)" fillRule="evenodd" id="Cellular Connection" />
            </svg>
          </div>
          <div className="h-[12.328px] relative shrink-0 w-[17.142px]" data-name="Wifi">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.1417 12.3283">
              <path clipRule="evenodd" d={svgPaths.p18b35300} fill="var(--fill-0, black)" fillRule="evenodd" id="Wifi" />
            </svg>
          </div>
          <Frame />
        </div>
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Nav bar">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[20px] py-[4px] relative size-full">
          <div className="flex items-center justify-center relative shrink-0 size-[29px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[29px]" data-name="Chevron">
                <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Icon">
                  <div className="absolute inset-[-20%_-10%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4 10.15">
                      <path d={svgPaths.p149c2a00} id="Icon" stroke="var(--stroke-0, #010440)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.9" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[30px]" data-name="icons">
            <div className="absolute inset-[11.22%_9.05%_10.69%_9.06%]" data-name="Vector">
              <div className="absolute inset-[-5.34%_-5.09%_-5.35%_-5.09%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.0694 25.9301">
                  <path d={svgPaths.p10a6a280} id="Vector" stroke="var(--stroke-0, #010440)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UpperScroll() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full" data-name="upper scroll">
      <div className="absolute backdrop-blur-[30px] bg-white h-[126px] left-0 top-0 w-[393px]" data-name="Scroll Edge Effect - Hard">
        <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.12)] border-b border-solid inset-0 pointer-events-none" />
      </div>
      <div className="content-stretch flex gap-[154px] items-center justify-center pb-[19px] pt-[21px] px-[24px] relative shrink-0 w-[361px]" data-name="Status bar - iPhone">
        <Time />
        <Levels />
      </div>
      <NavBar />
    </div>
  );
}