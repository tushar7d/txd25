export default function Home() {
  return (
    <div className="p-3 md:p-4 flex  flex-col gap-24 ">
      <section className="mt-12">
        <h1 className=" font-mono mb-6  text-xl ">INTRO</h1>
        <p className=" max-w-[800px] text-4xl md:text-5xl  ">
          Product designer and developer with over a decade of experience in
          building world class products
        </p>
      </section>
      <section>
        <h1 className=" font-mono mb-6  text-xl ">FEATURED / WORK</h1>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4 ">
          <div className="bg-gray-100 rounded-xl p-3 h-[200px]">one</div>
          <div className="bg-gray-100 rounded-xl p-3 h-[200px]">one</div>
        </div>
      </section>
       <section>
        <h1 className=" font-mono mb-6  text-xl ">FEATURED / WRITING</h1>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4 ">
          <div className="bg-gray-100 rounded-xl p-3 h-[200px]">one</div>
          <div className="bg-gray-100 rounded-xl p-3 h-[200px]">one</div>
        </div>
      </section>
    </div>
  );
}
