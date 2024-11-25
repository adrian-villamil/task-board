import Image from "next/image";
import Link from "next/link";

export const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex justify-center items-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center">
        <Image
          src={'not-found.svg'}
          alt="not-found-img"
          width={450}
          height={450}
          priority
        />
        <h1 className="mt-6 text-4xl font-semibold">Page not found</h1>
        <p className="mt-4 text-[#97A3B6]">{"Sorry, we couldn't find the page you're looking for"}</p>
        <Link href={'/'} className="mt-10 px-4 py-2 rounded-xl text-white bg-[#3662E3]">Go back home</Link>
      </div>
    </main>
  );
};