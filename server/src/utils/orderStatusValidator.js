export const validTransition = (currentStatus, newStatus) => {
    const validTransitions = {
        Placed:['Preparing','Cancel'],
        Preparing:['Shipped'],
        Shipped:['Delivered'],
        Delivered:[],
        Cancel:[]
    }

    if(validTransitions[currentStatus].includes(newStatus)){
        return true
    }
    return false
}