import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[90vw] w-full px-8 py-6 flex items-center justify-center space-y-4 bg-gray-200 mx-auto my-8 rounded-lg gap-8">
      <div className="space-y-6 w-full md:w-[50vw] text-center md:text-start">
        <h1 className="text-4xl font-semibold underline">
          NextJS Authentication Tutorial
        </h1>

        <p className="text-red-500">* This is only for tutorial purposes. Do not post any sensitive data *</p>
      </div>

      <div className="hidden md:block w-[40vw] relative">
        <Image src="/hero.jpg" width={600} height={600} className="w-full h-full object-cover rounded-lg" alt="hero-image" />
      </div>
    </div>
  );
}
