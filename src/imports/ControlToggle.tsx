function KnobContainer() {
  return (
    <div className="h-[22px] relative shrink-0 w-[57px]" data-name="Knob Container">
      <div className="absolute inset-[-10%_0_-10%_-3.86%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.2 26.4">
          <g id="Knob Container">
            <g filter="url(#filter0_d_249_5913)" id="Ellipse 1">
              <circle cx="13.2" cy="13.2" fill="var(--fill-0, #9FA3A6)" r="11" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="26.4" id="filter0_d_249_5913" width="26.4" x="4.47035e-08" y="4.47035e-08">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="0.2" result="effect1_dropShadow_249_5913" />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_249_5913" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_249_5913" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function ControlToggle() {
  return (
    <div className="bg-[#d7d7d9] content-stretch flex items-center p-[3px] relative rounded-[30px] size-full" data-name="Control / Toggle">
      <KnobContainer />
    </div>
  );
}