export default async function WorkPage({ params }) {
    const { slug } = await params
    
   
    return (
      <div>
        <h1 className="text-2xl font-bold">Work {slug}</h1>
       
      </div>
    )
  }