const getAllItems = async () => {
  const response = await fetch("http://localhost:3000/api/item/readall",{
    cache: 'no-store'  })
  const jsonData = await response.json();
  const allItems = jsonData.allItems;
  return allItems;
}


const ReadAllItems = async() => {
  const allItems = await getAllItems();
  console.log(allItems);
  return( 
  <div>
    <h1 className="h1-style">こんにちは</h1>
    <h3>さようなら</h3>
  </div>
  )
}
export default ReadAllItems