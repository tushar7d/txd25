export default async function WritingPage({ params }) {
    const { slug } = await params
    
   
    return (
      <div>
        <h1 className="text-2xl font-bold">{slug}</h1>
       
      </div>
    )
  }