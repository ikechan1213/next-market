"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const DeleteItem = (context) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")

    const router = useRouter()

    useEffect(() => {
        const getSingleItem = async() => {
        const params = await context.params
        const response = await fetch(`http://localhost:3000/api/item/readsingle/${params.id}`,{cache: 'no-store'})
        const jsonData = await response.json()
        const singleItem = jsonData.singleItem
        setTitle(singleItem.title)
        setPrice(singleItem.price)
        setImage(singleItem.image)
        setDescription(singleItem.description)
        setEmail(singleItem.email)
    }
        getSingleItem(context.params.id)
    }, [context])
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:3000/api/item/delete/${context.params.id}`, {
            method: "DELETE",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
            title: title,
            price: price,
            image: image,
            description: description,
            email: "ikedakoukun1213@gmail.com"
        })
    })

        const jsonData = await response.json()
        alert(jsonData.message)
        router.push("/")
        router.refresh()
        }catch{
            alert("アイテム削除失敗")
        }
    }

    return (<div>
        <h1>アイテム削除</h1>
        <form onSubmit ={handleSubmit}>
            <h2>{title}</h2>
            {image && (
                <Image
                src={image}
                width={750}
                height={500}
                alt="item-image"
                priority
                    />
                )}

            <h3>{price}</h3>
            <p>{description}</p>
            <button >削除</button>
        </form>
    </div>)
}

export default DeleteItem