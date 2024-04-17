function RightArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 10.5l4 4.5-4 4.5M16 10.5l4 4.5-4 4.5"
        stroke={props.stroke ? props.stroke : "#4F87F5"}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default RightArrowIcon;
