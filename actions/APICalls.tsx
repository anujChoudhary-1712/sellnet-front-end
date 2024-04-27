export const postRequest = async(url:string,body:any) =>{
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body
    })

    console.log(body)

    const data = await res.json()

    if(res.status !== 200){
        let message;

        if(data?.message){
            message = data.message
        }else{
            message = data
        }

        return {error:true,status:res.status,message}
    }

    return data
}

export const getRequest = async(url:string) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`)

    const data = await res.json()

    if(res.status !== 200){
        let message;

        if(data?.message){
            message = data.message
        }else{
            message = data
        }

        return {error:true,status:res.status,message}
    }

    return data
}

export const deleteRequest = async(url:string,body:any) =>{
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,{
        method:'DELETE',
        headers:{
            "Content-Type": "application/json",
        },
        body
    })

    console.log(body)

    const data = await res.json()

    if(res.status !== 200){
        let message;

        if(data?.message){
            message = data.message
        }else{
            message = data
        }

        return {error:true,status:res.status,message}
    }

    return data
}