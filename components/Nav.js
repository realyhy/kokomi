import Link from "next/link";
import Image from "next/image";
import logoImage from "../public/images/kokomi-logo.jpg";

export default function Nav() {
  return (
    <div className="nav">
      <Link href="/">
        <p className="logo">
          <Image src={logoImage} alt="Kokomi logo" height={50} width={50} />
        </p>
      </Link>
      <div>
        <Link href="/cards">Cards</Link>
      </div>
    </div>
  );
}
