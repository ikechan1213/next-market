import Link from "next/link"
import Image from "next/image"

const getAllItems = async () => {
  const response = await fetch("http://localhost:3000/api/item/readall",{
    cache: 'no-store'  })
  const jsonData = await response.json();
  const allItems = jsonData.allItems;
  console.log(allItems);
  return allItems;
}


const ReadAllItems = async() => {
  const allItems = await getAllItems();
  return( 
  <div>
    {allItems.map(item => 
      <Link href={`/item/readsingle/${item._id}`} key={item._id}>
        <Image src={item.image} width={750} height={500} alt="item-image" priority/>
        <div>
          <h2>{item.price}</h2>
          <h3>{item.title}</h3>
          <p>{item.description.substring(0, 80)}...</p>
        </div>
      </Link>
  )}
  </div>
  )
}
export default ReadAllItems