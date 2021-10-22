import { createContext, useState } from "react"

const UserContext = createContext()

const ContextProvider = ({children}) =>{
    const [seekerJobCreateData, setSeekerJobCreateData] = useState([])
    const [seekerJobDetails, setSeekerJobDetails] = useState([])
    const [getClientName, setGetClientName] = useState({})
    const [bidConfirmation, setBidConfirmation] = useState([])
    return (
        <UserContext.Provider value={[
            seekerJobCreateData,
            setSeekerJobCreateData,
            seekerJobDetails,
            setSeekerJobDetails,
            getClientName,
            setGetClientName,
            bidConfirmation,
            setBidConfirmation

        ]}>{children}</UserContext.Provider>
    )
}
export {ContextProvider, UserContext}