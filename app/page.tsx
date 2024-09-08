import Calculator from "@/components/Calculator";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Calculator />{" "}
      <div className="attribution">
        Challenge by
        <Link
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
        >
          Frontend Mentor
        </Link>
        . Coded by
        <Link
          href="
  https://github.com/misecond4747
  "
        >
          M Ibrahim
        </Link>
        .
      </div>
    </>
  );
}
