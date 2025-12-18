// import { get } from "mongoose"

const getSingleItem = (id) => {
    const response = fetch("http://localhost:3000/api/item/readsingle/id")
}

const ReadSingleItem = (context) => {
    const params = context.params
    getSingleItem(params.id)
    return(
        <h1>個別アイテムページ</h1>
    )
}

export default ReadSingleItem