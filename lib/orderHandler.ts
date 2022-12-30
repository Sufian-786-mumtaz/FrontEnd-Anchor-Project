export const createOrder = async ({ Name, Phone, Address, total, paymentMethond }:any) => {
    const res = await fetch("api/orders", {
        method: "POST",
        body: JSON.stringify({
            name: Name,
            phone: Phone,
            address: Address,
            total: parseFloat(total),
            method: paymentMethond,
            status: 1
        })
    })
    const id = await res.json();
    return id
}